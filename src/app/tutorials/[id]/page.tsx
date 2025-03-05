import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Star } from "lucide-react";
import { SiteLayout } from "@/components/layout/site-layout";
import { TutorialProgress } from "@/components/tutorials/tutorial-progress";
import { TutorialRecommendations } from "@/components/tutorials/tutorial-recommendations";
import { CodeSandbox } from "@/components/tutorials/code-sandbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ragCodeExamples, ragSolutionExamples } from "@/data/code-examples/rag";
import { advancedTutorials } from "@/data/advanced-tutorials";
import { AdvancedTutorialContent } from "@/components/tutorials/advanced-tutorial-content";

// Mock data for tutorials - in a real app, this would come from a database or API
const tutorials = {
  "write-blog-post": {
    id: "write-blog-post",
    title: "Write a Blog Post with AI",
    description: "Learn how to use ChatGPT to write engaging blog content in minutes.",
    category: "writing",
    difficulty: "beginner",
    duration: "10 min",
    rating: 4.8,
    tool: "ChatGPT",
    author: "Sarah Johnson",
    publishedAt: "2023-05-15",
    image: "/tutorials/blog-post.jpg",
    steps: [
      {
        title: "Define your blog topic",
        content: "Before you start writing, decide on a clear topic for your blog post. The more specific your topic, the better results you'll get from AI. For example, instead of 'marketing tips,' try 'email marketing tips for small businesses in 2023.'",
        prompt: "I want to write a blog post about [YOUR SPECIFIC TOPIC]. Can you help me brainstorm 5 specific angles or approaches I could take?",
        example: "I want to write a blog post about email marketing tips for small businesses in 2023. Can you help me brainstorm 5 specific angles or approaches I could take?"
      },
      {
        title: "Create an outline",
        content: "Once you've chosen your topic, ask ChatGPT to create an outline for your blog post. This will give your post structure and help the AI understand what you're looking for.",
        prompt: "Please create a detailed outline for a blog post about [YOUR TOPIC]. Include an introduction, 4-5 main sections with subpoints, and a conclusion.",
        example: "Please create a detailed outline for a blog post about '5 Email Marketing Strategies That Small Businesses Can Implement Today.' Include an introduction, 4-5 main sections with subpoints, and a conclusion."
      },
      {
        title: "Generate the introduction",
        content: "Now, ask ChatGPT to write an engaging introduction for your blog post based on the outline. A good introduction hooks the reader and previews what the post will cover.",
        prompt: "Write an engaging introduction for a blog post about [YOUR TOPIC]. The introduction should hook the reader, establish why this topic matters, and briefly preview what the post will cover.",
        example: "Write an engaging introduction for a blog post about '5 Email Marketing Strategies That Small Businesses Can Implement Today.' The introduction should hook the reader, establish why email marketing matters for small businesses, and briefly preview the 5 strategies."
      },
      {
        title: "Generate each section",
        content: "Ask ChatGPT to expand on each section of your outline one at a time. This gives you more control over the content and allows you to provide feedback between sections.",
        prompt: "Based on the outline, please write section [NUMBER] about [SECTION TOPIC]. Include practical examples and actionable advice.",
        example: "Based on the outline, please write section 2 about 'Segmenting Your Email List for Better Results.' Include practical examples and actionable advice for small business owners."
      },
      {
        title: "Write a conclusion",
        content: "Finally, ask ChatGPT to write a conclusion that summarizes the key points and includes a call to action for your readers.",
        prompt: "Write a conclusion for my blog post about [YOUR TOPIC]. Summarize the key points and include a call to action for readers.",
        example: "Write a conclusion for my blog post about '5 Email Marketing Strategies That Small Businesses Can Implement Today.' Summarize the key points and include a call to action for small business owners to start implementing these strategies."
      },
      {
        title: "Review and edit",
        content: "Always review and edit the AI-generated content. Check for accuracy, add your personal voice, and make sure the content aligns with your brand. You can also ask ChatGPT to help with editing.",
        prompt: "Please review this blog post and suggest edits to improve clarity, flow, and engagement: [PASTE YOUR DRAFT]",
        example: "Please review this blog post and suggest edits to improve clarity, flow, and engagement. Also, help me make the tone more conversational and friendly."
      }
    ],
    tips: [
      "Be specific in your prompts for better results",
      "Add your own examples and personal experiences to make the content unique",
      "Always fact-check information provided by AI",
      "Break up long paragraphs and add subheadings for readability",
      "Use AI for the first draft, but add your own voice in editing"
    ],
    relatedTutorials: ["product-description", "email-templates"]
  },
  // Other tutorials would be defined here
  "creating-images-with-dall-e": {
    id: "creating-images-with-dall-e",
    title: "Creating Images with DALL-E",
    description: "Learn how to generate stunning images using OpenAI's DALL-E model.",
    category: "design",
    difficulty: "intermediate",
    duration: "15 min",
    rating: 4.9,
    tool: "DALL-E",
    author: "Michael Chen",
    publishedAt: "2023-08-10",
    image: "/tutorials/dall-e-images.jpg",
    steps: [
      {
        title: "Understanding DALL-E capabilities",
        content: "DALL-E is an AI system that can create realistic images and art from a description in natural language. Before diving into prompts, it's important to understand what DALL-E can and cannot do. It excels at creating detailed illustrations, concept art, and photorealistic images, but has limitations with text rendering and certain complex scenes.",
        prompt: "What are the capabilities and limitations of DALL-E for image generation?",
        example: "What are the capabilities and limitations of DALL-E for image generation? Please explain what types of images it's best at creating and where it might struggle."
      },
      {
        title: "Crafting effective prompts",
        content: "The quality of your DALL-E images depends heavily on your prompts. Good prompts are specific, detailed, and provide context about style, lighting, composition, and mood. The more specific your prompt, the better the results.",
        prompt: "Create an image of [SUBJECT] in the style of [ARTIST/STYLE] with [LIGHTING] and [COMPOSITION].",
        example: "Create an image of a futuristic city with flying cars in the style of cyberpunk art, with neon lighting and a dramatic perspective from street level looking up at skyscrapers."
      },
      {
        title: "Specifying artistic styles",
        content: "DALL-E can mimic various artistic styles, from Renaissance paintings to modern digital art. Referencing specific artists, art movements, or visual styles in your prompt helps achieve consistent results.",
        prompt: "Generate an image of [SUBJECT] in the style of [SPECIFIC ARTIST or ART MOVEMENT].",
        example: "Generate an image of a peaceful mountain landscape in the style of Japanese ukiyo-e prints, with soft pastel colors and delicate line work."
      },
      {
        title: "Controlling composition and framing",
        content: "You can guide DALL-E to create specific compositions by including details about perspective, framing, and camera settings in your prompt.",
        prompt: "Create a [WIDE-ANGLE/CLOSE-UP/AERIAL] view of [SUBJECT] with [COMPOSITION DETAILS].",
        example: "Create a wide-angle photograph of a desert oasis at sunset, with palm trees silhouetted against an orange sky, shot with a 24mm lens, low angle perspective."
      },
      {
        title: "Iterative refinement",
        content: "Often, your first image won't be perfect. Use the initial result to refine your prompt, being more specific about elements you want to change or improve.",
        prompt: "Modify the previous image by [SPECIFIC CHANGES]. Keep the [ELEMENTS TO PRESERVE].",
        example: "Modify the previous image by making the lighting more dramatic with stronger shadows. Keep the composition and subject positioning the same."
      },
      {
        title: "Saving and using your images",
        content: "Once you've generated an image you're happy with, you can download it and use it in your projects. Remember to check the usage rights for DALL-E images if you plan to use them commercially.",
        prompt: "What are the usage rights for images created with DALL-E?",
        example: "What are the usage rights for images I create with DALL-E? Can I use them commercially or do I need to provide attribution?"
      }
    ],
    tips: [
      "Be as specific as possible in your prompts",
      "Include details about style, lighting, and composition",
      "Use references to known artists or art styles for consistent results",
      "Try different variations of the same prompt to explore options",
      "For complex scenes, break them down into simpler elements",
      "Save prompts that work well for future reference"
    ],
    relatedTutorials: ["create-logo", "image-editing"]
  },
  "prompt-engineering-masterclass": {
    id: "prompt-engineering-masterclass",
    title: "Prompt Engineering Masterclass",
    description: "Master the art of crafting effective prompts to get the best results from AI models.",
    category: "advanced",
    difficulty: "intermediate",
    duration: "25 min",
    rating: 4.9,
    tool: "ChatGPT, Claude, Gemini",
    author: "Dr. Emily Rodriguez",
    publishedAt: "2024-05-16",
    image: "/tutorials/prompt-engineering.jpg",
    steps: [
      {
        title: "Understanding the fundamentals of prompt engineering",
        content: "Prompt engineering is the practice of crafting inputs to AI models to get desired outputs. It's a crucial skill for effectively working with large language models (LLMs) like ChatGPT, Claude, and Gemini. Good prompts can dramatically improve the quality, relevance, and accuracy of AI-generated content.",
        prompt: "Explain the concept of prompt engineering and why it's important when working with large language models.",
        example: "Explain the concept of prompt engineering and why it's important when working with large language models. Include examples of how different prompts can lead to different outputs."
      },
      {
        title: "The anatomy of an effective prompt",
        content: "Effective prompts typically contain several key components: clear instructions, context, examples, constraints, and output format specifications. Understanding how to structure these elements will help you get more consistent and useful responses from AI models.",
        prompt: "What are the key components of an effective prompt for AI models? Provide a template structure I can follow.",
        example: "What are the key components of an effective prompt for AI models? Provide a template structure I can follow with explanations for each component and why it matters."
      },
      {
        title: "Using the role-setting technique",
        content: "One powerful technique in prompt engineering is assigning a specific role to the AI. By instructing the AI to respond 'as a [specific expert]', you can guide it to draw on relevant knowledge and adopt an appropriate tone and perspective for your task.",
        prompt: "I want you to act as a [SPECIFIC ROLE/EXPERT]. [TASK DESCRIPTION]. [ADDITIONAL CONTEXT]. [SPECIFIC INSTRUCTIONS].",
        example: "I want you to act as a senior data scientist with expertise in explaining complex concepts to beginners. Explain how machine learning algorithms work in simple terms that a 12-year-old would understand. Use everyday analogies and avoid technical jargon."
      },
      {
        title: "Implementing the Chain-of-Thought technique",
        content: "Chain-of-Thought (CoT) prompting encourages the AI to break down complex problems into step-by-step reasoning. This technique is particularly effective for tasks requiring logical reasoning, problem-solving, or mathematical calculations.",
        prompt: "I need to solve [PROBLEM]. Let's think through this step by step to find the solution.",
        example: "I need to determine the most cost-effective shipping method for my e-commerce business. Let's think through this step by step to find the solution. Consider factors like package weight, dimensions, distance, delivery speed requirements, and volume discounts."
      },
      {
        title: "Using few-shot learning with examples",
        content: "Few-shot learning involves providing the AI with a few examples of the desired input-output pattern before asking it to perform a similar task. This technique helps the model understand exactly what you're looking for and improves consistency.",
        prompt: "Here are some examples of [TASK TYPE]:\n\nInput: [EXAMPLE INPUT 1]\nOutput: [EXAMPLE OUTPUT 1]\n\nInput: [EXAMPLE INPUT 2]\nOutput: [EXAMPLE OUTPUT 2]\n\nNow, please provide output for this input: [YOUR ACTUAL INPUT]",
        example: "Here are some examples of converting customer inquiries into professional responses:\n\nInput: 'hey do u have this in blue'\nOutput: 'Thank you for your inquiry. Yes, this item is available in blue. Would you like me to provide more information about this color option?'\n\nInput: 'when will u ship my order #12345'\nOutput: 'Thank you for your message. I'd be happy to check on the status of order #12345 for you. To protect your privacy, could you please verify the email address associated with this order?'\n\nNow, please provide output for this input: 'ur website is broken cant checkout'"
      },
      {
        title: "Refining prompts with iterative feedback",
        content: "Prompt engineering is often an iterative process. If you don't get the desired results on your first attempt, analyze what went wrong and refine your prompt accordingly. Pay attention to the AI's response and use it to guide your prompt improvements.",
        prompt: "I asked for [ORIGINAL REQUEST] and received [SUMMARY OF RESPONSE]. This wasn't quite what I needed because [ISSUE WITH RESPONSE]. Could you try again with these adjustments: [SPECIFIC CHANGES].",
        example: "I asked for a marketing email template for a new fitness app and received a very generic template that could apply to any product. This wasn't quite what I needed because it didn't highlight the unique features of a fitness app or speak to our target audience of busy professionals. Could you try again with these adjustments: make it specifically for a fitness app called 'FitTrack' that focuses on time-efficient workouts, personalized nutrition plans, and progress tracking for busy professionals aged 30-45."
      },
      {
        title: "Advanced techniques: System prompts and meta-prompting",
        content: "System prompts set the overall behavior of the AI for the entire conversation, while meta-prompting involves asking the AI to help improve your prompts. These advanced techniques can help you get more sophisticated and tailored responses.",
        prompt: "System prompt: You are an expert in [DOMAIN] with [SPECIFIC CHARACTERISTICS]. Your responses should always [SPECIFIC INSTRUCTIONS].\n\nUser: [YOUR ACTUAL QUERY]",
        example: "System prompt: You are an expert in technical writing with a focus on clarity and accessibility. Your responses should always use plain language, include relevant examples, and follow a logical structure with clear headings.\n\nUser: Explain how DNS servers work and why they're important for the internet."
      },
      {
        title: "Ethical considerations in prompt engineering",
        content: "As you become more skilled at prompt engineering, it's important to consider the ethical implications of your prompts. Avoid crafting prompts that could generate harmful, misleading, or biased content. Be mindful of privacy concerns and intellectual property rights.",
        prompt: "What are the key ethical considerations I should keep in mind when crafting prompts for AI systems? How can I ensure my prompts lead to responsible AI use?",
        example: "What are the key ethical considerations I should keep in mind when crafting prompts for AI systems? How can I ensure my prompts lead to responsible AI use? Please provide specific examples of both problematic prompts and their more ethical alternatives."
      }
    ],
    tips: [
      "Be specific and clear in your instructions to the AI",
      "Provide context that helps the AI understand your needs",
      "Use delimiters (like triple quotes or asterisks) to separate different parts of your prompt",
      "Specify the format you want for the output",
      "Ask the AI to explain its reasoning when solving complex problems",
      "For creative tasks, specify tone, style, and audience",
      "Test different variations of your prompts to see what works best",
      "Keep a library of effective prompts that you can reuse and adapt"
    ],
    relatedTutorials: ["write-blog-post", "social-media-calendar"]
  },
  "ai-model-fine-tuning": {
    id: "ai-model-fine-tuning",
    title: "AI Model Fine-Tuning Guide",
    description: "Learn how to customize AI models for your specific use cases through fine-tuning.",
    category: "advanced",
    difficulty: "advanced",
    duration: "40 min",
    rating: 4.8,
    tool: "OpenAI API, Hugging Face",
    author: "Dr. Alex Chen",
    publishedAt: "2024-05-17",
    image: "/tutorials/fine-tuning.jpg",
    steps: [
      {
        title: "Understanding fine-tuning fundamentals",
        content: "Fine-tuning is the process of further training an existing AI model on a specific dataset to customize its behavior for particular tasks. Unlike prompt engineering, which works within the constraints of a pre-trained model, fine-tuning actually modifies the model's weights to improve performance on specific domains or tasks.",
        prompt: "Explain the difference between using prompts with a pre-trained model versus fine-tuning a model. What are the advantages and disadvantages of each approach?",
        example: "Explain the difference between using prompts with a pre-trained model versus fine-tuning a model. What are the advantages and disadvantages of each approach? Include specific scenarios where one might be preferred over the other."
      },
      {
        title: "Preparing your dataset",
        content: "The quality of your fine-tuning dataset is crucial for success. You'll need to create a dataset of examples that demonstrate the desired input-output behavior. For language models, this typically means pairs of prompts and ideal completions that represent how you want the model to respond in your application.",
        prompt: "What makes a good fine-tuning dataset? How should I structure and prepare my data for fine-tuning a language model?",
        example: "What makes a good fine-tuning dataset? How should I structure and prepare my data for fine-tuning a language model? Please include information about data format, size requirements, and best practices for ensuring data quality and diversity."
      },
      {
        title: "Setting up OpenAI fine-tuning",
        content: "OpenAI provides a straightforward API for fine-tuning their models. You'll need an OpenAI API key and your prepared dataset. The process involves uploading your dataset, initiating the fine-tuning job, and monitoring its progress.",
        prompt: "Provide step-by-step instructions for setting up and running a fine-tuning job using the OpenAI API.",
        example: "Provide step-by-step instructions for setting up and running a fine-tuning job using the OpenAI API. Include the necessary code snippets for uploading a dataset, initiating the fine-tuning process, and checking the status of the job."
      },
      {
        title: "Fine-tuning with Hugging Face",
        content: "Hugging Face offers an alternative platform for fine-tuning open-source models. Their Transformers library provides tools for fine-tuning a wide variety of models on custom datasets, with more flexibility but also more complexity than OpenAI's solution.",
        prompt: "How do I fine-tune a pre-trained model using Hugging Face's Transformers library? What are the key steps and considerations?",
        example: "How do I fine-tune a pre-trained model using Hugging Face's Transformers library? Please provide a tutorial with code examples for loading a pre-trained model, preparing a dataset, configuring training parameters, and executing the fine-tuning process."
      },
      {
        title: "Hyperparameter optimization",
        content: "Fine-tuning performance can be significantly affected by hyperparameters like learning rate, batch size, and number of training epochs. Understanding how to select and optimize these parameters is crucial for effective fine-tuning.",
        prompt: "What are the key hyperparameters to consider when fine-tuning language models? How do they affect the training process and results?",
        example: "What are the key hyperparameters to consider when fine-tuning language models? How do they affect the training process and results? Please provide guidance on how to select appropriate values for learning rate, batch size, number of epochs, and other important parameters."
      },
      {
        title: "Evaluating your fine-tuned model",
        content: "After fine-tuning, it's essential to evaluate your model's performance to ensure it meets your requirements. This involves testing it on a separate validation dataset and comparing its outputs to your expected results.",
        prompt: "How should I evaluate the performance of my fine-tuned language model? What metrics and methods are most appropriate?",
        example: "How should I evaluate the performance of my fine-tuned language model? What metrics and methods are most appropriate for different types of tasks (e.g., classification, generation, question-answering)? Please include examples of how to implement these evaluation methods."
      },
      {
        title: "Deploying your fine-tuned model",
        content: "Once you're satisfied with your fine-tuned model's performance, you'll need to deploy it for use in your application. This involves setting up the infrastructure to serve model predictions and integrating it with your application's backend.",
        prompt: "What are the best practices for deploying a fine-tuned language model in a production environment?",
        example: "What are the best practices for deploying a fine-tuned language model in a production environment? Please cover aspects like serving infrastructure, scaling considerations, monitoring, and cost management. Include specific recommendations for both OpenAI fine-tuned models and custom models from Hugging Face."
      },
      {
        title: "Ethical considerations and limitations",
        content: "Fine-tuning comes with ethical responsibilities and technical limitations. It's important to understand these to ensure your model is used responsibly and performs as expected in real-world scenarios.",
        prompt: "What ethical considerations should I keep in mind when fine-tuning and deploying AI models? What are the limitations of fine-tuning?",
        example: "What ethical considerations should I keep in mind when fine-tuning and deploying AI models? What are the limitations of fine-tuning in terms of what it can and cannot fix in a base model? Please provide examples of potential issues and how to address them responsibly."
      }
    ],
    tips: [
      "Start with a small, high-quality dataset before scaling up",
      "Use a validation set to prevent overfitting during fine-tuning",
      "Document your fine-tuning process and parameters for reproducibility",
      "Consider the computational resources required before starting fine-tuning",
      "Test your fine-tuned model extensively before deployment",
      "Monitor your model's performance in production for drift or degradation",
      "Be aware of licensing restrictions on base models before fine-tuning",
      "Consider privacy implications when fine-tuning on sensitive data"
    ],
    relatedTutorials: ["prompt-engineering-masterclass", "rag-implementation"]
  },
  "rag-implementation": {
    id: "rag-implementation",
    title: "Building RAG Systems",
    description: "Learn how to implement Retrieval-Augmented Generation (RAG) to enhance AI responses with external knowledge.",
    category: "advanced",
    difficulty: "advanced",
    duration: "45 min",
    rating: 4.9,
    tool: "LangChain, OpenAI, Vector Databases",
    author: "Dr. Sarah Williams",
    publishedAt: "2024-05-18",
    image: "/tutorials/rag-implementation.jpg",
    steps: [
      {
        title: "Understanding RAG architecture",
        content: "Retrieval-Augmented Generation (RAG) combines the power of large language models with the ability to retrieve information from external knowledge sources. This approach allows AI systems to access up-to-date information, reduce hallucinations, and provide more accurate, contextually relevant responses by grounding them in verified data.",
        prompt: "Explain the concept of Retrieval-Augmented Generation (RAG) and how it differs from traditional language model approaches. What problems does it solve?",
        example: "Explain the concept of Retrieval-Augmented Generation (RAG) and how it differs from traditional language model approaches. What problems does it solve? Please include a diagram or description of the typical RAG architecture and workflow."
      },
      {
        title: "Setting up your development environment",
        content: "Before implementing a RAG system, you need to set up your development environment with the necessary tools and libraries. This typically includes a language model API (like OpenAI), a vector database for storing embeddings, and a framework like LangChain to orchestrate the components.",
        prompt: "What tools and libraries do I need to set up a RAG system? Provide a step-by-step guide for setting up the development environment.",
        example: "What tools and libraries do I need to set up a RAG system? Provide a step-by-step guide for setting up the development environment, including code snippets for installing and configuring LangChain, connecting to OpenAI, and setting up a vector database like Pinecone or Chroma."
      },
      {
        title: "Preparing and processing documents",
        content: "The first step in building a RAG system is to prepare your knowledge base. This involves collecting relevant documents, processing them into chunks of appropriate size, and organizing them for efficient retrieval. The quality and organization of your document collection will significantly impact the performance of your RAG system.",
        prompt: "How should I prepare and process documents for a RAG system? What are the best practices for document chunking and preprocessing?",
        example: "How should I prepare and process documents for a RAG system? What are the best practices for document chunking and preprocessing? Please include code examples for loading different document types (PDF, text, HTML), chunking strategies, and handling metadata."
      },
      {
        title: "Creating and storing embeddings",
        content: "To enable semantic search of your documents, you need to convert text chunks into vector embeddings that capture their meaning. These embeddings are then stored in a vector database for efficient similarity search during the retrieval phase.",
        prompt: "Explain how to create and store embeddings for a RAG system. What embedding models should I use and how do I choose a vector database?",
        example: "Explain how to create and store embeddings for a RAG system. What embedding models should I use and how do I choose a vector database? Include code examples for generating embeddings using OpenAI's embedding API and storing them in a vector database like Pinecone, with explanations of key parameters and considerations."
      },
      {
        title: "Implementing the retrieval mechanism",
        content: "The retrieval component of a RAG system is responsible for finding the most relevant documents based on a user query. This typically involves converting the query to an embedding and performing a similarity search in the vector database. The quality of retrieval directly affects the final output of your RAG system.",
        prompt: "How do I implement an effective retrieval mechanism for a RAG system? What techniques can improve retrieval quality?",
        example: "How do I implement an effective retrieval mechanism for a RAG system? What techniques can improve retrieval quality? Please provide code examples for different retrieval strategies (similarity search, hybrid search, re-ranking) and explain how to evaluate and optimize retrieval performance."
      },
      {
        title: "Augmenting prompts with retrieved context",
        content: "Once relevant documents are retrieved, they need to be incorporated into the prompt sent to the language model. This requires careful prompt engineering to ensure the model effectively uses the retrieved information while maintaining coherent and relevant responses.",
        prompt: "What are the best practices for augmenting prompts with retrieved context in a RAG system? How should I structure the prompt?",
        example: "What are the best practices for augmenting prompts with retrieved context in a RAG system? How should I structure the prompt? Please provide examples of effective prompt templates for different RAG use cases (question answering, summarization, content generation) and explain how to handle cases with multiple retrieved documents."
      },
      {
        title: "Optimizing RAG performance",
        content: "Building a basic RAG system is just the beginning. To achieve optimal performance, you need to fine-tune various components, from document chunking strategies to retrieval parameters and prompt templates. This requires systematic experimentation and evaluation.",
        prompt: "How can I optimize the performance of my RAG system? What parameters and components should I focus on?",
        example: "How can I optimize the performance of my RAG system? What parameters and components should I focus on? Please provide a systematic approach to evaluating and improving RAG performance, including metrics to track, common bottlenecks, and techniques for addressing them."
      },
      {
        title: "Deploying and scaling RAG systems",
        content: "Once you've built and optimized your RAG system, you need to deploy it in a production environment. This involves considerations around scalability, latency, cost management, and monitoring to ensure reliable performance as usage grows.",
        prompt: "What are the best practices for deploying and scaling RAG systems in production? What infrastructure considerations should I keep in mind?",
        example: "What are the best practices for deploying and scaling RAG systems in production? What infrastructure considerations should I keep in mind? Please cover aspects like serverless deployment options, caching strategies, monitoring approaches, and cost optimization techniques for different components of the RAG pipeline."
      }
    ],
    tips: [
      "Start with a small, well-curated document collection before scaling up",
      "Experiment with different chunking strategies to find what works best for your content",
      "Use metadata to enhance retrieval relevance and filtering",
      "Implement caching to reduce API costs and latency",
      "Consider hybrid search approaches that combine keyword and semantic search",
      "Test your RAG system with diverse queries to ensure robust performance",
      "Monitor retrieval quality metrics in production to catch degradation",
      "Keep your knowledge base updated to ensure information freshness"
    ],
    relatedTutorials: ["ai-model-fine-tuning", "prompt-engineering-masterclass"]
  },
  "ai-agent-development": {
    id: "ai-agent-development",
    title: "Building AI Agents",
    description: "Learn how to develop autonomous AI agents that can reason, plan, and execute tasks to achieve specific goals.",
    category: "advanced",
    difficulty: "advanced",
    duration: "50 min",
    rating: 4.8,
    tool: "LangChain, AutoGPT, OpenAI",
    author: "Dr. Michael Johnson",
    publishedAt: "2024-05-19",
    image: "/tutorials/ai-agents.jpg",
    steps: [
      {
        title: "Understanding AI agents",
        content: "AI agents are autonomous systems that can perceive their environment, make decisions, and take actions to achieve specific goals. Unlike simple language models that respond to prompts, agents can maintain state, follow complex reasoning paths, and interact with tools and APIs to accomplish tasks that require multiple steps and adaptability.",
        prompt: "Explain what AI agents are and how they differ from traditional language model applications. What capabilities do they have?",
        example: "Explain what AI agents are and how they differ from traditional language model applications. What capabilities do they have? Please include examples of different types of AI agents and their potential applications in business and personal contexts."
      },
      {
        title: "Agent architectures and frameworks",
        content: "There are several architectures and frameworks for building AI agents, from simple ReAct (Reasoning and Acting) patterns to more complex frameworks like AutoGPT and LangChain Agents. Each has different strengths and is suited to different types of tasks and levels of autonomy.",
        prompt: "What are the main architectures and frameworks for building AI agents? Compare their strengths and weaknesses.",
        example: "What are the main architectures and frameworks for building AI agents? Compare their strengths and weaknesses. Please include information about ReAct patterns, LangChain Agents, AutoGPT, BabyAGI, and any other significant frameworks, with examples of when each might be most appropriate."
      },
      {
        title: "Setting up the development environment",
        content: "Before building an AI agent, you need to set up your development environment with the necessary libraries and tools. This typically includes a language model API, agent frameworks, and any additional tools or APIs your agent will need to access.",
        prompt: "How do I set up a development environment for building AI agents? What tools and libraries do I need?",
        example: "How do I set up a development environment for building AI agents? What tools and libraries do I need? Please provide a step-by-step guide for installing and configuring LangChain, connecting to OpenAI, and setting up any other necessary components, with code examples."
      },
      {
        title: "Defining agent goals and constraints",
        content: "A well-designed agent needs clear goals, constraints, and evaluation criteria. This step involves defining what your agent should accomplish, what limitations it should operate within, and how you'll measure its success.",
        prompt: "How should I define goals and constraints for an AI agent? What makes a good agent objective?",
        example: "How should I define goals and constraints for an AI agent? What makes a good agent objective? Please provide guidelines for creating clear, measurable goals, establishing appropriate constraints for safe operation, and designing evaluation metrics that align with the agent's purpose."
      },
      {
        title: "Implementing reasoning and planning",
        content: "The core of an agent's intelligence is its ability to reason about problems and plan sequences of actions. This involves techniques like chain-of-thought reasoning, tree-of-thought exploration, and structured planning approaches that help the agent break down complex tasks into manageable steps.",
        prompt: "How can I implement effective reasoning and planning capabilities in an AI agent? What techniques work best?",
        example: "How can I implement effective reasoning and planning capabilities in an AI agent? What techniques work best? Please provide code examples and explanations for implementing chain-of-thought reasoning, tree-of-thought exploration, and structured planning approaches in LangChain or similar frameworks."
      },
      {
        title: "Connecting agents to tools and APIs",
        content: "To be truly useful, agents need to interact with the world through tools and APIs. This could include web search, data analysis tools, email services, or custom APIs specific to your application. Properly integrating these tools expands what your agent can accomplish.",
        prompt: "How do I connect AI agents to external tools and APIs? What are the best practices for tool integration?",
        example: "How do I connect AI agents to external tools and APIs? What are the best practices for tool integration? Please provide code examples for integrating common tools like web search, data analysis, and communication services, as well as guidelines for designing custom tools that agents can use effectively."
      },
      {
        title: "Implementing memory and state management",
        content: "Unlike stateless language model calls, agents need to maintain memory of past actions, observations, and decisions. Effective memory management allows agents to learn from experience, avoid repetition, and maintain context across multiple steps of a task.",
        prompt: "How should I implement memory and state management in AI agents? What types of memory are important?",
        example: "How should I implement memory and state management in AI agents? What types of memory are important? Please explain different memory architectures (short-term, long-term, episodic, etc.) and provide code examples for implementing them in agent frameworks, with guidance on when to use each approach."
      },
      {
        title: "Testing and evaluating agent performance",
        content: "Evaluating agent performance is crucial but challenging. This step involves designing test scenarios, establishing metrics, and implementing evaluation frameworks to assess how well your agent achieves its goals, handles edge cases, and operates within constraints.",
        prompt: "How should I test and evaluate AI agent performance? What metrics and methods are most effective?",
        example: "How should I test and evaluate AI agent performance? What metrics and methods are most effective? Please provide a framework for comprehensive agent testing, including unit tests for components, integration tests for tool usage, and end-to-end evaluation of goal achievement, with code examples and case studies."
      },
      {
        title: "Deploying and monitoring agents",
        content: "Once your agent is built and tested, you need to deploy it in a production environment and set up monitoring to ensure it continues to perform as expected. This involves considerations around scalability, reliability, safety, and ongoing performance evaluation.",
        prompt: "What are the best practices for deploying and monitoring AI agents in production? How can I ensure reliability and safety?",
        example: "What are the best practices for deploying and monitoring AI agents in production? How can I ensure reliability and safety? Please cover deployment architectures, monitoring systems, safety guardrails, human oversight mechanisms, and strategies for detecting and addressing performance degradation or unexpected behaviors."
      }
    ],
    tips: [
      "Start with simple, well-defined tasks before building more autonomous agents",
      "Implement robust error handling and fallback mechanisms",
      "Use structured outputs to make agent reasoning transparent and debuggable",
      "Consider implementing human oversight for critical decisions",
      "Test agents with diverse and challenging scenarios to ensure robustness",
      "Monitor agent performance and behavior in production",
      "Implement rate limiting and cost controls for API usage",
      "Document agent capabilities and limitations clearly for users"
    ],
    relatedTutorials: ["rag-implementation", "prompt-engineering-masterclass"]
  }
};

