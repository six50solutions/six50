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
        title: "Finclar",
        description: "An intelligent financial dashboard that acts as an automated CFO for SMBs. It visualizes financial health, tracks KPIs, and provides AI-driven insights for strategic decision-making.",
        url: "https://finclar.dev",
        takeaways: [
            "Automated financial health monitoring and KPI tracking.",
            "AI-driven insights that translate numbers into strategy.",
            "Clean, executive-level dashboarding for non-finance founders."
        ],
        image: "/images/pulse_v2.png",
        status: "Live"
    },
    {
        title: "Flowtation",
        description: "Converts plain-language process descriptions into BPMN-compliant flow diagrams with drill-down detail. The infrastructure layer for AI-assisted RCSA, control design, and continuous risk monitoring.",
        url: "https://flowtation.dev",
        takeaways: [
            "From process map to risk posture in hours, not weeks.",
            "BPMN 2.0 compliant by default, COSO-mapped controls.",
            "10x faster than workshop-driven RCSA documentation."
        ],
        image: "/images/flowtation_v1.png",
        status: "Beta"
    },
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
    }
];

export default function ProjectsPage() {
    return (
        <div className="pt-20">
            <Section>
                <FadeIn>
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-paper mb-6">
                            Products
                        </h1>
                        <p className="text-xl text-fog mb-16 w-full">
                            Currently active software solutions created by Six50. We build and continually refine these intelligent, practical systems to solve real-world operational challenges.
                        </p>

                        <div className="grid gap-12">
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-ink-800 border border-line rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="grid md:grid-cols-2 gap-0">
                                        {/* Visual Side */}
                                        <div className="h-64 md:h-auto w-full relative overflow-hidden bg-ink-700">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="inline-block px-3 py-1 bg-ink-800/90 backdrop-blur-sm border border-line rounded-full text-xs font-semibold text-paper uppercase tracking-wider shadow-none">
                                                    {project.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Side */}
                                        <div className="p-8 md:p-12 flex flex-col justify-center">
                                            <div className="mb-6">
                                                <h2 className="text-2xl font-bold text-paper mb-4 group-hover:text-gold-500 transition-colors">
                                                    {project.title}
                                                </h2>
                                                <p className="text-fog leading-relaxed mb-6">
                                                    {project.description}
                                                </p>

                                                <div className="space-y-3 mb-8">
                                                    <h4 className="text-xs font-bold text-fog-2 uppercase tracking-widest mb-2">Key Takeaways</h4>
                                                    {project.takeaways.map((takeaway, idx) => (
                                                        <div key={idx} className="flex items-start gap-3">
                                                            <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                                                            <span className="text-sm text-paper">{takeaway}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-auto">
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-sm font-semibold text-gold-500 hover:text-gold-400 transition-colors"
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
                            <p className="text-fog mb-6">Have an idea you want to build?</p>
                            <Link href="/contact" className="inline-flex items-center rounded-[3px] bg-gold-500 px-6 py-3 font-mono text-sm uppercase tracking-[0.05em] text-ink-900 transition-colors hover:bg-gold-400">
                                Let's Work Together
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </div>
    );
}
