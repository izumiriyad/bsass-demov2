import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SidebarProvider } from "@/components/layout/sidebar-provider";
import { AppShell } from "@/components/layout/app-shell";
import { getSessionUser } from "@/lib/auth";
import { SITE } from "@/lib/catalog";
import { StructuredData } from "@/components/providers/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: {
    template: `%s | ${SITE.name}`,
    default: `${SITE.name} Bangladesh`,
  },
  description: SITE.description,
  manifest: "/manifest.webmanifest",
  keywords: [
    "BSL Gaming",
    "Bangladesh betting",
    "BDT sports betting",
    "cricket betting Bangladesh",
    "live casino Bangladesh",
    "bKash deposit",
    "Nagad deposit",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} Bangladesh`,
    description: SITE.description,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: `${SITE.name} Bangladesh` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} Bangladesh`,
    description: SITE.description,
    images: ["/og.svg"],
  },
  appleWebApp: {
    capable: true,
    title: SITE.shortName,
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#121315",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initialUser = await getSessionUser();

  return (
    <html lang="en" className="dark" data-theme="dark">
      <body>
        <StructuredData />
        <Providers initialUser={initialUser}>
          <SidebarProvider>
            <AppShell>{children}</AppShell>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
