import type { Metadata } from "next";
import { LegalPage } from "@/components/bsl/legal-page";
export const metadata: Metadata = { title: "KYC Policy" };
export default function KYCPolicyPage(){return <LegalPage eyebrow="Verification" title="KYC Policy" description="Identity verification policy UI for Bangladesh mobile, NID/passport and address verification." sections={[{title:"Mobile Verification",body:"Users should verify ownership of a Bangladesh mobile number using OTP before wallet actions."},{title:"Identity Documents",body:"NID/passport and date of birth checks help enforce age limits, reduce fraud and protect withdrawals."},{title:"Review States",body:"Accounts can be unverified, pending review, approved, rejected or restricted with clear user-facing explanations."}]}/>}
