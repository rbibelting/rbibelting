import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/page-sections";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  authorizationCertificates,
  appreciationCertificates,
  appreciationContent,
  dealerRelationships,
  type DealerCertificate,
} from "@/lib/site-data";

function CertificateImage({ certificate }: { certificate: DealerCertificate }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const alt = `${certificate.brand}: ${certificate.title}. ${certificate.detail}`;
  const frame = certificate.rotation || certificate.straighten ? certificate.frame : undefined;

  useEffect(() => {
    if (!frame) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (cancelled) return;
      // Solve the projective mapping from the rectangular output to the photographed corners.
      const targets = [[0, 0], [1, 0], [1, 1], [0, 1]];
      const rows: number[][] = [];
      targets.forEach(([u, v], index) => {
        const [x, y] = frame.sourceCorners[index];
        rows.push([u, v, 1, 0, 0, 0, -u * x, -v * x, x]);
        rows.push([0, 0, 0, u, v, 1, -u * y, -v * y, y]);
      });
      for (let column = 0; column < 8; column++) {
        let pivot = column;
        for (let row = column + 1; row < 8; row++) {
          if (Math.abs(rows[row][column]) > Math.abs(rows[pivot][column])) pivot = row;
        }
        [rows[column], rows[pivot]] = [rows[pivot], rows[column]];
        const divisor = rows[column][column];
        rows[column] = rows[column].map(value => value / divisor);
        for (let row = 0; row < 8; row++) {
          if (row === column) continue;
          const factor = rows[row][column];
          rows[row] = rows[row].map((value, index) => value - factor * rows[column][index]);
        }
      }
      const [a, b, c, d, e, f, g, h] = rows.map(row => row[8]);
      const source = document.createElement("canvas");
      source.width = image.naturalWidth;
      source.height = image.naturalHeight;
      const sourceContext = source.getContext("2d");
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
          const x0 = Math.floor(sx), y0 = Math.floor(sy);
          const x1 = Math.min(x0 + 1, source.width - 1), y1 = Math.min(y0 + 1, source.height - 1);
          const dx = sx - x0, dy = sy - y0;
          const offset = (y * frame.width + x) * 4;
          for (let channel = 0; channel < 4; channel++) {
            output.data[offset + channel] =
              pixels[(y0 * source.width + x0) * 4 + channel] * (1 - dx) * (1 - dy) +
              pixels[(y0 * source.width + x1) * 4 + channel] * dx * (1 - dy) +
              pixels[(y1 * source.width + x0) * 4 + channel] * (1 - dx) * dy +
              pixels[(y1 * source.width + x1) * 4 + channel] * dx * dy;
          }
        }
      }
      context.putImageData(output, 0, 0);
    };
    image.src = certificate.image;
    return () => { cancelled = true; };
  }, [certificate.image, frame]);

  if (frame) {
    return <canvas ref={canvasRef} width={frame.width} height={frame.height} role="img" aria-label={alt} className="size-full object-contain" style={certificate.rotation ? { filter: "brightness(1.15) contrast(1.18)" } : undefined} />;
  }

  return (
    <img
      src={certificate.image}
      alt={alt}
      width={certificate.width}
      height={certificate.height}
      loading="lazy"
      decoding="async"
      className="size-full object-contain"
    />
  );
}

export function DealerRelationships({ appreciation = false }: { appreciation?: boolean }) {
  const certificates = appreciation ? appreciationCertificates : authorizationCertificates;
  const content = appreciation ? appreciationContent : dealerRelationships;
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected === null ? undefined : certificates[selected];
  const select = (index: number) => {
    setSelected((index + certificates.length) % certificates.length);
  };

  return (
    <>
      <div className="[&_.text-muted-foreground]:text-background/70">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          text={content.description}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, index) => (
          <article
            key={certificate.id}
            className="flex min-w-0 flex-col overflow-hidden rounded-md border border-background/20 bg-background/5"
          >
            <button
              type="button"
              className="group block w-full shrink-0 cursor-zoom-in bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-soft"
              aria-label={`${dealerRelationships.viewLabel}: ${certificate.brand}, ${certificate.title}`}
              onClick={() => select(index)}
            >
              <span
                className="relative block aspect-(--certificate-aspect) sm:aspect-[4/3]"
                style={
                  {
                    "--certificate-aspect": (certificate.rotation || certificate.straighten) && certificate.frame
                      ? `${certificate.frame.width} / ${certificate.frame.height}`
                      : certificate.rotation
                      ? `${certificate.height} / ${certificate.width}`
                      : `${certificate.width} / ${certificate.height}`,
                  } as CSSProperties
                }
              >
                <span className="absolute inset-1 block sm:inset-3">
                  <CertificateImage certificate={certificate} />
                </span>
              </span>
            </button>
            <div className="flex flex-1 flex-col px-5 py-4">
              <h3 className="text-xl font-black leading-7 text-background">{certificate.brand}</h3>
              <p className="mt-1 text-sm font-bold leading-5 text-primary-soft">
                {certificate.title}
              </p>
            </div>
          </article>
        ))}
      </div>

      <Dialog
        open={!!active}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
          }
        }}
      >
        {active && (
          <DialogContent className="flex h-dvh max-h-dvh w-full max-w-none flex-col gap-0 overflow-hidden border-0 p-0 sm:h-[94dvh] sm:max-h-[94dvh] sm:w-[calc(100%-1.5rem)] sm:max-w-6xl sm:border [&>button]:grid [&>button]:size-11 [&>button]:place-items-center [&>button]:bg-background [&>button]:opacity-100">
            <DialogHeader className="shrink-0 border-b border-border p-4 pr-12 text-left sm:p-5 sm:pr-12">
              <DialogTitle className="text-xl leading-7">
                {active.brand} — {active.title}
              </DialogTitle>
              <DialogDescription>{active.detail}</DialogDescription>
            </DialogHeader>
            <div
              role="region"
              aria-label={dealerRelationships.viewerLabel}
              tabIndex={0}
              className="min-h-0 flex-1 touch-pan-x touch-pan-y touch-pinch-zoom overflow-auto overscroll-contain bg-stone-100 p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:p-5"
            >
              <div className="h-full w-full bg-white">
                <CertificateImage certificate={active} />
              </div>
            </div>
            <div className="shrink-0 border-t border-border bg-background px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-11"
                    aria-label={dealerRelationships.previousLabel}
                    onClick={() => select((selected ?? 0) - 1)}
                  >
                    <ArrowLeft />
                  </Button>
                  <span className="min-w-12 text-center text-sm tabular-nums" aria-live="polite">
                    {(selected ?? 0) + 1} / {certificates.length}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-11"
                    aria-label={dealerRelationships.nextLabel}
                    onClick={() => select((selected ?? 0) + 1)}
                  >
                    <ArrowRight />
                  </Button>
                </div>

              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
