import { SITE } from "@/lib/catalog";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  email: SITE.supportEmail,
  areaServed: SITE.country,
  sameAs: [],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: SITE.locale,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/games?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function StructuredData() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
