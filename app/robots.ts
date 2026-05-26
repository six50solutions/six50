import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*",               allow: "/", disallow: ["/login", "/api/", "/_next/"] },
      { userAgent: "GPTBot",          allow: "/", disallow: ["/login", "/api/"] },
      { userAgent: "ClaudeBot",       allow: "/", disallow: ["/login", "/api/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/login", "/api/"] },
      { userAgent: "PerplexityBot",   allow: "/", disallow: ["/login", "/api/"] },
      { userAgent: "FacebookBot",     allow: "/", disallow: ["/login", "/api/"] },
      { userAgent: "CCBot",           allow: "/" },
    ],
    sitemap: "https://six50.io/sitemap.xml",
    host: "https://six50.io",
  };
}
