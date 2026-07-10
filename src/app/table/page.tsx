import type { Metadata } from "next";
import { TablePage } from "@/components/bsl/category-pages";

export const metadata: Metadata = { title: "Table Games" };

export default function Page() {
  return <TablePage />;
}
