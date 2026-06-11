import React from "react";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "six50 solutions LLC",
    alternateName: ["six50", "Six50 Solutions", "Six Fifty Solutions"],
    url: "https://six50.io",
    logo: "https://six50.io/icon.svg",
    description: "AI strategy & operations advisory combining Big Four financial rigor with practical automation. Serving founder-led and PE-backed businesses ($2M-$50M).",
    foundingDate: "2025",
    founder: { "@type": "Person", name: "Adil Ghazali", jobTitle: "Founder & Managing Principal", sameAs: "https://linkedin.com/in/adil-ghazali-7457039/" },
    address: { "@type": "PostalAddress", addressLocality: "Chicago", addressRegion: "IL", addressCountry: "US" },
    areaServed: { "@type": "Country", name: "United States" },
    contactPoint: { "@type": "ContactPoint", contactType: "customer service", url: "https://six50.io/contact" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "six50 solutions LLC",
    url: "https://six50.io",
    address: { "@type": "PostalAddress", addressLocality: "Chicago", addressRegion: "IL", addressCountry: "US" },
    geo: { "@type": "GeoCoordinates", latitude: 41.8781, longitude: -87.6298 },
    description: "Chicago-area AI automation and fractional CFO consulting firm.",
    priceRange: "$$$$",
    areaServed: [
      { "@type": "City", name: "Chicago" },
      { "@type": "AdministrativeArea", name: "Illinois" },
      { "@type": "Country", name: "United States" },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "six50 solutions",
    url: "https://six50.io",
    description: "AI strategy & operations advisory for founder-led and PE-backed businesses.",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://six50.io/blog?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

interface ServiceSchemaProps { name: string; description: string; url: string; }
export function ServiceSchema({ name, description, url }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name, description, url,
    provider: { "@type": "Organization", name: "six50 solutions LLC", url: "https://six50.io" },
    areaServed: { "@type": "Country", name: "United States" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Adil Ghazali",
    jobTitle: "Founder & Managing Principal",
    worksFor: { "@type": "Organization", name: "six50 solutions LLC", url: "https://six50.io" },
    alumniOf: { "@type": "EducationalOrganization", name: "Northern Illinois University" },
    hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "CPA", recognizedBy: { "@type": "Organization", name: "Illinois CPA Society" } },
    knowsAbout: ["AI Strategy", "Financial Consulting", "Workflow Automation", "Fractional CFO", "Financial Services Transformation", "Private Equity Operations"],
    sameAs: ["https://linkedin.com/in/adil-ghazali-7457039/"],
    url: "https://six50.io/about",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
