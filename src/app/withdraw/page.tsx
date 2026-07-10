import type { Metadata } from "next";
import { WalletActionPage } from "@/components/bsl/wallet-action-page";
export const metadata: Metadata = { title: "Withdraw" };
export default function WithdrawPage(){return <WalletActionPage action="withdraw" />}
