import type { Metadata } from "next";
import { CockfightingPage } from "@/components/bsl/category-pages";

export const metadata: Metadata = { title: "Cockfighting" };

export default function Page() {
  return <CockfightingPage />;
}
