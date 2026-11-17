import {createFileRoute} from "@tanstack/react-router";import {CategoryRoute} from "@/components/category-pages";import {mainPageSeo, pillars} from "@/lib/site-data";import {pageHead,breadcrumbSchema} from "@/lib/seo";
const p=pillars.adhesives;export const Route=createFileRoute("/adhesives")({validateSearch:(search:Record<string,unknown>)=>({product:typeof search["product"]==="string"?search["product"]:undefined}),head:({matches})=>matches.at(-1)?.routeId==="/adhesives"?pageHead(
      mainPageSeo["/adhesives"].title,
      mainPageSeo["/adhesives"].description,"/adhesives",breadcrumbSchema([{name:"Home",path:"/"},{name:p.name,path:"/adhesives" }])):{},component:()=> <CategoryRoute pillar={p}/>});
