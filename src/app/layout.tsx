import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond, Share_Tech_Mono, Noto_Sans_Tamil, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import SplashCursor from "@/components/SplashCursor";
import Chatbot from "@/components/Chatbot";
import SoundManager from "@/components/SoundManager";
import EasterEggManager from "@/components/EasterEggManager";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter'
});
const outfit = Outfit({
    subsets: ["latin"],
    variable: '--font-outfit'
});
const cormorant = Cormorant_Garamond({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ["latin"],
    style: ['normal', 'italic'],
    variable: '--font-cormorant'
});
const shareTechMono = Share_Tech_Mono({
    weight: '400',
    subsets: ["latin"],
    variable: '--font-share-tech-mono'
});
const notoTamil = Noto_Sans_Tamil({
    weight: ['400', '500', '600'],
    subsets: ["tamil"],
    variable: '--font-noto-tamil'
});
const notoHindi = Noto_Sans_Devanagari({
    weight: ['400', '500', '600'],
    subsets: ["devanagari"],
    variable: '--font-noto-hindi'
});

const siteName = "Selva";
const siteNameAlt = "Selva G";
const siteDescription =
    "Selva (Selva G) — AI/ML Engineer & CTO at Voxel. Website Developer in Bangalore. Specializing in Generative AI, Agentic Systems, ML, React, Next.js. Hire Bangalore AI engineer for AI and web projects.";

export const metadata: Metadata = {
    title: {
        default: "Selva | Selva G — AI Engineer & Website Developer Bangalore",
        template: "%s | Selva - AI Engineer Bangalore",
    },
    description: siteDescription,
    keywords: [
        // Primary Brand Keywords
        "Selva",
        "Selva G",
        "G Selva",
        "Selva AI",
        "Selva AI Engineer",
        "Selva portfolio",
        "Selva Bangalore",
        // Location-Based Professional Keywords
        "AI Engineer Bangalore",
        "Bangalore AI engineer",
        "Website developer Bangalore",
        "Web developer Bangalore",
        "Bangalore web developer",
        // Professional Roles
        "AI/ML Engineer",
        "Machine Learning engineer Bangalore",
        "CTO Voxel",
        "Voxel digital solutions",
        // Tech Keywords
        "Generative AI",
        "React developer",
        "Next.js developer",
        "Portfolio",
        "Creative Developer",
    ],
    authors: [{ name: "Selva", url: "https://selva-aiworks.github.io" }],
    creator: "Selva",
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://selva-aiworks.github.io",
        title: "Selva | Selva G — AI Engineer & Website Developer Bangalore",
        description: "Selva (Selva G) — AI Engineer and Website Developer in Bangalore. Generative AI, Agentic Systems, ML. Hire for AI and web projects.",
        siteName: "Selva Portfolio — AI Engineer Bangalore",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "G Selva - AI/ML Engineer & CTO at Voxel - Bangalore",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Selva | Selva G — AI Engineer & CTO at Voxel",
        description: "AI/ML Engineer & CTO at Voxel. Website Developer in Bangalore. Generative AI, Agentic Systems.",
        images: ["/og-image.webp"],
    },
    metadataBase: new URL("https://selva-aiworks.github.io"),
    alternates: { canonical: "https://selva-aiworks.github.io" },
    verification: {
        google: "-6PfqhlhkrsTOC6tiwMO_2E3meBg4OQAWkqI6LBLvzU",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
    icons: {
        icon: "/icon.svg",
        shortcut: "/icon.svg",
        apple: [
            { url: "/icon.svg", sizes: "180x180", type: "image/svg+xml" },
        ],
    },
};

import { siteConfig, projects, currentlyWorkingProjects } from "@/data/portfolio";

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": `${siteConfig.url}/#person`,
            name: siteConfig.author.name,
            alternateName: siteConfig.author.alternateNames,
            url: siteConfig.url,
            jobTitle: siteConfig.author.role,
            description: siteConfig.description,
            email: siteConfig.author.email,
            address: {
                "@type": "PostalAddress",
                addressLocality: "Bangalore",
                addressRegion: "Karnataka",
                addressCountry: "IN",
            },
            worksFor: {
                "@type": "Organization",
                name: "Voxel",
                url: siteConfig.author.socials.voxel,
                description: "Digital Solutions Company",
            },
            sameAs: [
                siteConfig.author.socials.github,
                siteConfig.author.socials.linkedin,
            ],
            knowsAbout: [
                "Generative AI",
                "Agentic AI",
                "Machine Learning",
                "React",
                "Next.js",
                "Python",
                "Website Development",
                "Digital Solutions",
            ],
        },
        {
            "@type": "WebSite",
            "@id": `${siteConfig.url}/#website`,
            url: siteConfig.url,
            name: siteConfig.title,
            description: siteConfig.description,
            publisher: { "@id": `${siteConfig.url}/#person` },
            inLanguage: "en-US",
        },
        {
            "@type": "Organization",
            "@id": `${siteConfig.url}/#voxel`,
            name: "Voxel",
            url: siteConfig.author.socials.voxel,
            description: "Digital Solutions Company",
            founder: [
                { "@id": `${siteConfig.url}/#person` },
            ],
        },
        {
            "@type": "ItemList",
            "@id": `${siteConfig.url}/#projects`,
            name: "Key Projects",
            description: "A selection of AI and engineering projects focused on Generative AI, Automation, and Web Development.",
            itemListElement: [
                ...projects,
                ...currentlyWorkingProjects
            ].map((project, index) => ({
                "@type": "SoftwareSourceCode",
                position: index + 1,
                name: project.title,
                description: project.description,
                programmingLanguage: project.tags.join(", "),
                author: { "@id": `${siteConfig.url}/#person` },
                url: `${siteConfig.url}/#${project.title.toLowerCase().replace(/\s+/g, '-')}`
            }))
        },
        {
            "@type": "FAQPage",
            "@id": `${siteConfig.url}/#faq`,
            mainEntity: [
                {
                    "@type": "Question",
                    name: "Who is Selva?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Selva (also known as G Selva or Selva G) is an AI Software Engineer at *astTECS and CTO at Voxel, based in Bangalore, India. He specializes in Generative AI, Agentic AI systems, LLM optimization, and web development with React and Next.js.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Who is G Selva AI Engineer?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "G Selva is an AI Software Engineer at *astTECS Unified Communication Pvt Ltd and CTO of Voxel, based in Bangalore, India. He has expertise in building RAG pipelines, conversational AI agents, lip-sync avatar generation, and multi-agent systems.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is Voxel?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Voxel is a digital solutions company founded by Selva (CTO) and his friend Sharan Raj VK (CEO). They provide AI-powered Digital solutions.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How to contact Selva AI Engineer?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `You can contact Selva at ${siteConfig.author.email}, or visit his portfolio at ${siteConfig.url} for collaborations, AI projects, and hiring inquiries.`,
                    },
                },
            ],
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.className} ${inter.variable} ${cormorant.variable} ${shareTechMono.variable} ${notoTamil.variable} ${notoHindi.variable}`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <EasterEggManager />
                <SoundManager />
                <SplashCursor />
                <div className="relative">
                    {children}
                </div>
                <Chatbot />
            </body>
        </html>
    );
}
