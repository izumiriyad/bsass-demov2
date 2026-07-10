import type { Metadata } from "next";
import { ArcadePage } from "@/components/bsl/category-pages";

export const metadata: Metadata = { title: "Arcade" };

export default function Page() {
  return <ArcadePage />;
}
