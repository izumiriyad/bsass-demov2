import type { Metadata } from "next";
import { LotteryPage } from "@/components/bsl/category-pages";

export const metadata: Metadata = { title: "Lottery" };

export default function Page() {
  return <LotteryPage />;
}
