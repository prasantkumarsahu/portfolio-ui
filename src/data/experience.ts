export type Role = {
    company: string;
    title: string;
    period: string;
    current?: boolean;
    project: string;
    notes: string[];
    tags: string[];
};

export const roles: Role[] = [
    {
        company: "IBM",
        title: "Senior Software Developer / Application Developer",
        period: "Apr 2026 to present",
        current: true,
        project: "Mercedes-Benz (MBRDI) · DeltaDMU and Document Processing Verification (DPV)",
        notes: [
            "Build enterprise applications with Java 21, Spring Boot, React.js and Next.js for automotive document processing, verification and engineering workflows.",
            "Integrate Generative AI with Python, LangChain, Ollama, MCP and vector databases for intelligent document retrieval, analysis and automation.",
            "Develop a 3D Assembly Viewer with historical records, DeltaDMU comparison and automated Delta calculations for engineering analysis.",
            "Design RESTful APIs and microservices for document processing, AI integration and historical tracking, with a focus on scalability and fault tolerance.",
        ],
        tags: ["Java 21", "Spring Boot", "Next.js", "LangChain", "Ollama", "MCP", "Kafka", "AWS"],
    },
    {
        company: "Altruist Technologies",
        title: "Software Developer",
        period: "May 2025 to Apr 2026",
        project: "Glow Networks · HR management platform for large US clients, including Ciena",
        notes: [
            "Designed and built backend microservices with Java 17, Spring Boot and Hibernate for enterprise-scale HR workflows.",
            "Built secure REST APIs with Spring Security, and React.js / Next.js frontends integrated with them.",
            "Introduced event-driven communication between services with Apache Kafka.",
            "Optimised PostgreSQL and MySQL queries, indexing and Hibernate mappings to cut API response times.",
            "Led technical discussions and code reviews, and mentored teammates on Java, Spring Boot and React.js.",
        ],
        tags: ["Java 17", "Spring Boot", "Spring Security", "React.js", "Next.js", "Kafka", "PostgreSQL"],
    },
    {
        company: "Envotions Technology Services",
        title: "Associate System Engineer",
        period: "Apr 2023 to Apr 2025",
        project: "Nadi · Fund reporting and management tool for private equity (Daappa)",
        notes: [
            "Developed backend services in Java and Spring Boot for financial reporting.",
            "Designed REST APIs for the frontend and third-party integrations.",
            "Improved the React.js UI and API integration for a better user experience.",
            "Supported Dockerised deployments and Jenkins CI/CD pipelines on AWS.",
        ],
        tags: ["Java 17", "Spring Boot", "Hibernate", "React.js", "Redux Toolkit", "PostgreSQL"],
    },
];

export const certifications = [
    { name: "Professional Scrum Master (PSM I)", issuer: "Scrum.org", href: "https://www.scrum.org" },
    {
        name: "Certified Java & SQL Developer with DSA and System Design",
        issuer: "Geekster",
        href: "https://www.geekster.in",
    },
];
