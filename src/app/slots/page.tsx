import type { Metadata } from "next";
import { SlotsPage } from "@/components/bsl/category-pages";

export const metadata: Metadata = { title: "Slots" };

export default function Page() {
  return <SlotsPage />;
}
