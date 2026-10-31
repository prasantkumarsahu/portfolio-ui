export const site = {
    name: "Prasant Kumar Sahu",
    title: "Prasant Kumar Sahu · Full Stack Java & GenAI Engineer",
    description:
        "Prasant Kumar Sahu is a software engineer building enterprise applications and production Generative AI with Java, Spring Boot, React, Next.js, LangChain, RAG and MCP. Projects, experience and contact.",
    locale: "en_US",
    githubUsername: "prasantkumarsahu",
    githubUrl: "https://github.com/prasantkumarsahu",
    role: "Full Stack Java & GenAI Engineer",
    location: { city: "Bangalore", country: "India", countryCode: "IN" },
    eyebrow: "Engineering with intent",
    tagline:
        "Building enterprise applications with Java, Spring Boot, React and Next.js, and bringing Generative AI into production",
    resumeUrl: "/resume.pdf",
    stats: {
        value: "3.5+ years",
        label: "of engineering experience",
        focus: ["Enterprise systems", "Generative AI in production", "Cloud-native on AWS"],
    },
    colophon: "Thoughtful systems. Useful software.",
};

// Notice period at the current employer. The labels are worked out at build time, so a
// deploy after the last working day switches to "available immediately" on its own.
const lastWorkingDay = new Date("2027-01-07T00:00:00Z");
const joinDate = new Date(lastWorkingDay.getTime() + 24 * 60 * 60 * 1000);
const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const servingNotice = Date.now() < joinDate.getTime();

export const availability = {
    servingNotice,
    lastWorkingDay: formatDate(lastWorkingDay),
    /** Short status for the hero badge */
    badge: servingNotice ? `Open to new roles · LWD ${formatDate(lastWorkingDay)}` : "Open to new roles",
    /** Sentence for the contact section */
    detail: servingNotice
        ? `Serving notice at IBM: last working day ${formatDate(lastWorkingDay)}, available to join from ${formatDate(joinDate)}.`
        : "Available to join immediately.",
};

export const navSections = [
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
] as const;

export type ContactChannel = {
    label: string;
    value: string;
    href: string;
    icon: "mail" | "github" | "linkedin";
};

export const contactChannels: ContactChannel[] = [
    {
        label: "Email",
        value: "prasantkumarsahu0103@gmail.com",
        href: "mailto:prasantkumarsahu0103@gmail.com",
        icon: "mail",
    },
    {
        label: "GitHub",
        value: "github.com/prasantkumarsahu",
        href: "https://github.com/prasantkumarsahu",
        icon: "github",
    },
    {
        label: "LinkedIn",
        value: "linkedin.com/in/prasantkumarsahu",
        href: "https://www.linkedin.com/in/prasantkumarsahu",
        icon: "linkedin",
    },
];
