import type { Metadata } from "next";
import { SportsPage } from "@/components/bsl/category-pages";

export const metadata: Metadata = { title: "Sports" };

export default function Page() {
  return <SportsPage />;
}
