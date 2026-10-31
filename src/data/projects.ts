export type ProjectPreview = "document" | "assembly" | "people" | "reporting" | "compiler" | "rag" | "mcp";

export type Project = {
    slug: string;
    category: string;
    title: string;
    summary: string;
    tags: string[];
    /** Filter groups this project belongs to (see projectFilters) */
    filters: string[];
    /** One-line outcome or defining trait */
    highlight: string;
    /** Where the work happened, shown after the highlight */
    context: string;
    /** Public link; client work without one shows no link row */
    href?: string;
    /** Defaults to "View project" */
    linkLabel?: string;
    preview: ProjectPreview;
    /** Spans the full grid width with a side-by-side layout */
    featured?: boolean;
};

export const projectFilters = ["Java", "React.js", "AI", "Python", "Rust"] as const;

export const projects: Project[] = [
    {
        slug: "dpv",
        category: "Document intelligence · Automotive",
        title: "Document Processing Verification (DPV)",
        summary:
            "Automotive document processing and verification, with Generative AI for intelligent retrieval, analysis and automation.",
        tags: ["Java 21", "Spring Boot", "Next.js", "LangChain", "Ollama", "MCP"],
        filters: ["Java", "React.js", "AI"],
        highlight: "GenAI retrieval over engineering documents",
        context: "IBM · Mercedes-Benz (MBRDI)",
        preview: "document",
    },
    {
        slug: "deltadmu",
        category: "Interactive engineering · Automotive",
        title: "3D Assembly Viewer · DeltaDMU",
        summary:
            "Explore automotive assemblies in the browser, with historical records, DeltaDMU comparison and automated Delta calculations.",
        tags: ["Java", "Spring Boot", "React.js", "Microservices"],
        filters: ["Java", "React.js"],
        highlight: "Automated Delta calculations",
        context: "IBM · Mercedes-Benz (MBRDI)",
        preview: "assembly",
    },
    {
        slug: "glow-networks",
        category: "HR platform · Enterprise",
        title: "Glow Networks HR platform",
        summary:
            "Microservices and web apps for enterprise-scale HR workflows, serving large US-based clients including Ciena.",
        tags: ["Java 17", "Spring Boot", "Spring Security", "Kafka", "React.js"],
        filters: ["Java", "React.js"],
        highlight: "Event-driven microservices with Kafka",
        context: "Altruist Technologies",
        preview: "people",
    },
    {
        slug: "nadi",
        category: "Financial workflows · Private equity",
        title: "Nadi fund reporting tool",
        summary:
            "Fund reporting and management for private equity, with REST APIs for the frontend and third-party integrations.",
        tags: ["Java 17", "Spring Boot", "React.js", "Redux Toolkit", "PostgreSQL"],
        filters: ["Java", "React.js"],
        highlight: "Reporting APIs and third-party integrations",
        context: "Envotions · Daappa",
        preview: "reporting",
    },
    {
        slug: "docmind",
        category: "Personal project · Generative AI",
        title: "DocMind",
        summary:
            "Chat with your documents: a RAG app that streams answers token by token and cites the exact passages they came from, running fully local.",
        tags: ["Java 21", "Spring Boot 4", "Spring AI", "pgvector", "Ollama", "React 19"],
        filters: ["Java", "React.js", "AI"],
        highlight: "Grounded answers with numbered citations",
        context: "RAG · semantic search over HNSW",
        href: "https://github.com/prasantkumarsahu/docmind",
        linkLabel: "View on GitHub",
        preview: "rag",
    },
    {
        slug: "pg-insight-mcp",
        category: "Personal project · AI tooling",
        title: "pg-insight-mcp",
        summary:
            "A read-only PostgreSQL server for the Model Context Protocol, so AI clients can explore schemas, run safe queries and read execution plans.",
        tags: ["Python", "MCP", "PostgreSQL", "LLM tooling"],
        filters: ["AI", "Python"],
        highlight: "Guarded SQL in READ ONLY transactions",
        context: "Claude Desktop, VS Code, Cursor",
        href: "https://github.com/prasantkumarsahu/pg-insight-mcp",
        linkLabel: "View on GitHub",
        preview: "mcp",
    },
    {
        slug: "kalinga-lang",
        category: "Personal project · Language design",
        title: "Kalinga programming language",
        summary:
            "A small “Rust++”: simple syntax with classes, inheritance and interfaces, compiled to native code through Rust.",
        tags: ["Rust", "Compilers", "LSP", "Package manager"],
        filters: ["Rust"],
        highlight: "Native speed, no null, no unsafe",
        context: "compiles .kl → Rust → rustc -O",
        href: "https://github.com/prasantkumarsahu/kalinga-lang",
        linkLabel: "View on GitHub",
        preview: "compiler",
        featured: true,
    },
];
