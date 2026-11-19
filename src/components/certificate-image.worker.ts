type CertificateFrame = {
  width: number;
  height: number;
  sourceCorners: readonly [
    readonly [number, number],
    readonly [number, number],
    readonly [number, number],
    readonly [number, number],
  ];
};

type TransformRequest = { image: string; frame: CertificateFrame };

self.onmessage = async (event: MessageEvent<TransformRequest>) => {
  let sourceImage: ImageBitmap | undefined;
  try {
    const response = await fetch(event.data.image);
    if (!response.ok) throw new Error(`Certificate image request failed: ${response.status}`);
    sourceImage = await createImageBitmap(await response.blob());

    const sourceCanvas = new OffscreenCanvas(sourceImage.width, sourceImage.height);
    const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });
    if (!sourceContext) throw new Error("Certificate image canvas is unavailable");
    sourceContext.drawImage(sourceImage, 0, 0);
    const pixels = sourceContext.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height).data;
    const { width, height, sourceCorners } = event.data.frame;
    const rows: number[][] = [];
    sourceCorners.forEach(([x, y], index) => {
      const [u, v] = [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
      ][index]! as [number, number];
      rows.push([u, v, 1, 0, 0, 0, -u * x, -v * x, x]);
      rows.push([0, 0, 0, u, v, 1, -u * y, -v * y, y]);
    });
    for (let column = 0; column < 8; column++) {
      let pivot = column;
      for (let row = column + 1; row < 8; row++) {
        if (Math.abs(rows[row]![column]!) > Math.abs(rows[pivot]![column]!)) pivot = row;
      }
      [rows[column]!, rows[pivot]!] = [rows[pivot]!, rows[column]!];
      const divisor = rows[column]![column]!;
      rows[column] = rows[column]!.map((value) => value / divisor);
      for (let row = 0; row < 8; row++) {
        if (row === column) continue;
        const factor = rows[row]![column]!;
        rows[row] = rows[row]!.map((value, index) => value - factor * rows[column]![index]!);
      }
    }

    const [a, b, c, d, e, f, g, h] = rows.map((row) => row[8]!) as [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
    ];
    const output = new Uint8ClampedArray(width * height * 4);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = x / (width - 1);
        const v = y / (height - 1);
        const denominator = g * u + h * v + 1;
        const sx = Math.max(0, Math.min(sourceCanvas.width - 1, (a * u + b * v + c) / denominator));
        const sy = Math.max(
          0,
          Math.min(sourceCanvas.height - 1, (d * u + e * v + f) / denominator),
        );
        const x0 = Math.floor(sx),
          y0 = Math.floor(sy);
        const x1 = Math.min(x0 + 1, sourceCanvas.width - 1),
          y1 = Math.min(y0 + 1, sourceCanvas.height - 1);
        const dx = sx - x0,
          dy = sy - y0;
        const offset = (y * width + x) * 4;
        for (let channel = 0; channel < 4; channel++) {
          output[offset + channel] =
            pixels[(y0 * sourceCanvas.width + x0) * 4 + channel]! * (1 - dx) * (1 - dy) +
            pixels[(y0 * sourceCanvas.width + x1) * 4 + channel]! * dx * (1 - dy) +
            pixels[(y1 * sourceCanvas.width + x0) * 4 + channel]! * (1 - dx) * dy +
            pixels[(y1 * sourceCanvas.width + x1) * 4 + channel]! * dx * dy;
        }
      }
    }

    const outputCanvas = new OffscreenCanvas(width, height);
    const outputContext = outputCanvas.getContext("2d");
    if (!outputContext) throw new Error("Certificate output canvas is unavailable");
    outputContext.putImageData(new ImageData(output, width, height), 0, 0);
    const bitmap = outputCanvas.transferToImageBitmap();
    (self as unknown as Worker).postMessage({ bitmap }, [bitmap]);
  } catch {
    (self as unknown as Worker).postMessage({});
  } finally {
    sourceImage?.close();
  }
};
