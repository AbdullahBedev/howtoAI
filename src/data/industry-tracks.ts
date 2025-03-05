import { Track } from '@/types/tracks';

export const industryTracks: Track[] = [
  {
    id: "healthcare-ai",
    title: "Healthcare AI Implementation",
    description: "Learn how to implement AI solutions in healthcare settings for improved patient outcomes and operational efficiency.",
    image: "/industry/healthcare.jpg",
    color: "from-blue-500 to-cyan-400",
    icon: "stethoscope",
    tutorials: [
      {
        id: "medical-imaging-ai",
        title: "AI in Medical Imaging Analysis",
        description: "Learn how to use AI for analyzing medical images like X-rays, MRIs, and CT scans.",
        duration: "45 min",
        difficulty: "advanced",
        tool: "TensorFlow, PyTorch",
        isPremium: true
      },
      {
        id: "patient-data-analysis",
        title: "Patient Data Analysis with AI",
        description: "Implement AI solutions for analyzing patient data and predicting health outcomes.",
        duration: "40 min",
        difficulty: "advanced",
        tool: "Python, Scikit-learn",
        isPremium: true
      },
      {
        id: "healthcare-chatbots",
        title: "Building Healthcare Chatbots",
        description: "Create intelligent chatbots for patient support and medical information.",
        duration: "30 min",
        difficulty: "intermediate",
        tool: "ChatGPT API",
        isPremium: false
      }
    ]
  },
  {
    id: "legal-ai",
    title: "Legal AI Workflows",
    description: "Discover how AI can transform legal research, document review, and contract analysis for law firms and legal departments.",
    image: "/industry/legal.jpg",
    color: "from-indigo-600 to-purple-500",
    icon: "scale",
    tutorials: [
      {
        id: "legal-document-analysis",
        title: "AI for Legal Document Analysis",
        description: "Use AI to analyze and extract information from legal documents.",
        duration: "35 min",
        difficulty: "advanced",
        tool: "LangChain, OpenAI",
        isPremium: true
      },
      {
        id: "contract-review-automation",
        title: "Automating Contract Review",
        description: "Build AI systems for automated contract review and risk assessment.",
        duration: "40 min",
        difficulty: "advanced",
        tool: "Claude, GPT-4",
        isPremium: true
      },
      {
        id: "legal-research-ai",
        title: "AI-Powered Legal Research",
        description: "Enhance legal research with AI-powered search and analysis tools.",
        duration: "25 min",
        difficulty: "intermediate",
        tool: "ChatGPT",
        isPremium: false
      }
    ]
  },
  {
    id: "finance-ai",
    title: "Financial Services AI Applications",
    description: "Implement AI solutions for risk assessment, fraud detection, and personalized financial advice in banking and finance.",
    image: "/industry/finance.jpg",
    color: "from-green-500 to-emerald-400",
    icon: "trending-up",
    tutorials: [
      {
        id: "fraud-detection-ai",
        title: "AI-Powered Fraud Detection",
        description: "Build AI models for detecting fraudulent transactions and activities.",
        duration: "45 min",
        difficulty: "advanced",
        tool: "Python, TensorFlow",
        isPremium: true
      },
      {
        id: "risk-assessment-models",
        title: "Building Risk Assessment Models",
        description: "Create AI models for credit risk assessment and portfolio management.",
        duration: "40 min",
        difficulty: "advanced",
        tool: "Python, Scikit-learn",
        isPremium: true
      },
      {
        id: "financial-chatbots",
        title: "Financial Advisory Chatbots",
        description: "Develop chatbots for personalized financial advice and support.",
        duration: "30 min",
        difficulty: "intermediate",
        tool: "ChatGPT API",
        isPremium: false
      }
    ]
  },
  {
    id: "ecommerce-ai",
    title: "E-commerce & Retail AI Solutions",
    description: "Transform your e-commerce business with AI-powered product recommendations, inventory management, and customer service.",
    image: "/industry/ecommerce.jpg",
    color: "from-orange-500 to-amber-400",
    icon: "shopping-cart",
    tutorials: [
      {
        id: "product-recommendation-engines",
        title: "Building Product Recommendation Engines",
        description: "Create personalized product recommendation systems using AI.",
        duration: "40 min",
        difficulty: "advanced",
        tool: "Python, TensorFlow",
        isPremium: true
      },
      {
        id: "inventory-optimization",
        title: "AI for Inventory Optimization",
        description: "Implement AI solutions for inventory management and demand forecasting.",
        duration: "35 min",
        difficulty: "advanced",
        tool: "Python, Prophet",
        isPremium: true
      },
      {
        id: "ecommerce-chatbots",
        title: "E-commerce Customer Service Bots",
        description: "Build intelligent chatbots for customer support and sales.",
        duration: "25 min",
        difficulty: "intermediate",
        tool: "ChatGPT API",
        isPremium: false
      }
    ]
  },
  {
    id: "marketing-ai",
    title: "Marketing AI Strategies",
    description: "Leverage AI for content creation, campaign optimization, and customer segmentation to boost your marketing effectiveness.",
    image: "/industry/marketing.jpg",
    color: "from-red-500 to-pink-400",
    icon: "megaphone",
    tutorials: [
      {
        id: "content-generation-at-scale",
        title: "AI Content Generation at Scale",
        description: "Use AI to generate high-quality marketing content at scale.",
        duration: "35 min",
        difficulty: "intermediate",
        tool: "GPT-4, Claude",
        isPremium: true
      },
      {
        id: "campaign-optimization",
        title: "AI-Driven Campaign Optimization",
        description: "Optimize marketing campaigns using AI and machine learning.",
        duration: "40 min",
        difficulty: "advanced",
        tool: "Python, Scikit-learn",
        isPremium: true
      },
      {
        id: "customer-segmentation",
        title: "Advanced Customer Segmentation",
        description: "Implement AI-powered customer segmentation and targeting.",
        duration: "30 min",
        difficulty: "intermediate",
        tool: "Python, Clustering Models",
        isPremium: false
      }
    ]
  }
]; 