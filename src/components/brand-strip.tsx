import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { getBrandLogo, getBrandLogoAlt } from "@/lib/site-data";

export function BrandStrip({ brands }: { brands: string[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPlaying(!motion.matches);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!api || !playing) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, 3000);
    return () => window.clearInterval(timer);
  }, [api, playing]);

  if (!brands.length) return null;
  const slides = brands.length > 4 ? brands : [...brands, ...brands, ...brands];
  const controlClass =
    "static size-9 translate-y-0 rounded-none border-background/25 bg-transparent text-background hover:bg-background hover:text-foreground";

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      setApi={setApi}
      className="brand-strip min-w-0"
      aria-label="Available brands"
      onFocusCapture={(event) => {
        if (event.target.matches(":focus-visible")) setPlaying(false);
      }}
    >
      <CarouselContent className="ml-0 touch-pan-y" aria-live="off">
        {slides.map((brand, index) => {
          const logo = getBrandLogo(brand);
          return (
            <CarouselItem
              key={`${brand}-${index}`}
              className="basis-1/2 pl-0 sm:basis-1/3 lg:basis-1/4"
              aria-label={brand}
            >
              <div className="brand-tile">
                {logo ? (
                  <>
                    <div className="brand-logo-frame">
                      <img
                        src={logo.src}
                        alt={getBrandLogoAlt(brand)}
                        width={180}
                        height={88}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        style={{
                          objectFit: logo.fit ?? "contain",
                          objectPosition: logo.position ?? "center",
                          transform: logo.scale ? `scale(${logo.scale})` : undefined,
                        }}
                      />
                    </div>
                    <span className="brand-tile-label">{brand}</span>
                  </>
                ) : (
                  <span>{brand}</span>
                )}
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="mt-3 flex justify-end gap-2">
        <CarouselPrevious className={controlClass} title="Previous brands" />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={controlClass}
          aria-label={playing ? "Pause automatic sliding" : "Start automatic sliding"}
          title={playing ? "Pause automatic sliding" : "Start automatic sliding"}
          onClick={() => setPlaying((value) => !value)}
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </Button>
        <CarouselNext className={controlClass} title="Next brands" />
      </div>
    </Carousel>
  );
}
