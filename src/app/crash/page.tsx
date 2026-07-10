import type { Metadata } from "next";
import { CrashPage } from "@/components/bsl/category-pages";

export const metadata: Metadata = { title: "Crash" };

export default function Page() {
  return <CrashPage />;
}
