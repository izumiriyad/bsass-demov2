import type { Metadata } from "next";
import { WalletActionPage } from "@/components/bsl/wallet-action-page";
export const metadata: Metadata = { title: "Deposit" };
export default function DepositPage(){return <WalletActionPage action="deposit" />}
