import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import SplashCursor from "@/components/SplashCursor";
import MobileDock from "@/components/MobileDock";
import Chatbot from "@/components/Chatbot";
import SoundManager from "@/components/SoundManager";
import EasterEggManager from "@/components/EasterEggManager";
import PageTransition from "@/components/PageTransition";

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
                url: "/og-image.png",
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
        images: ["/og-image.png"],
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

const siteUrl = "https://selva-aiworks.github.io";

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": `${siteUrl}/#person`,
            name: "Selva",
            alternateName: ["Selva G", "G Selva", "Selva AI Engineer", "Selva Bangalore"],
            url: siteUrl,
            jobTitle: "CTO & AI/ML Engineer",
            description: "Selva (Selva G) — AI Software Engineer at *astTECS and CTO at Voxel, based in Bangalore. Specializing in Generative AI, Agentic Systems, Machine Learning, and web development with React and Next.js.",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Bangalore",
                addressRegion: "Karnataka",
                addressCountry: "IN",
            },
            worksFor: {
                "@type": "Organization",
                name: "Voxel",
                url: "https://heisenbergdruglab.github.io/",
                description: "Digital Solutions Company",
            },
            colleague: {
                "@type": "Person",
                name: "Sharan Raj VK",
                url: "https://sharan-raj-ai.github.io/",
                jobTitle: "CEO, Voxel",
            },
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
            sameAs: [
                "https://github.com/selva-aiworks",
                "https://www.linkedin.com/in/selva-g",
            ],
        },
        {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: siteUrl,
            name: "Selva - Selva G | AI Engineer & CTO at Voxel - Bangalore",
            description: "Portfolio of Selva (Selva G), CTO at Voxel, AI/ML Engineer and Website Developer in Bangalore. Projects in Generative AI, ML, and web development.",
            publisher: { "@id": `${siteUrl}/#person` },
        },
        {
            "@type": "Organization",
            "@id": `${siteUrl}/#voxel`,
            name: "Voxel",
            url: "https://heisenbergdruglab.github.io/",
            description: "Digital Solutions Company",
            founder: [
                { "@id": `${siteUrl}/#person` },
            ],
        },
        {
            "@type": "FAQPage",
            "@id": `${siteUrl}/#faq`,
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
                        text: "You can contact Selva at selvaofficialmail@gmail.com, call +91 9363087305, or visit his portfolio at https://selva-aiworks.github.io/contact for collaborations, AI projects, and hiring inquiries.",
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
            <body className={`${outfit.className} ${inter.variable} ${cormorant.variable} ${shareTechMono.variable}`}>
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
                <MobileDock />
                <Chatbot />
            </body>
        </html>
    );
}
