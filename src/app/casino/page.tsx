import type { Metadata } from "next";
import { CasinoPage } from "@/components/bsl/category-pages";

export const metadata: Metadata = { title: "Live Casino" };

export default function Page() {
  return <CasinoPage />;
}
