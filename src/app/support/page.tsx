import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, Clock } from "lucide-react";
import { SITE } from "@/lib/catalog";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Support",
  description: `Contact ${SITE.name} support — available 24/7`,
};

const CONTACT_OPTIONS = [
  { icon: Mail, title: "Email", value: SITE.supportEmail, desc: "We respond within 24 hours", color: "#00a86d" },
  { icon: MessageCircle, title: "Live Chat", value: "Available 24/7", desc: "Chat with our support team instantly", color: "#ffdf19" },
  { icon: Phone, title: "Phone", value: "+880 1XXX-XXXXXX", desc: "Call us anytime, day or night", color: "#3b82f6" },
];

export default function SupportPage() {
  return (
    <div className="space-y-6 px-3 py-4 sm:px-5 sm:py-6">
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="text-xl">🎧</span>
        <h1 className="text-lg font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-2xl">
          Support
        </h1>
      </div>
      <p className="max-w-2xl text-sm text-[#9ca3af]">
        We&apos;re here to help. Contact {SITE.name} support through any of the channels below, or send us a message using the contact form.
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        {CONTACT_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <div key={opt.title} className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `${opt.color}20` }}>
                <Icon className="h-5 w-5" style={{ color: opt.color }} />
              </div>
              <h3 className="mt-3 text-sm font-bold text-[#f0f0f0]">{opt.title}</h3>
              <p className="mt-1 text-sm font-semibold" style={{ color: opt.color }}>{opt.value}</p>
              <p className="mt-1 text-xs text-[#9ca3af]">{opt.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-[#008d5b]/30 bg-[#008d5b]/10 p-4">
        <Clock className="h-5 w-5 shrink-0 text-[#00a86d]" />
        <p className="text-sm text-[#9ca3af]">
          <span className="font-semibold text-[#00a86d]">Support Hours:</span> Our support team is available 24 hours a day, 7 days a week, 365 days a year.
        </p>
      </div>

      <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#f0f0f0]">Send us a message</h2>
        <ContactForm />
      </div>
    </div>
  );
}
