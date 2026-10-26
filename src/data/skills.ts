export type SkillCategory = {
    id: string;
    name: string;
    skills: string[];
};

export const skillCategories: SkillCategory[] = [
    {
        id: "backend",
        name: "Backend",
        skills: [
            "Java 8 / 17 / 21 / 25",
            "Spring Boot",
            "Spring Cloud",
            "Spring MVC",
            "Spring Security",
            "Spring Data JPA",
            "Reactive Spring",
            "Microservices",
            "REST APIs",
            "Hibernate / JPA",
            "Resilience4j",
            "Apache Kafka",
        ],
    },
    {
        id: "frontend",
        name: "Frontend",
        skills: [
            "React.js",
            "Next.js",
            "Redux Toolkit",
            "TypeScript",
            "JavaScript",
            "HTML5",
            "CSS3",
            "Tailwind CSS",
            "shadcn/ui",
            "Material UI",
        ],
    },
    {
        id: "ai",
        name: "AI",
        skills: ["Generative AI", "Python", "LangChain", "Ollama", "MCP", "Vector databases"],
    },
    {
        id: "databases",
        name: "Databases",
        skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    },
    {
        id: "cloud",
        name: "Cloud and DevOps",
        skills: [
            "AWS EC2",
            "AWS S3",
            "AWS Lambda",
            "Route 53",
            "SNS",
            "IAM",
            "CloudWatch",
            "Docker",
            "Jenkins",
            "CodeBuild / CodePipeline",
            "Kubernetes",
            "Linux",
        ],
    },
    {
        id: "testing",
        name: "Testing and quality",
        skills: [
            "JUnit",
            "Mockito",
            "Unit testing",
            "Integration testing",
            "Code reviews",
            "Secure coding",
        ],
    },
];
