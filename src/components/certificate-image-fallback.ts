import type { CertificateFrame } from "@/lib/site-data";

export function drawCertificateImageOnMainThread(
  canvas: HTMLCanvasElement,
  imageUrl: string,
  frame: CertificateFrame,
) {
  const context = canvas.getContext("2d");
  if (!context) return () => {};

  let cancelled = false;
  const image = new Image();
  image.onload = () => {
    if (cancelled) return;
    const targets = [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ] as const;
    const rows: number[][] = [];
    targets.forEach(([u, v], index) => {
      const [x, y] = frame.sourceCorners[index]!;
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
    const source = document.createElement("canvas");
    source.width = image.naturalWidth;
    source.height = image.naturalHeight;
    const sourceContext = source.getContext("2d", { willReadFrequently: true });
    if (!sourceContext) return;
    sourceContext.drawImage(image, 0, 0);
    const pixels = sourceContext.getImageData(0, 0, source.width, source.height).data;
    const output = context.createImageData(frame.width, frame.height);
    for (let y = 0; y < frame.height; y++) {
      for (let x = 0; x < frame.width; x++) {
        const u = x / (frame.width - 1);
        const v = y / (frame.height - 1);
        const denominator = g * u + h * v + 1;
        const sx = Math.max(0, Math.min(source.width - 1, (a * u + b * v + c) / denominator));
        const sy = Math.max(0, Math.min(source.height - 1, (d * u + e * v + f) / denominator));
        const x0 = Math.floor(sx),
          y0 = Math.floor(sy);
        const x1 = Math.min(x0 + 1, source.width - 1),
          y1 = Math.min(y0 + 1, source.height - 1);
        const dx = sx - x0,
          dy = sy - y0;
        const offset = (y * frame.width + x) * 4;
        for (let channel = 0; channel < 4; channel++) {
          output.data[offset + channel] =
            pixels[(y0 * source.width + x0) * 4 + channel]! * (1 - dx) * (1 - dy) +
            pixels[(y0 * source.width + x1) * 4 + channel]! * dx * (1 - dy) +
            pixels[(y1 * source.width + x0) * 4 + channel]! * (1 - dx) * dy +
            pixels[(y1 * source.width + x1) * 4 + channel]! * dx * dy;
        }
      }
    }
    context.putImageData(output, 0, 0);
  };
  image.src = imageUrl;
  return () => {
    cancelled = true;
  };
}
