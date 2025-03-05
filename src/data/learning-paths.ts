import { BadgeCheck, BookOpen, Brain, Code, Command, EyeIcon, FileCode, FlaskConical, GitBranch, Layers, MessageSquare, Rocket, Server, Sparkles, Zap } from "lucide-react";

export interface LearningPathModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  sections: LearningPathSection[];
  isPremium: boolean;
}

export interface LearningPathSection {
  id: string;
  title: string;
  content: string;
  type: "video" | "text" | "interactive" | "quiz" | "challenge";
  duration: string;
  iconName?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Beginner to Advanced";
  color: string;
  iconName: string;
  totalHours: number;
  modules: LearningPathModule[];
  prerequisites: string[];
  learningOutcomes: string[];
  certificationDetails: {
    name: string;
    description: string;
    validityPeriod: string;
    recognizedBy: string[];
    skills: string[];
  };
  instructors: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
  }[];
  skills: {
    name: string;
    level: number; // 1-10
  }[];
  tools: {
    name: string;
    logo: string;
    url: string;
  }[];
  resources: {
    title: string;
    description: string;
    url: string;
    type: "article" | "video" | "book" | "github" | "website";
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  reviews: {
    name: string;
    role: string;
    company: string;
    review: string;
    rating: number;
    avatar: string;
  }[];
  projects: {
    title: string;
    description: string;
    difficulty: "Easy" | "Medium" | "Hard" | "Expert";
    estimatedHours: number;
    skills: string[];
    deliverables: string[];
  }[];
}

