import type { Metadata } from "next";
import { PopularPage } from "@/components/bsl/category-pages";

export const metadata: Metadata = { title: "Popular" };

export default function Page() {
  return <PopularPage />;
}
