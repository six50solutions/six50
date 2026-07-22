import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Parser from "rss-parser";

// Helper interface for blog posts
interface BlogPost {
    title: string;
    excerpt: string;
    category: string;
    href: string;
    isExternal?: boolean;
    date?: string;
}

const localPosts: BlogPost[] = [
    {
        title: "2 Cents from six50: The $3,200/Month Mistake Hiding in Manual Invoicing",
        excerpt: "Businesses lose $2,500–$4,000 per month not because customers won’t pay — but because invoices are sent late. Fixing this takes less than 7 days.",
        category: "Operations & Finance",
        href: "/blog/automating-invoicing-mistakes",
    },
    {
        title: "2 Cents from six50: Why 70% of “AI Projects” Never Pay Off",
        excerpt: "Most AI initiatives fail because they automate activity, not outcomes. Projects tied to a measurable metric are 3× more likely to deliver ROI within 90 days.",
        category: "Strategy & AI",
        href: "/blog/why-ai-projects-fail",
    },
    {
        title: "2 Cents from six50: One Automation That Saves 12 Hours a Week",
        excerpt: "Automating internal approvals (quotes, discounts, invoices, POs) saves 8–15 hours/week and reduces delays by 30–50% — with minimal tech changes.",
        category: "Operations & Efficiency",
        href: "/blog/automation-saves-12-hours",
    },
    {
        title: "2 Cents from six50: The 3-Tool Rule That Keeps Automation from Failing",
        excerpt: "Automation stacks with more than 3 core tools see adoption drop by 40%. Fewer tools = higher usage, lower failure rates.",
        category: "Automation Strategy",
        href: "/blog/3-tool-rule-automation",
    },
    {
        title: "2 Cents from six50: Why Faster Automation Isn’t Always Better",
        excerpt: "Automating a broken process can make things worse. Teams that stabilize workflows first see 2× faster ROI and fewer rework cycles.",
        category: "Process Optimization",
        href: "/blog/faster-automation-not-better",
    },
];

const arbitragePosts: BlogPost[] = [
    {
        title: "When the Model Became the Attacker",
        excerpt: "OpenAI says two of its own models broke out of an internal security test, found a zero-day, and pulled data from Hugging Face's production database, an incident both companies are calling unprecedented.",
        category: "AI Arbitrage",
        href: "/ai-arbitrage/2026-07-22.html",
        isExternal: true,
        date: "2026-07-22",
    },
    {
                title: "A Federal Judge Just Priced AI's Copyright Risk at $1.5 Billion",
                excerpt: "Anthropic's landmark settlement is final now. What it actually resolves, and what it very much doesn't, matters more to every AI-using business than the headline number does.",
                category: "AI Arbitrage",
                href: "/ai-arbitrage/2026-07-21.html",
                isExternal: true,
                date: "2026-07-21",
    },
    {
                title: "The Fable 5 Saga Ends in Two Tiers, Not One",
                excerpt: "Three deadline extensions later, Anthropic has finally committed to where Fable 5 lives. The answer depends entirely on which plan you're paying for.",
                category: "AI Arbitrage",
                href: "/ai-arbitrage/2026-07-20.html",
                isExternal: true,
                date: "2026-07-20",
    },
    {
                title: "The Fable 5 Cliff",
                excerpt: "Anthropic has now moved the goalposts on Claude's flagship model three times in five weeks. Sunday is when the bill actually comes due.",
                category: "AI Arbitrage",
                href: "/ai-arbitrage/2026-07-17.html",
                isExternal: true,
                date: "2026-07-17",
    },
    ];

async function getSubstackPosts(): Promise<BlogPost[]> {
    const parser = new Parser();
    try {
        const feed = await parser.parseURL("https://adilghazali.substack.com/feed");
        return feed.items
            .filter((item) => item.title !== "Coming soon")
            .map((item) => ({
                title: item.title || "Untitled Post",
                excerpt: item.contentSnippet?.slice(0, 160) + (item.contentSnippet && item.contentSnippet.length > 160 ? "..." : "") || "",
                category: "Substack",
                href: item.link || "#",
                isExternal: true,
                date: item.pubDate,
            }));
    } catch (error) {
        console.error("Error fetching Substack feed:", error);
        return [];
    }
}

export const revalidate = 3600; // Revalidate every hour

export default async function BlogIndexPage() {
    const substackPosts = await getSubstackPosts();
    // Combine posts, sorting dated posts (Substack + AI Arbitrage) by recency, evergreen local posts last
        const datedPosts = [...substackPosts, ...arbitragePosts].sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
        const allPosts = [...datedPosts, ...localPosts];

    return (
        <div className="pt-20">
            <Section>
                <FadeIn>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-paper mb-6">
                                    Insights
                                </h1>
                                <p className="text-xl text-fog max-w-2xl">
                                    Thoughts on strategy, efficiency, and the practical application of AI in the enterprise.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <a
                                    href="https://adilghazali.substack.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-[#FF6719] text-paper font-medium rounded-md hover:bg-[#E54D00] transition-colors shadow-none"
                                >
                                    Subscribe on Substack <ExternalLink className="w-4 h-4 ml-2" />
                                </a>
                            </div>
                        </div>

                        <div className="grid gap-8">
                            {allPosts.map((post, index) => (
                                <LinkTypeWrapper key={index} post={post}>
                                    <article className="border border-line rounded-sm p-8 hover:shadow-2xl hover:shadow-black/50 transition-all bg-ink-800 h-full">
                                        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between h-full">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="text-xs font-semibold tracking-wider text-gold-500 uppercase">
                                                        {post.category}
                                                    </div>
                                                    {post.date && (
                                                        <span className="text-xs text-fog-2">
                                                            • {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </span>
                                                    )}
                                                </div>
                                                <h2 className="text-2xl font-bold text-paper mb-3 group-hover:text-gold-500 transition-colors">
                                                    {post.title}
                                                </h2>
                                                <p className="text-fog leading-relaxed max-w-2xl mb-4 line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0 mt-auto md:mt-0">
                                                <span className="inline-flex items-center text-sm font-medium text-fog group-hover:text-gold-500 transition-colors">
                                                    {post.category === "Substack" ? "Read on Substack" : post.isExternal ? "Read Newsletter" : "Read Article"} <ArrowRight className="w-4 h-4 ml-2" />
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </LinkTypeWrapper>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </div>
    );
}

function LinkTypeWrapper({ post, children }: { post: BlogPost; children: React.ReactNode }) {
    if (post.isExternal) {
        return (
            <a href={post.href} target="_blank" rel="noopener noreferrer" className="group block">
                {children}
            </a>
        );
    }
    return (
        <Link href={post.href} className="group block">
            {children}
        </Link>
    );
}
