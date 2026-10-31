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
            "Integrate Generative AI into automotive document workflows with Python, LangChain and Ollama for intelligent document processing, retrieval, analysis and verification.",
            "Build RAG pipelines with vector databases that index engineering documents and give engineers context-aware answers, cutting manual document lookup.",
            "Integrate MCP (Model Context Protocol) to connect LLMs with enterprise tools and backend data for AI-driven automation.",
            "Migrated Spring Boot services from Java 17 to Java 21 and then Java 25, adopting virtual threads, records, pattern matching and scoped values.",
            "Enhance a 3D Assembly Viewer with historical records, DeltaDMU comparison and automated Delta calculations for engineering analysis.",
            "Build REST APIs and microservices linking the AI services, data retrieval, historical tracking and the React.js / Next.js frontend.",
        ],
        tags: ["Java 21 / 25", "Spring Boot", "Next.js", "Python", "LangChain", "Ollama", "RAG", "MCP", "Kafka", "AWS"],
    },
    {
        company: "Altruist Technologies",
        title: "Software Developer",
        period: "May 2025 to Apr 2026",
        project: "Glow Networks · HR management platform for large US clients, including Ciena",
        notes: [
            "Designed and built backend microservices with Java 17, Spring Boot and Hibernate for enterprise-scale HR workflows.",
            "Built a proof-of-concept LLM feature, integrating an LLM API with Spring Boot services to automate a manual HR task and evaluate GenAI for production.",
            "Built secure REST APIs with Spring Security, and React.js / Next.js frontends integrated with them.",
            "Implemented event-driven communication with Apache Kafka, and optimised PostgreSQL / MySQL queries, indexing and Hibernate mappings to cut API response times.",
            "Wrote Python scripts to automate data processing, validation and reporting, and used AI coding assistants daily for tests and reviews.",
            "Automated CI/CD with Jenkins and Docker on AWS; led technical discussions, ran code reviews and mentored teammates.",
        ],
        tags: ["Java 17", "Spring Boot", "Spring Security", "Python", "LLM APIs", "React.js", "Next.js", "Kafka", "PostgreSQL"],
    },
    {
        company: "Envotions Technology Services",
        title: "Associate System Engineer",
        period: "Apr 2023 to Apr 2025",
        project: "Nadi · Fund reporting and management tool for private equity (Daappa)",
        notes: [
            "Developed Java and Spring Boot backend services and REST APIs for financial reporting and third-party integrations.",
            "Wrote Python scripts for report data processing and automation in fund-reporting and data-validation workflows.",
            "Built React.js UI enhancements and API integrations, and supported Dockerised deployments with Jenkins CI/CD on AWS.",
            "Took part in client discussions, requirement analysis and sprint planning; handled performance work and production support.",
        ],
        tags: ["Java 17", "Spring Boot", "Hibernate", "Python", "React.js", "Redux Toolkit", "PostgreSQL"],
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