export const learningPaths: LearningPath[] = [
  {
    id: "ai-prompt-engineering",
    title: "AI Prompt Engineering Mastery",
    description: "Master advanced prompt engineering techniques to unlock the full potential of AI models",
    longDescription: "Prompt engineering is the art and science of crafting effective inputs to AI language models to achieve desired outputs. This comprehensive learning path takes you from foundational concepts to advanced techniques used by AI experts. You'll develop a deep understanding of how to communicate with AI systems effectively, optimize prompts for specific use cases, and implement enterprise-grade prompt management systems.",
    level: "Intermediate",
    color: "from-blue-500 to-indigo-600",
    iconName: "command",
    totalHours: 15,
    prerequisites: [
      "Basic understanding of AI and language models",
      "Experience using ChatGPT or similar AI assistants",
      "Basic programming knowledge (helpful but not required)"
    ],
    learningOutcomes: [
      "Design structured prompts that generate consistent, high-quality outputs",
      "Apply context layering techniques to increase information density",
      "Create chain-of-thought frameworks to solve complex reasoning problems",
      "Develop prompt templates for specific business use cases",
      "Implement enterprise-grade prompt management systems",
      "Build AI agents that can parse, analyze, and synthesize information autonomously",
      "Optimize token usage to reduce costs without sacrificing quality",
      "Evaluate and compare prompt effectiveness using qualitative and quantitative metrics"
    ],
    modules: [
      {
        id: "foundations",
        title: "Foundations of Effective Prompting",
        description: "Learn the core principles of prompt engineering and how to structure prompts for optimal results",
        duration: "2 hours",
        isPremium: false,
        sections: [
          {
            id: "mental-models",
            title: "Mental Models for Prompt Engineering",
            content: "Understanding how large language models process and respond to prompts, key limitations, and how to work around them",
            type: "text",
            duration: "20 min",
            iconName: "brain"
          },
          {
            id: "anatomy-effective-prompt",
            title: "Anatomy of an Effective Prompt",
            content: "Breaking down the components that make prompts effective: context, instruction, examples, constraints, and output format",
            type: "video",
            duration: "25 min",
            iconName: "layers"
          },
          {
            id: "prompt-patterns",
            title: "Fundamental Prompt Patterns",
            content: "Master the core patterns: Role prompting, Step-by-step instructions, Few-shot learning, and Constraint specification",
            type: "interactive",
            duration: "40 min",
            iconName: "git-branch"
          },
          {
            id: "foundation-challenge",
            title: "Foundation Challenge: Prompt Makeover",
            content: "Transform ineffective prompts into powerful ones using the principles you've learned",
            type: "challenge",
            duration: "35 min",
            iconName: "zap"
          }
        ]
      },
      {
        id: "advanced-techniques",
        title: "Advanced Prompt Engineering Techniques",
        description: "Explore sophisticated techniques used by AI experts to solve complex reasoning problems",
        duration: "3 hours",
        isPremium: true,
        sections: [
          {
            id: "chain-of-thought",
            title: "Chain-of-Thought Prompting",
            content: "Learn how to guide AI through explicit reasoning steps to solve complex problems with higher accuracy",
            type: "video",
            duration: "30 min",
            iconName: "git-branch"
          },
          {
            id: "context-layering",
            title: "Context Layering & Information Architecture",
            content: "Master techniques to organize complex information hierarchically in prompts for improved comprehension",
            type: "text",
            duration: "25 min",
            iconName: "layers"
          },
          {
            id: "self-consistency",
            title: "Self-Consistency & Multiple Reasoning Paths",
            content: "Implement strategies to generate multiple solution paths and select the most consistent answers",
            type: "interactive",
            duration: "45 min",
            iconName: "git-branch"
          },
          {
            id: "prompt-chaining",
            title: "Prompt Chaining: Building Multi-step Workflows",
            content: "Design sophisticated workflows by connecting multiple prompts that build on each other's outputs",
            type: "video",
            duration: "35 min",
            iconName: "command"
          },
          {
            id: "advanced-challenge",
            title: "Advanced Challenge: Solve an Impossible Problem",
            content: "Apply advanced techniques to solve a problem that's impossible with basic prompting",
            type: "challenge",
            duration: "45 min",
            iconName: "zap"
          }
        ]
      },
      {
        id: "enterprise-prompting",
        title: "Enterprise-Grade Prompt Engineering",
        description: "Learn how to design, implement, and manage prompts at scale for business applications",
        duration: "4 hours",
        isPremium: true,
        sections: [
          {
            id: "prompt-templates",
            title: "Designing Robust Prompt Templates",
            content: "Create standardized, reusable prompt templates that can be parameterized for consistent outputs across use cases",
            type: "video",
            duration: "30 min",
            iconName: "file-code"
          },
          {
            id: "prompt-versioning",
            title: "Prompt Versioning & Testing Strategies",
            content: "Implement systems for tracking prompt versions, A/B testing, and measuring performance improvements",
            type: "text",
            duration: "40 min",
            iconName: "git-branch"
          },
          {
            id: "prompt-security",
            title: "Prompt Security & Injection Prevention",
            content: "Learn techniques to prevent prompt injection attacks and ensure your AI systems remain secure",
            type: "interactive",
            duration: "45 min",
            iconName: "eye-icon"
          },
          {
            id: "prompt-management",
            title: "Building a Prompt Management System",
            content: "Design and implement a centralized prompt management system for enterprise use",
            type: "video",
            duration: "50 min",
            iconName: "server"
          },
          {
            id: "enterprise-challenge",
            title: "Enterprise Challenge: Design a Prompt Library",
            content: "Create a comprehensive prompt library for a fictional company with various AI use cases",
            type: "challenge",
            duration: "75 min",
            iconName: "flask-conical"
          }
        ]
      },
      {
        id: "ai-agents",
        title: "Building AI Agents with Prompt Engineering",
        description: "Learn to design autonomous AI agents that can perform complex tasks with minimal human intervention",
        duration: "3 hours",
        isPremium: true,
        sections: [
          {
            id: "agent-design",
            title: "AI Agent Architecture & Design Patterns",
            content: "Understand the components and design patterns for creating effective AI agents using prompts",
            type: "video",
            duration: "35 min",
            iconName: "rocket"
          },
          {
            id: "tool-using-agents",
            title: "Tool-Using Agents: Integrating External Capabilities",
            content: "Learn how to create prompts that enable AI to effectively use external tools and APIs",
            type: "interactive",
            duration: "45 min",
            iconName: "sparkles"
          },
          {
            id: "self-improving-agents",
            title: "Self-Improving Agents: Implementing Feedback Loops",
            content: "Design prompts that allow agents to learn from their mistakes and improve over time",
            type: "text",
            duration: "30 min",
            iconName: "rocket"
          },
          {
            id: "agent-challenge",
            title: "Agent Challenge: Create a Research Assistant",
            content: "Build an AI agent that can conduct research on a topic, synthesize information, and create a report",
            type: "challenge",
            duration: "70 min",
            iconName: "zap"
          }
        ]
      },
      {
        id: "optimization",
        title: "Prompt Optimization & Evaluation",
        description: "Learn advanced techniques to optimize prompts for performance, cost, and reliability",
        duration: "3 hours",
        isPremium: true,
        sections: [
          {
            id: "token-optimization",
            title: "Token Optimization Strategies",
            content: "Master techniques to reduce token usage while maintaining or improving output quality",
            type: "video",
            duration: "30 min",
            iconName: "zap"
          },
          {
            id: "prompt-evaluation",
            title: "Quantitative Prompt Evaluation Frameworks",
            content: "Learn systematic approaches to measure and compare prompt effectiveness using metrics",
            type: "interactive",
            duration: "45 min",
            iconName: "flask-conical"
          },
          {
            id: "model-specific",
            title: "Model-Specific Optimization Techniques",
            content: "Discover how to tailor prompts for specific models (GPT-4, Claude, PaLM, etc.) to leverage their unique strengths",
            type: "text",
            duration: "35 min",
            iconName: "book-open"
          },
          {
            id: "optimization-challenge",
            title: "Optimization Challenge: Reduce Costs by 80%",
            content: "Optimize a set of prompts to dramatically reduce token usage while maintaining performance",
            type: "challenge",
            duration: "70 min",
            iconName: "zap"
          }
        ]
      }
    ],
    certificationDetails: {
      name: "Advanced Prompt Engineering Professional",
      description: "This certification validates your expertise in designing, implementing, and optimizing prompts for AI language models in enterprise contexts. It demonstrates your ability to create sophisticated prompt systems that solve complex business problems efficiently.",
      validityPeriod: "2 years",
      recognizedBy: [
        "OpenAI",
        "Anthropic",
        "AI Industry Association",
        "Enterprise AI Forum",
        "Global AI Standards Institute"
      ],
      skills: [
        "Advanced prompt design",
        "Chain-of-thought reasoning",
        "Prompt optimization",
        "AI agent development",
        "Enterprise prompt management",
        "Prompt security hardening"
      ]
    },
    instructors: [
      {
        name: "Dr. Emily Chen",
        role: "Chief AI Prompt Engineer",
        bio: "Former research scientist at OpenAI specializing in prompt optimization. Has developed prompt engineering systems for Fortune 500 companies that reduced costs by 60% while improving output quality.",
        avatar: "/instructors/emily-chen.jpg"
      },
      {
        name: "Marcus Johnson",
        role: "Enterprise AI Architect",
        bio: "15+ years of experience implementing AI systems at scale. Pioneered the development of enterprise prompt management frameworks now used by major financial institutions.",
        avatar: "/instructors/marcus-johnson.jpg"
      }
    ],
    skills: [
      { name: "Prompt Architecture", level: 9 },
      { name: "Chain-of-Thought Reasoning", level: 8 },
      { name: "Prompt Optimization", level: 9 },
      { name: "AI Agent Development", level: 7 },
      { name: "Enterprise Prompt Management", level: 8 },
      { name: "Prompt Security", level: 7 }
    ],
    tools: [
      {
        name: "OpenAI GPT-4",
        logo: "/tools/openai.svg",
        url: "https://openai.com/gpt-4"
      },
      {
        name: "Anthropic Claude",
        logo: "/tools/anthropic.svg",
        url: "https://www.anthropic.com/claude"
      },
      {
        name: "PromptFlow",
        logo: "/tools/promptflow.svg",
        url: "https://promptflow.dev"
      }
    ],
    resources: [
      {
        title: "Chain-of-Thought Paper",
        description: "Original research paper on chain-of-thought prompting",
        url: "https://arxiv.org/abs/2201.11903",
        type: "article"
      },
      {
        title: "Prompt Engineering Guide",
        description: "Comprehensive documentation on advanced prompt patterns",
        url: "https://github.com/dair-ai/Prompt-Engineering-Guide",
        type: "github"
      },
      {
        title: "Enterprise Prompt Management",
        description: "Framework for implementing organizational prompt governance",
        url: "https://promptmanagement.org",
        type: "website"
      }
    ],
    faqs: [
      {
        question: "How is this different from basic prompt engineering tutorials?",
        answer: "This learning path goes far beyond the basics, focusing on advanced techniques used by professionals. We cover enterprise-grade systems, prompt optimization strategies, and AI agent development that aren't typically found in introductory content."
      },
      {
        question: "Will I be able to apply these techniques with any AI model?",
        answer: "Yes, while we focus on leading models like GPT-4 and Claude, the principles and techniques taught are largely model-agnostic and can be applied to any language model with appropriate adjustments."
      },
      {
        question: "Is programming knowledge required?",
        answer: "Basic programming knowledge is helpful but not required. We provide code examples in Python, but the concepts can be applied even without implementing them programmatically."
      }
    ],
    reviews: [
      {
        name: "Sarah Miller",
        role: "AI Product Manager",
        company: "Accenture",
        review: "This learning path transformed how our team designs prompts. We've seen a 40% improvement in response quality and have cut our API costs by half.",
        rating: 5,
        avatar: "/reviews/sarah.jpg"
      },
      {
        name: "James Wilson",
        role: "Senior Data Scientist",
        company: "Netflix",
        review: "The advanced techniques section alone was worth the price. The chain-of-thought implementations have revolutionized how we approach complex reasoning tasks.",
        rating: 5,
        avatar: "/reviews/james.jpg"
      },
      {
        name: "Rajiv Patel",
        role: "CTO",
        company: "AI Solutions Inc",
        review: "We've implemented the enterprise prompt management system from this course for our clients. The structured approach to prompt versioning and security has been invaluable.",
        rating: 4,
        avatar: "/reviews/rajiv.jpg"
      }
    ],
    projects: [
      {
        title: "Enterprise Prompt Management System",
        description: "Design and implement a complete prompt management system for a fictional company, including template design, versioning, and security measures.",
        difficulty: "Expert",
        estimatedHours: 15,
        skills: ["System Design", "Prompt Architecture", "Security Implementation"],
        deliverables: [
          "System architecture diagram",
          "Prompt template library",
          "Security implementation guide",
          "Scaling strategy document"
        ]
      },
      {
        title: "Multi-Agent Research System",
        description: "Build a system of specialized AI agents that collaborate to perform complex research tasks, with each agent having a specific role.",
        difficulty: "Hard",
        estimatedHours: 12,
        skills: ["Agent Design", "Workflow Orchestration", "Prompt Chaining"],
        deliverables: [
          "Agent architecture specification",
          "Communication protocol design",
          "Working prototype",
          "Performance evaluation report"
        ]
      },
      {
        title: "Prompt Optimization Challenge",
        description: "Optimize a set of enterprise prompts to reduce token usage by at least 70% while maintaining or improving output quality.",
        difficulty: "Medium",
        estimatedHours: 8,
        skills: ["Token Optimization", "Performance Testing", "Quality Assurance"],
        deliverables: [
          "Optimized prompt set",
          "Comparative analysis report",
          "Cost savings calculation",
          "Implementation guidelines"
        ]
      }
    ]
  },
  {
    id: "rag-applications",
    title: "Building RAG Applications",
    description: "Learn to create powerful retrieval augmented generation systems",
    longDescription: "Retrieval Augmented Generation (RAG) combines the power of large language models with external knowledge retrieval to create highly accurate, context-aware AI applications. This comprehensive learning path teaches you how to build production-ready RAG systems that can process, index, and retrieve information from large document collections, then generate high-quality, factual responses using that information.",
    level: "Intermediate",
    color: "from-amber-500 to-orange-600",
    iconName: "layers",
    totalHours: 18,
    prerequisites: [
      "Basic understanding of AI and language models",
      "Experience with Python programming",
      "Familiarity with basic data structures and algorithms",
      "Basic understanding of vector databases (helpful but not required)"
    ],
    learningOutcomes: [
      "Design and implement end-to-end RAG systems for enterprise use cases",
      "Build advanced document processing pipelines for various content types",
      "Implement sophisticated chunking and embedding strategies",
      "Create optimized vector search mechanisms with hybrid retrieval",
      "Develop prompt engineering techniques specific to RAG applications",
      "Implement evaluation frameworks to measure RAG system performance",
      "Deploy scalable RAG applications to production environments",
      "Build fine-tuned retrieval models for domain-specific applications"
    ],
    modules: [
      {
        id: "rag-foundations",
        title: "Foundations of Retrieval Augmented Generation",
        description: "Learn the core principles and architecture of RAG systems",
        duration: "3 hours",
        isPremium: false,
        sections: [
          {
            id: "rag-architecture",
            title: "RAG System Architecture",
            content: "Deep dive into the components and architecture patterns for building effective RAG systems",
            type: "video",
            duration: "30 min",
            iconName: "layers"
          },
          {
            id: "vector-embeddings",
            title: "Vector Embeddings & Semantic Search",
            content: "Understand how vector embeddings work, how they represent semantic meaning, and their role in RAG systems",
            type: "text",
            duration: "35 min",
            iconName: "code"
          },
          {
            id: "simple-rag",
            title: "Building Your First RAG Application",
            content: "Step-by-step implementation of a basic RAG system using Python and open-source tools",
            type: "interactive",
            duration: "75 min",
            iconName: "code"
          },
          {
            id: "rag-challenge",
            title: "Foundation Challenge: Compare RAG vs. Pure LLM",
            content: "Build experiments to compare RAG performance against pure LLM outputs across different scenarios",
            type: "challenge",
            duration: "40 min",
            iconName: "flask-conical"
          }
        ]
      },
      // Additional modules for RAG Applications would be defined here
    ],
    // Additional details for RAG Applications would be defined here, similar to the Prompt Engineering path
    certificationDetails: {
      name: "RAG Systems Architect",
      description: "This certification validates your expertise in designing, implementing, and optimizing RAG systems for enterprise applications. It demonstrates your ability to create sophisticated information retrieval and augmented generation systems that provide accurate, context-aware responses.",
      validityPeriod: "2 years",
      recognizedBy: [
        "Vector Database Association",
        "Enterprise Search Foundation",
        "AI Industry Association",
        "Global AI Standards Institute"
      ],
      skills: [
        "RAG system architecture",
        "Vector search optimization",
        "Document processing pipelines",
        "Embedding strategies",
        "RAG-specific prompt engineering",
        "RAG evaluation frameworks"
      ]
    },
    // Other fields would be populated similar to the Prompt Engineering path
    instructors: [
      {
        name: "Dr. David Lee",
        role: "Search & Retrieval Systems Architect",
        bio: "Former lead engineer at Pinecone with expertise in vector database optimization. Has designed RAG systems processing billions of documents for major tech companies.",
        avatar: "/instructors/david-lee.jpg"
      }
    ],
    skills: [],
    tools: [],
    resources: [],
    faqs: [],
    reviews: [],
    projects: []
  },
  {
    id: "ai-agent-development",
    title: "AI Agent Development",
    description: "Create autonomous AI agents that solve complex problems",
    longDescription: "AI agents are autonomous systems that can perceive their environment, make decisions, and take actions to achieve specific goals. This learning path teaches you how to design and implement sophisticated AI agents that can perform complex tasks with minimal human intervention, from simple task automation to multi-agent systems that collaborate to solve problems.",
    level: "Advanced",
    color: "from-green-500 to-emerald-600",
    iconName: "rocket",
    totalHours: 20,
    prerequisites: [
      "Strong understanding of AI and language models",
      "Proficiency with Python programming",
      "Experience with prompt engineering",
      "Basic understanding of API integration"
    ],
    learningOutcomes: [
      "Design and implement autonomous AI agents for diverse applications",
      "Create agents that can effectively use tools and external APIs",
      "Implement planning and reasoning capabilities in AI agents",
      "Build memory systems for short and long-term agent persistence",
      "Develop multi-agent systems with specialized roles and collaboration",
      "Create evaluation frameworks to measure agent performance",
      "Implement self-improvement mechanisms for agents",
      "Deploy scalable agent systems to production environments"
    ],
    modules: [
      {
        id: "agent-foundations",
        title: "Foundations of AI Agents",
        description: "Learn the core principles and architectures for building AI agents",
        duration: "3 hours",
        isPremium: false,
        sections: [
          {
            id: "agent-architecture",
            title: "AI Agent Architectures & Design Patterns",
            content: "Explore different agent architectures and design patterns for various use cases",
            type: "video",
            duration: "35 min",
            iconName: "layers"
          },
          {
            id: "tool-using-agents",
            title: "Tool-Using Agents: Design & Implementation",
            content: "Learn how to create agents that can effectively use external tools and APIs",
            type: "text",
            duration: "40 min",
            iconName: "code"
          },
          {
            id: "first-agent",
            title: "Building Your First AI Agent",
            content: "Step-by-step implementation of a basic agent using Python and LangChain",
            type: "interactive",
            duration: "70 min",
            iconName: "code"
          },
          {
            id: "agent-challenge",
            title: "Foundation Challenge: Task Automation Agent",
            content: "Build an agent that can automate a specific task from start to finish",
            type: "challenge",
            duration: "35 min",
            iconName: "rocket"
          }
        ]
      },
      // Additional modules for AI Agent Development would be defined here
    ],
    // Additional details for AI Agent Development would be defined here
    certificationDetails: {
      name: "Advanced AI Agent Architect",
      description: "This certification validates your expertise in designing, implementing, and optimizing autonomous AI agent systems for complex enterprise applications. It demonstrates your ability to create sophisticated agents and multi-agent systems that can solve complex problems with minimal human intervention.",
      validityPeriod: "2 years",
      recognizedBy: [
        "Autonomous Systems Association",
        "AI Industry Association",
        "Enterprise AI Forum",
        "Global AI Standards Institute"
      ],
      skills: [
        "Agent architecture design",
        "Tool-using agent implementation",
        "Multi-agent system orchestration",
        "Agent memory systems",
        "Planning and reasoning implementations",
        "Agent evaluation frameworks"
      ]
    },
    instructors: [
      {
        name: "Dr. Sophia Rodriguez",
        role: "Autonomous AI Systems Expert",
        bio: "Pioneer in multi-agent systems with 10+ years of experience. Has developed agent frameworks now used in robotics, finance, and healthcare.",
        avatar: "/instructors/sophia-rodriguez.jpg"
      }
    ],
    skills: [],
    tools: [],
    resources: [],
    faqs: [],
    reviews: [],
    projects: []
  }
]; 