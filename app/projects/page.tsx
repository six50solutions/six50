import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, CheckCircle2, ArrowRight } from "lucide-react";

interface Project {
    title: string;
    description: string;
    url: string;
    takeaways: string[];
    image: string;
    status: "Live" | "Beta" | "Development";
}

const projects: Project[] = [
    {
        title: "Vibes Sync",
        description: "An AI-powered group scheduling tool that eliminates the headache of finding a date. It syncs everyone's availability and preferences to find the perfect time for the group.",
        url: "https://vibessync.io",
        takeaways: [
            "Solves the 'group chat scheduling nightmare' with AI.",
            "Real-time availability syncing and 'vibe' matching.",
            "Built for social groups to actually make plans happen."
        ],
        image: "/images/vibessync_v3.png",
        status: "Live"
    },
    {
        title: "Pulse AI CFO",
        description: "An intelligent financial dashboard that acts as an automated CFO for SMBs. It visualizes financial health, tracks KPIs, and provides AI-driven insights for strategic decision-making.",
        url: "https://pulseaicfo.com",
        takeaways: [
            "Automated financial health monitoring and KPI tracking.",
            "AI-driven insights that translate numbers into strategy.",
            "Clean, executive-level dashboarding for non-finance founders."
        ],
        image: "/images/pulse_v2.png",
        status: "Live"
    },
    {
        title: "AiMoree",
        description: "A dating platform bridging the gap between human connection and AI. Features smart match scores, trending profiles, and intelligent date planning assistance.",
        url: "https://aimoree.io",
        takeaways: [
            "Hybrid AI + Human dating experience.",
            "Smart match scores based on deep compatibility analysis.",
            "Innovative approach to modern relationship building."
        ],
        image: "/images/aimoree_v2.png",
        status: "Live"
    }
];

export default function ProjectsPage() {
    return (
        <div className="pt-20">
            <Section>
                <FadeIn>
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                            Ventures
                        </h1>
                        <p className="text-xl text-slate-600 mb-16 max-w-2xl">
                            Building the future of practical AI. A collection of active projects and experiments pushing the boundaries of what's possible.
                        </p>

                        <div className="grid gap-12">
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="grid md:grid-cols-2 gap-0">
                                        {/* Visual Side */}
                                        <div className="h-64 md:h-auto w-full relative overflow-hidden bg-slate-100">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full text-xs font-semibold text-slate-800 uppercase tracking-wider shadow-sm">
                                                    {project.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Side */}
                                        <div className="p-8 md:p-12 flex flex-col justify-center">
                                            <div className="mb-6">
                                                <h2 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-gold-600 transition-colors">
                                                    {project.title}
                                                </h2>
                                                <p className="text-slate-600 leading-relaxed mb-6">
                                                    {project.description}
                                                </p>

                                                <div className="space-y-3 mb-8">
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Key Takeaways</h4>
                                                    {project.takeaways.map((takeaway, idx) => (
                                                        <div key={idx} className="flex items-start gap-3">
                                                            <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                                                            <span className="text-sm text-slate-700">{takeaway}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-auto">
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors"
                                                >
                                                    Visit Project <ArrowRight className="w-4 h-4 ml-2" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-24 text-center">
                            <p className="text-slate-500 mb-6">Have an idea you want to build?</p>
                            <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors">
                                Let's Work Together
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </div>
    );
}
