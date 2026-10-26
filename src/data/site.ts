export const site = {
    name: "Prasant Kumar Sahu",
    title: "Prasant Kumar Sahu · Full Stack Java Developer",
    description:
        "Prasant Kumar Sahu is a Full Stack Java Developer building enterprise and AI-powered systems with Java, Spring Boot, React and Next.js. Projects, experience and contact.",
    locale: "en_US",
    githubUrl: "https://github.com/prasantkumarsahu",
    role: "Full Stack Java Developer",
    eyebrow: "Engineering with intent",
    tagline:
        "Building enterprise and AI-powered systems with Java, Spring Boot, React and Next.js",
    resumeUrl: "/resume.pdf",
    stats: {
        value: "3+ years",
        label: "of engineering experience",
        focus: ["Enterprise systems", "AI-powered applications", "Cloud-native on AWS"],
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
