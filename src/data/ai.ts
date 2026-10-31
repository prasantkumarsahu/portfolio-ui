export type AiExploration = {
    label: string;
    title: string;
    description: string;
    icon: "workflow" | "cpu" | "database" | "plug";
    flow: [string, string, string];
};

export const aiExplorations: AiExploration[] = [
    {
        label: "Workflow orchestration",
        title: "LangChain",
        description:
            "Chain prompts, retrieval and tools into document-processing workflows for engineering teams.",
        icon: "workflow",
        flow: ["Prompt", "Retrieve", "Answer"],
    },
    {
        label: "Local model inference",
        title: "Ollama",
        description:
            "Run open models privately, close to enterprise data, behind a familiar API.",
        icon: "cpu",
        flow: ["App", "Local model", "Response"],
    },
    {
        label: "Semantic retrieval",
        title: "RAG and vector databases",
        description:
            "Index engineering documents as embeddings so engineers get context-aware, grounded answers.",
        icon: "database",
        flow: ["Embed", "Search", "Context"],
    },
    {
        label: "Tool integration",
        title: "MCP",
        description:
            "Expose internal services to models through the Model Context Protocol, so AI can act on real systems.",
        icon: "plug",
        flow: ["Model", "MCP server", "Tools"],
    },
];
