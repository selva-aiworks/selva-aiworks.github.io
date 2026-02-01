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
    "Selva (Selva G) — AI Engineer and Website Developer in Bangalore. Portfolio: Generative AI, Agentic Systems, ML, React, Next.js. Hire Bangalore AI engineer for AI and web projects.";

export const metadata: Metadata = {
    title: {
        default: "Selva | Selva G — AI Engineer & Website Developer Bangalore",
        template: "%s | Selva - AI Engineer Bangalore",
    },
    description: siteDescription,
    keywords: [
        "Selva",
        "Selva G",
        "AI Engineer",
        "AI Engineer Bangalore",
        "Bangalore AI engineer",
        "Website developer Bangalore",
        "Web developer Bangalore",
        "Machine Learning engineer Bangalore",
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
                url: "/icon.svg",
                width: 1200,
                height: 630,
                alt: "Selva - Selva G - AI Engineer & Website Developer Bangalore",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Selva | Selva G — AI Engineer Bangalore",
        description: "AI Engineer & Website Developer in Bangalore. Generative AI, Agentic Systems, React, Next.js.",
        creator: "@selva_ai",
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
            alternateName: ["Selva G", "Selva - AI Engineer", "Selva Bangalore"],
            url: siteUrl,
            jobTitle: "AI Engineer & Website Developer",
            description: "Selva (Selva G) — AI Engineer and Website Developer in Bangalore. Specializing in Generative AI, Agentic Systems, Machine Learning, and web development with React and Next.js.",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Bangalore",
                addressRegion: "Karnataka",
                addressCountry: "IN",
            },
            knowsAbout: [
                "Generative AI",
                "Agentic AI",
                "Machine Learning",
                "React",
                "Next.js",
                "Python",
                "Website Development",
                "Bangalore",
            ],
            sameAs: [
                "https://github.com/selva-aiworks",
                "https://www.linkedin.com/in/selva-ai",
            ],
        },
        {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: siteUrl,
            name: "Selva - Selva G | AI Engineer & Website Developer Bangalore",
            description: "Portfolio of Selva (Selva G), AI Engineer and Website Developer in Bangalore. Projects in Generative AI, ML, and web development.",
            publisher: { "@id": `${siteUrl}/#person` },
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