// Convert tutorials object to array
const tutorialsArray = Object.values(tutorials);

export default function TutorialPage({ params }: { params: { id: string } }) {
  const tutorialId = params.id;
  
  // Check if this is an advanced tutorial
  const advancedTutorial = advancedTutorials.find(t => t.id === tutorialId);
  
  if (advancedTutorial) {
    return (
      <SiteLayout>
        {/* Tutorial Header */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/tutorials" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Tutorials
            </Link>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    {advancedTutorial.title}
                  </h1>
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    Advanced
                  </div>
                </div>
                <p className="text-xl text-muted-foreground mb-6">{advancedTutorial.description}</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{advancedTutorial.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{advancedTutorial.rating}</span>
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {advancedTutorial.tool}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tutorial Content */}
        <section className="py-12">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdvancedTutorialContent tutorial={advancedTutorial} />
          </div>
        </section>

        {/* Tutorial Recommendations */}
        <section className="py-12 border-t">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TutorialRecommendations 
              allTutorials={[...tutorialsArray, ...advancedTutorials]}
              currentTutorialId={tutorialId}
            />
          </div>
        </section>
      </SiteLayout>
    );
  }

  // Regular tutorial content
  const tutorial = tutorials[tutorialId as keyof typeof tutorials];
  if (!tutorial) {
    return (
      <SiteLayout>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-[50vh] items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Tutorial Not Found</h1>
          <p className="mb-8">The tutorial you're looking for doesn't exist or has been moved.</p>
          <Link href="/tutorials">
            <Button>Back to Tutorials</Button>
          </Link>
        </div>
      </SiteLayout>
    );
  }

  // Code examples for the RAG implementation tutorials
  const codeExamples = {
    "setting-up-environment": ragCodeExamples["setting-up-environment"],
    "document-processing": ragCodeExamples["document-processing"],
    "creating-embeddings": ragCodeExamples["creating-embeddings"],
    "retrieval-mechanism": ragCodeExamples["retrieval-mechanism"],
    "augmented-prompt": ragCodeExamples["augmented-prompt"],
  };
  
  // Solution code examples for the RAG implementation tutorials
  const solutionExamples = {
    "setting-up-environment": ragSolutionExamples["setting-up-environment"],
    "document-processing": ragSolutionExamples["document-processing"],
    "creating-embeddings": ragSolutionExamples["creating-embeddings"],
    "retrieval-mechanism": ragSolutionExamples["retrieval-mechanism"],
    "augmented-prompt": ragSolutionExamples["augmented-prompt"],
  };

  return (
    <SiteLayout>
      {/* Tutorial Header */}
      <section className="py-8 md:py-12 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/tutorials" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Tutorials
          </Link>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{tutorial.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{tutorial.description}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{tutorial.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{tutorial.rating}</span>
                </div>
                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {tutorial.tool}
                </div>
                <div className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                  {tutorial.difficulty}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                By {tutorial.author} • Published {tutorial.publishedAt}
              </div>
            </div>
            <div className="w-full md:w-80 shrink-0">
              <Card>
                <CardContent className="p-6">
                  <TutorialProgress 
                    tutorialId={tutorial.id}
                    steps={tutorial.steps.map(step => ({ title: step.title }))}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Content */}
      <section className="py-12">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="steps" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="steps">Step-by-Step Guide</TabsTrigger>
              <TabsTrigger value="tips">Pro Tips</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="steps" className="mt-0">
              <div className="max-w-3xl">
                {tutorial.steps.map((step, index) => (
                  <div key={index} className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <h2 className="text-2xl font-bold">{step.title}</h2>
                    </div>
                    <div className="ml-14">
                      <p className="mb-6">{step.content}</p>
                      <div className="bg-muted p-6 rounded-lg mb-6">
                        <h3 className="font-semibold mb-2">Prompt to Use:</h3>
                        <div className="bg-background p-4 rounded border mb-4">
                          <code className="text-sm whitespace-pre-wrap">{step.prompt}</code>
                        </div>
                        <h3 className="font-semibold mb-2">Example:</h3>
                        <div className="bg-background p-4 rounded border">
                          <code className="text-sm whitespace-pre-wrap">{step.example}</code>
                        </div>
                      </div>
                      
                      {/* Add code sandbox for RAG implementation tutorial */}
                      {tutorial.id === "rag-implementation" && index >= 1 && index <= 5 && (
                        <div className="mt-8">
                          <h3 className="font-semibold mb-4">Interactive Code Example:</h3>
                          <CodeSandbox
                            initialCode={
                              index === 1 ? codeExamples["setting-up-environment"] :
                              index === 2 ? codeExamples["document-processing"] :
                              index === 3 ? codeExamples["creating-embeddings"] :
                              index === 4 ? codeExamples["retrieval-mechanism"] :
                              codeExamples["augmented-prompt"]
                            }
                            solutionCode={
                              index === 1 ? solutionExamples["setting-up-environment"] :
                              index === 2 ? solutionExamples["document-processing"] :
                              index === 3 ? solutionExamples["creating-embeddings"] :
                              index === 4 ? solutionExamples["retrieval-mechanism"] :
                              solutionExamples["augmented-prompt"]
                            }
                            language="python"
                            title={`Step ${index + 1} Code Example`}
                            description="Try modifying and running this code to see how it works"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="mt-12 pt-8 border-t">
                  <h2 className="text-2xl font-bold mb-6">You've Completed This Tutorial!</h2>
                  <p className="mb-6">
                    Now you know how to {tutorial.id === "write-blog-post" ? "write a blog post with AI" : 
                                        tutorial.id === "creating-images-with-dall-e" ? "create images with DALL-E" :
                                        tutorial.id === "prompt-engineering-masterclass" ? "craft effective prompts for AI models" :
                                        tutorial.id === "ai-model-fine-tuning" ? "fine-tune AI models for your specific use cases" :
                                        tutorial.id === "rag-implementation" ? "build RAG systems to enhance AI responses" :
                                        tutorial.id === "ai-agent-development" ? "develop autonomous AI agents" :
                                        "use AI effectively"}. Try applying these steps to your own projects and see the results!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/tutorials">
                      <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Browse More Tutorials
                      </Button>
                    </Link>
                    <Button className="gap-2">
                      Mark as Complete
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="mt-0">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold mb-6">Pro Tips for {tutorial.title}</h2>
                <ul className="space-y-6">
                  {tutorial.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p>{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-0">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold mb-6">Helpful Resources</h2>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">AI Tools for This Tutorial</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-bold">C</span>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">ChatGPT</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              AI chatbot by OpenAI that can generate text based on prompts.
                            </p>
                            <a 
                              href="https://chat.openai.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary text-sm hover:underline"
                            >
                              Visit ChatGPT →
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Related Tutorials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tutorial.relatedTutorials.map((id) => (
                      <Link key={id} href={`/tutorials/${id}`}>
                        <Card className="hover:bg-muted/50 transition-colors">
                          <CardContent className="p-6">
                            <h4 className="font-semibold mb-2">
                              {id === "product-description" 
                                ? "Write Compelling Product Descriptions" 
                                : "Create Email Marketing Templates"}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {id === "product-description"
                                ? "Create persuasive product descriptions that convert browsers into buyers."
                                : "Design effective email templates for your marketing campaigns."}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Tutorial Recommendations */}
      <section className="py-12 border-t">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TutorialRecommendations 
            allTutorials={[...tutorialsArray, ...advancedTutorials]}
            currentTutorialId={tutorial.id}
          />
        </div>
      </section>
    </SiteLayout>
  );
} 