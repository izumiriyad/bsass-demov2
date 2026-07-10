import type { Metadata } from "next";
import { FishingPage } from "@/components/bsl/category-pages";

export const metadata: Metadata = { title: "Fishing" };

export default function Page() {
  return <FishingPage />;
}
