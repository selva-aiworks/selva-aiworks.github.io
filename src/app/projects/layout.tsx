import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | Selva G — AI & Web Projects Bangalore",
    description:
        "Projects by Selva (Selva G) — AI Engineer and Website Developer in Bangalore: P.A.C.E, W.E.B.S, Speech Recognition, Sports Classification, Lip-Sync Avatar, LiveKit Agents, chatbots, and web apps. AI and web development portfolio.",
    keywords: [
        "Selva projects",
        "Selva G projects",
        "AI projects Bangalore",
        "AI engineer portfolio",
        "Website developer Bangalore portfolio",
        "Generative AI projects",
        "P.A.C.E AI",
        "W.E.B.S",
        "LiveKit agent",
        "Lip-sync avatar",
        "Machine Learning projects",
    ],
    openGraph: {
        title: "Projects | Selva G — AI Engineer & Website Developer Bangalore",
        description:
            "Explore AI and web projects by Selva (Selva G) in Bangalore: Generative AI, ML, chatbots, and web development.",
        url: "/projects",
    },
    twitter: {
        title: "Projects | Selva - AI Engineer Bangalore",
        description: "AI and web development projects by Selva (Selva G) in Bangalore.",
    },
    alternates: { canonical: "https://selva-aiworks.github.io/projects" },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
