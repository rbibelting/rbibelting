import {createFileRoute} from "@tanstack/react-router";import {CategoryRoute} from "@/components/category-pages";import {mainPageSeo, pillars} from "@/lib/site-data";import {pageHead,breadcrumbSchema} from "@/lib/seo";
const p=pillars.automation;export const Route=createFileRoute("/automation")({validateSearch:(search:Record<string,unknown>)=>({product:typeof search["product"]==="string"?search["product"]:undefined}),head:({matches})=>matches.at(-1)?.routeId==="/automation"?pageHead(
      mainPageSeo["/automation"].title,
      mainPageSeo["/automation"].description,"/automation",breadcrumbSchema([{name:"Home",path:"/"},{name:p.name,path:"/automation" }])):{},component:()=> <CategoryRoute pillar={p}/>});
