import type { Metadata } from "next";
import { LegalPage } from "@/components/bsl/legal-page";
export const metadata: Metadata = { title: "Accessibility" };
export default function AccessibilityPage(){return <LegalPage eyebrow="Inclusive UX" title="Accessibility Statement" description="BSL Gaming frontend accessibility commitments and support channels." sections={[{title:"Keyboard Navigation",body:"Core navigation, modals, filters, bet slip and forms include focus states and keyboard-friendly controls."},{title:"Reduced Motion",body:"The UI respects reduced-motion preferences to reduce animation intensity for sensitive users."},{title:"Feedback",body:"Users can contact support if they encounter accessibility barriers or need assistance."}]}/>}
