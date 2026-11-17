import { createFileRoute } from "@tanstack/react-router";
import { CategoryRoute } from "@/components/category-pages";
import {mainPageSeo,  pillars } from "@/lib/site-data";
import { pageHead, breadcrumbSchema } from "@/lib/seo";
const p = pillars["power-transmission"];
export const Route = createFileRoute("/power-transmission")({
  validateSearch: (search: Record<string, unknown>) => ({
    product: typeof search["product"] === "string" ? search["product"] : undefined,
  }),
  head: ({ matches }) =>
    matches.at(-1)?.routeId === "/power-transmission" ? pageHead(
      mainPageSeo["/power-transmission"].title,
      mainPageSeo["/power-transmission"].description,
      "/power-transmission",
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: p.name, path: "/power-transmission" },
      ]),
    ) : {},
  component: () => <CategoryRoute pillar={p} />,
});
