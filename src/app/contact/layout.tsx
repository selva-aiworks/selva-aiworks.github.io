import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Selva | Hire AI Engineer & Website Developer Bangalore",
    description:
        "Contact Selva (Selva G) — AI Engineer and Website Developer in Bangalore. Hire for AI projects, web development, Generative AI, chatbots, and collaborations. Get in touch for opportunities.",
    keywords: [
        "Contact Selva",
        "Contact Selva G",
        "Hire AI engineer Bangalore",
        "Hire website developer Bangalore",
        "AI engineer Bangalore contact",
        "Selva Bangalore",
        "Freelance AI engineer",
        "Web developer Bangalore hire",
    ],
    openGraph: {
        title: "Contact Selva | Hire AI Engineer & Website Developer Bangalore",
        description:
            "Get in touch with Selva (Selva G) — AI Engineer and Website Developer in Bangalore. Collaborations, AI projects, and web development.",
        url: "/contact",
    },
    twitter: {
        title: "Contact Selva | AI Engineer Bangalore",
        description: "Hire Selva — AI Engineer & Website Developer in Bangalore.",
    },
    alternates: { canonical: "https://selva-aiworks.github.io/contact" },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
