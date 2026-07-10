import type { Metadata } from "next";
import { CricketPage } from "@/components/bsl/category-pages";

export const metadata: Metadata = { title: "Cricket" };

export default function Page() {
  return <CricketPage />;
}
