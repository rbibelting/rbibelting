import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ProductPhoto } from "@/components/product-photo";

type ProductGalleryPhoto = { image: string; title: string; note: string; alt?: string };

export function ProductGallery({
  photos,
  active,
  eyebrow,
  compact = false,
}: {
  photos: readonly ProductGalleryPhoto[];
  active: boolean;
  eyebrow?: string;
  compact?: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(motion.matches);
    };
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!api) return;
    const select = () => setSelected(api.selectedScrollSnap());
    const startDrag = () => setDragging(true);
    const endDrag = () => setDragging(false);
    select();
    api
      .on("select", select)
      .on("reInit", select)
      .on("pointerDown", startDrag)
      .on("pointerUp", endDrag);
    return () => {
      api
        .off("select", select)
        .off("reInit", select)
        .off("pointerDown", startDrag)
        .off("pointerUp", endDrag);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !active || dragging || photos.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, 4000);
    return () => window.clearInterval(timer);
  }, [api, active, dragging, selected, photos.length]);

  const current = photos[selected] ?? photos[0];
  if (!current) return null;
  const multiple = photos.length > 1;

  return (
    <Carousel
      opts={{ loop: multiple, align: "start", duration: reducedMotion ? 0 : 20 }}
      setApi={setApi}
      className={
        compact
          ? "flex min-w-0 flex-col overflow-hidden rounded-xl border border-border/70 bg-background text-foreground md:absolute md:inset-0"
          : "min-w-0 bg-foreground text-background"
      }
      aria-label="Product photos"
    >
      <div
        className={
          compact
            ? "relative aspect-video md:aspect-auto md:min-h-0 md:flex-1 [&>div]:absolute [&>div]:inset-0"
            : "relative"
        }
      >
        {multiple && (
          <>
            <button
              type="button"
              aria-label="Previous product image"
              onClick={() => api?.scrollPrev()}
              className="absolute left-3 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-md transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-category"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next product image"
              onClick={() => api?.scrollNext()}
              className="absolute right-3 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-md transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-category"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        )}
        <CarouselContent className={`ml-0 touch-pan-y ${compact ? "h-full" : ""}`} aria-live="off">
          {photos.map((item, index) => (
            <CarouselItem
              key={item.image}
              className={compact ? "relative h-full bg-muted/25 pl-0" : "relative aspect-[16/9] pl-0"}
              aria-hidden={selected !== index}
              aria-label={`${index + 1} of ${photos.length}: ${item.title}`}
            >
              <div className="absolute inset-0">
                <ProductPhoto src={item.image} alt={item.alt ?? item.title} fit="contain" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
      <div
        className={
          compact
            ? "flex shrink-0 flex-col gap-1.5 border-t border-border/70 px-3 py-3"
            : "flex items-center gap-4 p-5"
        }
      >
        <div className={compact ? "min-w-0" : "min-w-0 flex-1"} aria-live="off" aria-atomic="true">
          {eyebrow && <p className="eyebrow text-primary-soft">{eyebrow}</p>}
          <h3
            className={
              compact
                ? "text-sm font-semibold leading-5"
                : "mt-2 text-xl font-black leading-7 sm:text-2xl sm:leading-8"
            }
          >
            {current.title}
          </h3>
          {multiple && !compact && (
            <p
              className={`mt-1 text-xs tabular-nums ${compact ? "text-muted-foreground" : "text-background/60"}`}
            >
              {selected + 1} / {photos.length}
            </p>
          )}
        </div>
        {multiple && compact && (
          <p className="text-xs tabular-nums text-muted-foreground" aria-live="off">
            {selected + 1} / {photos.length}
          </p>
        )}
      </div>
    </Carousel>
  );
}
