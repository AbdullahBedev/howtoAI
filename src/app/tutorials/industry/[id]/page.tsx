import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Star, Lock, Briefcase, TrendingUp, Stethoscope, Scale, ShoppingCart, Megaphone } from "lucide-react";
import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Industry-specific tracks data - this would come from a database in production
const industryTracks = {
  "healthcare-ai": {
    id: "healthcare-ai",
    title: "Healthcare AI Excellence",
    description: "Transform patient care, optimize operations, and drive innovation in healthcare through advanced AI implementation.",
    image: "/industry/healthcare.jpg",
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-gradient-to-r from-blue-500 to-cyan-400",
    textColor: "text-white",
    icon: "stethoscope",
    stats: {
      contentHours: 600,
      modules: 24,
      projects: 12,
      certifications: 4
    },
    phases: [
      {
        title: "Foundation Phase",
        duration: "6 Weeks",
        modules: [
          {
            title: "AI Transformation Mindset in Healthcare",
            description: "Strategies for organizational change in clinical and administrative settings",
            isPremium: false
          },
          {
            title: "Healthcare AI Landscape",
            description: "Current state and future trends in medical AI applications",
            isPremium: false
          },
          {
            title: "Medical Ethics & AI Compliance",
            description: "HIPAA, FDA regulations, and ethical considerations for AI in healthcare",
            isPremium: true
          },
          {
            title: "Healthcare AI Architecture Blueprint",
            description: "Building blocks for implementing AI in clinical workflows and hospital systems",
            isPremium: true
          }
        ]
      },
      {
        title: "Capability Development",
        duration: "12 Weeks",
        modules: [
          {
            title: "Clinical Decision Support Systems",
            description: "Implementing AI assistants for diagnosis and treatment planning",
            isPremium: true
          },
          {
            title: "Medical Imaging Analysis",
            description: "AI applications in radiology, pathology, and diagnostic imaging",
            isPremium: true
          },
          {
            title: "Patient Data Management",
            description: "Industry-specific data optimization techniques for health records",
            isPremium: true
          },
          {
            title: "Healthcare AI Workshop",
            description: "Hands-on project development with anonymized medical data",
            isPremium: true
          },
          {
            title: "EHR Integration Design",
            description: "Connecting AI systems to electronic health record platforms",
            isPremium: true
          }
        ]
      },
      {
        title: "Business Transformation",
        duration: "8 Weeks",
        modules: [
          {
            title: "Healthcare ROI Measurement",
            description: "Quantifying AI impact on patient outcomes and operational efficiency",
            isPremium: true
          },
          {
            title: "Clinical Change Management",
            description: "Driving adoption among healthcare professionals",
            isPremium: true
          },
          {
            title: "Scaling Healthcare AI",
            description: "From department pilots to hospital-wide implementation",
            isPremium: true
          },
          {
            title: "Medical AI Governance",
            description: "Building sustainable AI practices in regulated environments",
            isPremium: true
          }
        ]
      },
      {
        title: "Innovation & Mastery",
        duration: "Progressive",
        modules: [
          {
            title: "Healthcare Innovation Lab",
            description: "Experimental AI applications in emerging clinical areas",
            isPremium: true
          },
          {
            title: "Clinical Peer Review Sessions",
            description: "Structured feedback on healthcare AI implementations",
            isPremium: true
          },
          {
            title: "Advanced Medical AI Techniques",
            description: "Technical deep dives for specialized medical applications",
            isPremium: true
          },
          {
            title: "Healthcare Future-Proofing",
            description: "Adapting to emerging technologies in medical AI",
            isPremium: true
          }
        ]
      }
    ],
    keyFeatures: [
      "Clinical decision support systems and predictive diagnostics",
      "Patient journey optimization and personalized care",
      "Operational efficiency through intelligent scheduling",
      "Healthcare-specific RAG systems for medical knowledge"
    ],
    calmMethodology: {
      discover: "Expert-led overviews of healthcare AI applications and current implementation challenges",
      experiment: "Hands-on exercises with medical datasets and clinical decision support simulations",
      apply: "Real-world implementation planning for specific healthcare environments",
      review: "Expert assessment and optimization guidance from healthcare AI specialists",
      extend: "Integration planning with healthcare IT systems and workflows"
    },
    implementationTools: [
      {
        title: "Medical Digital Twins",
        description: "Custom-built simulated healthcare environments for risk-free learning",
        isPremium: true
      },
      {
        title: "Clinical AI Libraries",
        description: "Production-ready components for healthcare applications",
        isPremium: true
      },
      {
        title: "Medical Prompt Templates",
        description: "Specialized prompts for clinical decision support",
        isPremium: true
      },
      {
        title: "EHR Connectors",
        description: "Pre-built connections to major electronic health record systems",
        isPremium: true
      }
    ]
  },
  "legal-ai": {
    id: "legal-ai",
    title: "Legal AI Mastery",
    description: "Transform legal research, document analysis, and case preparation through advanced AI implementation.",
    image: "/industry/legal.jpg",
    color: "from-indigo-600 to-purple-500",
    bgColor: "bg-gradient-to-r from-indigo-600 to-purple-500",
    textColor: "text-white",
    icon: "scale",
    stats: {
      contentHours: 600,
      modules: 24,
      projects: 12,
      certifications: 4
    },
    phases: [
      {
        title: "Foundation Phase",
        duration: "6 Weeks",
        modules: [
          {
            title: "Legal AI Transformation Mindset",
            description: "Strategies for organizational change in law firms and legal departments",
            isPremium: false
          },
          {
            title: "Legal AI Landscape",
            description: "Current state and future trends in legal AI applications",
            isPremium: false
          },
          {
            title: "Legal Ethics & AI Compliance",
            description: "Bar association guidelines and ethical considerations for AI in legal practice",
            isPremium: true
          },
          {
            title: "Legal AI Architecture Blueprint",
            description: "Building blocks for implementing AI in legal workflows",
            isPremium: true
          }
        ]
      },
      {
        title: "Capability Development",
        duration: "12 Weeks",
        modules: [
          {
            title: "Legal Document Analysis",
            description: "AI applications in contract review and due diligence",
            isPremium: true
          },
          {
            title: "Legal Research Enhancement",
            description: "Advanced techniques for case law and statutory research",
            isPremium: true
          },
          {
            title: "Legal Data Management",
            description: "Industry-specific data optimization techniques for legal documents",
            isPremium: true
          },
          {
            title: "Legal AI Workshop",
            description: "Hands-on project development with anonymized legal data",
            isPremium: true
          },
          {
            title: "Practice Management Integration",
            description: "Connecting AI systems to legal practice management platforms",
            isPremium: true
          }
        ]
      },
      {
        title: "Business Transformation",
        duration: "8 Weeks",
        modules: [
          {
            title: "Legal ROI Measurement",
            description: "Quantifying AI impact on case outcomes and operational efficiency",
            isPremium: true
          },
          {
            title: "Legal Change Management",
            description: "Driving adoption among attorneys and legal staff",
            isPremium: true
          },
          {
            title: "Scaling Legal AI",
            description: "From pilot projects to firm-wide implementation",
            isPremium: true
          },
          {
            title: "Legal AI Governance",
            description: "Building sustainable AI practices in legal environments",
            isPremium: true
          }
        ]
      },
      {
        title: "Innovation & Mastery",
        duration: "Progressive",
        modules: [
          {
            title: "Legal Innovation Lab",
            description: "Experimental AI applications in emerging legal areas",
            isPremium: true
          },
          {
            title: "Legal Peer Review Sessions",
            description: "Structured feedback on legal AI implementations",
            isPremium: true
          },
          {
            title: "Advanced Legal AI Techniques",
            description: "Technical deep dives for specialized legal applications",
            isPremium: true
          },
          {
            title: "Legal Future-Proofing",
            description: "Adapting to emerging technologies in legal AI",
            isPremium: true
          }
        ]
      }
    ],
    keyFeatures: [
      "Contract analysis and automated drafting with guardrails",
      "Precedent research and case prediction models",
      "Legal document generation and review automation",
      "Compliance monitoring and risk identification"
    ],
    calmMethodology: {
      discover: "Expert-led overviews of legal AI applications and current implementation challenges",
      experiment: "Hands-on exercises with legal datasets and contract analysis simulations",
      apply: "Real-world implementation planning for specific legal environments",
      review: "Expert assessment and optimization guidance from legal AI specialists",
      extend: "Integration planning with legal practice management systems"
    },
    implementationTools: [
      {
        title: "Legal Digital Twins",
        description: "Custom-built simulated legal environments for risk-free learning",
        isPremium: true
      },
      {
        title: "Legal AI Libraries",
        description: "Production-ready components for legal applications",
        isPremium: true
      },
      {
        title: "Legal Prompt Templates",
        description: "Specialized prompts for legal document analysis",
        isPremium: true
      },
      {
        title: "Practice Management Connectors",
        description: "Pre-built connections to major legal practice management systems",
        isPremium: true
      }
    ]
  },
  "finance-ai": {
    id: "finance-ai",
    title: "Financial Services AI Transformation",
    description: "Revolutionize risk assessment, fraud detection, and customer experience in financial services through advanced AI implementation.",
    image: "/industry/finance.jpg",
    color: "from-green-500 to-emerald-400",
    bgColor: "bg-gradient-to-r from-green-500 to-emerald-400",
    textColor: "text-white",
    icon: "trending-up",
    stats: {
      contentHours: 600,
      modules: 24,
      projects: 12,
      certifications: 4
    },
    phases: [
      {
        title: "Foundation Phase",
        duration: "6 Weeks",
        modules: [
          {
            title: "Financial AI Transformation Mindset",
            description: "Strategies for organizational change in banking and financial services",
            isPremium: false
          },
          {
            title: "Financial AI Landscape",
            description: "Current state and future trends in financial AI applications",
            isPremium: false
          },
          {
            title: "Financial Regulations & AI Compliance",
            description: "Banking regulations and ethical considerations for AI in finance",
            isPremium: true
          },
          {
            title: "Financial AI Architecture Blueprint",
            description: "Building blocks for implementing AI in financial workflows",
            isPremium: true
          }
        ]
      },
      {
        title: "Capability Development",
        duration: "12 Weeks",
        modules: [
          {
            title: "Risk Assessment Modeling",
            description: "AI applications in credit scoring and risk evaluation",
            isPremium: true
          },
          {
            title: "Fraud Detection Systems",
            description: "Advanced techniques for identifying suspicious transactions",
            isPremium: true
          },
          {
            title: "Financial Data Management",
            description: "Industry-specific data optimization techniques for financial data",
            isPremium: true
          },
          {
            title: "Financial AI Workshop",
            description: "Hands-on project development with anonymized financial data",
            isPremium: true
          },
          {
            title: "Banking System Integration",
            description: "Connecting AI systems to financial platforms and core banking",
            isPremium: true
          }
        ]
      },
      {
        title: "Business Transformation",
        duration: "8 Weeks",
        modules: [
          {
            title: "Financial ROI Measurement",
            description: "Quantifying AI impact on risk reduction and operational efficiency",
            isPremium: true
          },
          {
            title: "Financial Change Management",
            description: "Driving adoption among financial analysts and banking staff",
            isPremium: true
          },
          {
            title: "Scaling Financial AI",
            description: "From pilot projects to enterprise-wide implementation",
            isPremium: true
          },
          {
            title: "Financial AI Governance",
            description: "Building sustainable AI practices in regulated financial environments",
            isPremium: true
          }
        ]
      },
      {
        title: "Innovation & Mastery",
        duration: "Progressive",
        modules: [
          {
            title: "Financial Innovation Lab",
            description: "Experimental AI applications in emerging financial areas",
            isPremium: true
          },
          {
            title: "Financial Peer Review Sessions",
            description: "Structured feedback on financial AI implementations",
            isPremium: true
          },
          {
            title: "Advanced Financial AI Techniques",
            description: "Technical deep dives for specialized financial applications",
            isPremium: true
          },
          {
            title: "Financial Future-Proofing",
            description: "Adapting to emerging technologies in financial AI",
            isPremium: true
          }
        ]
      }
    ],
    keyFeatures: [
      "AI-driven risk assessment and fraud detection systems",
      "Portfolio optimization and trading algorithms",
      "Regulatory compliance automation and reporting",
      "Customer experience personalization and predictive analytics"
    ],
    calmMethodology: {
      discover: "Expert-led overviews of financial AI applications and current implementation challenges",
      experiment: "Hands-on exercises with financial datasets and risk modeling simulations",
      apply: "Real-world implementation planning for specific financial environments",
      review: "Expert assessment and optimization guidance from financial AI specialists",
      extend: "Integration planning with banking systems and financial platforms"
    },
    implementationTools: [
      {
        title: "Financial Digital Twins",
        description: "Custom-built simulated financial environments for risk-free learning",
        isPremium: true
      },
      {
        title: "Financial AI Libraries",
        description: "Production-ready components for financial applications",
        isPremium: true
      },
      {
        title: "Financial Prompt Templates",
        description: "Specialized prompts for financial analysis and reporting",
        isPremium: true
      },
      {
        title: "Banking System Connectors",
        description: "Pre-built connections to major banking and financial platforms",
        isPremium: true
      }
    ]
  },
  "ecommerce-ai": {
    id: "ecommerce-ai",
    title: "Marketing & E-commerce Transformation",
    description: "Revolutionize customer segmentation, personalization, and campaign optimization through advanced AI implementation.",
    image: "/industry/ecommerce.jpg",
    color: "from-orange-500 to-amber-400",
    bgColor: "bg-gradient-to-r from-orange-500 to-amber-400",
    textColor: "text-white",
    icon: "shopping-cart",
    stats: {
      contentHours: 600,
      modules: 24,
      projects: 12,
      certifications: 4
    },
    phases: [
      {
        title: "Foundation Phase",
        duration: "6 Weeks",
        modules: [
          {
            title: "E-commerce AI Transformation Mindset",
            description: "Strategies for organizational change in retail and marketing departments",
            isPremium: false
          },
          {
            title: "E-commerce AI Landscape",
            description: "Current state and future trends in retail and marketing AI",
            isPremium: false
          },
          {
            title: "Consumer Privacy & AI Compliance",
            description: "GDPR, CCPA, and ethical considerations for AI in marketing",
            isPremium: true
          },
          {
            title: "E-commerce AI Architecture Blueprint",
            description: "Building blocks for implementing AI in retail workflows",
            isPremium: true
          }
        ]
      },
      {
        title: "Capability Development",
        duration: "12 Weeks",
        modules: [
          {
            title: "Customer Segmentation Engines",
            description: "AI applications in customer behavior analysis",
            isPremium: true
          },
          {
            title: "Content Generation & Optimization",
            description: "Advanced techniques for creating marketing materials at scale",
            isPremium: true
          },
          {
            title: "Retail Data Management",
            description: "Industry-specific data optimization techniques for e-commerce",
            isPremium: true
          },
          {
            title: "E-commerce AI Workshop",
            description: "Hands-on project development with anonymized retail data",
            isPremium: true
          },
          {
            title: "E-commerce Platform Integration",
            description: "Connecting AI systems to major e-commerce platforms",
            isPremium: true
          }
        ]
      },
      {
        title: "Business Transformation",
        duration: "8 Weeks",
        modules: [
          {
            title: "Retail ROI Measurement",
            description: "Quantifying AI impact on conversions and customer lifetime value",
            isPremium: true
          },
          {
            title: "Marketing Change Management",
            description: "Driving adoption among marketing teams and retail staff",
            isPremium: true
          },
          {
            title: "Scaling E-commerce AI",
            description: "From pilot projects to company-wide implementation",
            isPremium: true
          },
          {
            title: "Marketing AI Governance",
            description: "Building sustainable AI practices in retail environments",
            isPremium: true
          }
        ]
      },
      {
        title: "Innovation & Mastery",
        duration: "Progressive",
        modules: [
          {
            title: "Retail Innovation Lab",
            description: "Experimental AI applications in emerging retail areas",
            isPremium: true
          },
          {
            title: "Marketing Peer Review Sessions",
            description: "Structured feedback on e-commerce AI implementations",
            isPremium: true
          },
          {
            title: "Advanced Retail AI Techniques",
            description: "Technical deep dives for specialized retail applications",
            isPremium: true
          },
          {
            title: "Retail Future-Proofing",
            description: "Adapting to emerging technologies in marketing AI",
            isPremium: true
          }
        ]
      }
    ],
    keyFeatures: [
      "Customer segmentation and personalization engines",
      "Content generation and optimization at scale",
      "Campaign performance prediction and optimization",
      "Visual and conversational commerce implementation"
    ],
    calmMethodology: {
      discover: "Expert-led overviews of retail AI applications and current implementation challenges",
      experiment: "Hands-on exercises with e-commerce datasets and customer segmentation simulations",
      apply: "Real-world implementation planning for specific retail environments",
      review: "Expert assessment and optimization guidance from e-commerce AI specialists",
      extend: "Integration planning with e-commerce platforms and marketing tools"
    },
    implementationTools: [
      {
        title: "Retail Digital Twins",
        description: "Custom-built simulated e-commerce environments for risk-free learning",
        isPremium: true
      },
      {
        title: "Marketing AI Libraries",
        description: "Production-ready components for retail applications",
        isPremium: true
      },
      {
        title: "Marketing Prompt Templates",
        description: "Specialized prompts for content generation and optimization",
        isPremium: true
      },
      {
        title: "E-commerce Platform Connectors",
        description: "Pre-built connections to major e-commerce platforms and marketing tools",
        isPremium: true
      }
    ]
  },
  "manufacturing-ai": {
    id: "manufacturing-ai",
    title: "Manufacturing Intelligence",
    description: "Optimize production processes, supply chains, and quality control through advanced AI implementation.",
    image: "/industry/manufacturing.jpg",
    color: "from-blue-600 to-blue-400",
    bgColor: "bg-gradient-to-r from-blue-600 to-blue-400",
    textColor: "text-white",
    icon: "briefcase",
    stats: {
      contentHours: 600,
      modules: 24,
      projects: 12,
      certifications: 4
    },
    phases: [
      {
        title: "Foundation Phase",
        duration: "6 Weeks",
        modules: [
          {
            title: "Manufacturing AI Transformation Mindset",
            description: "Strategies for organizational change in production environments",
            isPremium: false
          },
          {
            title: "Manufacturing AI Landscape",
            description: "Current state and future trends in industrial AI applications",
            isPremium: false
          },
          {
            title: "Industrial Safety & AI Compliance",
            description: "Regulatory frameworks and ethical considerations for AI in manufacturing",
            isPremium: true
          },
          {
            title: "Manufacturing AI Architecture Blueprint",
            description: "Building blocks for implementing AI in production workflows",
            isPremium: true
          }
        ]
      },
      {
        title: "Capability Development",
        duration: "12 Weeks",
        modules: [
          {
            title: "Predictive Maintenance Systems",
            description: "AI applications for equipment maintenance optimization",
            isPremium: true
          },
          {
            title: "Quality Control Automation",
            description: "Advanced techniques for defect detection and prevention",
            isPremium: true
          },
          {
            title: "Industrial Data Management",
            description: "Industry-specific data optimization techniques for manufacturing",
            isPremium: true
          },
          {
            title: "Manufacturing AI Workshop",
            description: "Hands-on project development with anonymized production data",
            isPremium: true
          },
          {
            title: "ERP & MES Integration",
            description: "Connecting AI systems to manufacturing execution systems",
            isPremium: true
          }
        ]
      },
      {
        title: "Business Transformation",
        duration: "8 Weeks",
        modules: [
          {
            title: "Manufacturing ROI Measurement",
            description: "Quantifying AI impact on efficiency and quality metrics",
            isPremium: true
          },
          {
            title: "Production Change Management",
            description: "Driving adoption among engineers and factory staff",
            isPremium: true
          },
          {
            title: "Scaling Manufacturing AI",
            description: "From pilot projects to factory-wide implementation",
            isPremium: true
          },
          {
            title: "Industrial AI Governance",
            description: "Building sustainable AI practices in manufacturing environments",
            isPremium: true
          }
        ]
      },
      {
        title: "Innovation & Mastery",
        duration: "Progressive",
        modules: [
          {
            title: "Manufacturing Innovation Lab",
            description: "Experimental AI applications in emerging production areas",
            isPremium: true
          },
          {
            title: "Industrial Peer Review Sessions",
            description: "Structured feedback on manufacturing AI implementations",
            isPremium: true
          },
          {
            title: "Advanced Manufacturing AI Techniques",
            description: "Technical deep dives for specialized industrial applications",
            isPremium: true
          },
          {
            title: "Industrial Future-Proofing",
            description: "Adapting to emerging technologies in manufacturing AI",
            isPremium: true
          }
        ]
      }
    ],
    keyFeatures: [
      "Predictive maintenance and quality control systems",
      "Supply chain optimization and inventory management",
      "Production planning and demand forecasting",
      "Connected factory and IoT integration with AI"
    ],
    calmMethodology: {
      discover: "Expert-led overviews of manufacturing AI applications and current implementation challenges",
      experiment: "Hands-on exercises with industrial datasets and predictive maintenance simulations",
      apply: "Real-world implementation planning for specific manufacturing environments",
      review: "Expert assessment and optimization guidance from industrial AI specialists",
      extend: "Integration planning with ERP, MES, and other manufacturing systems"
    },
    implementationTools: [
      {
        title: "Manufacturing Digital Twins",
        description: "Custom-built simulated production environments for risk-free learning",
        isPremium: true
      },
      {
        title: "Industrial AI Libraries",
        description: "Production-ready components for manufacturing applications",
        isPremium: true
      },
      {
        title: "Industrial Prompt Templates",
        description: "Specialized prompts for production analysis and optimization",
        isPremium: true
      },
      {
        title: "Manufacturing System Connectors",
        description: "Pre-built connections to major ERP and MES platforms",
        isPremium: true
      }
    ]
  }
};

// Maps icon string to component
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'stethoscope':
      return <Stethoscope className="h-10 w-10" />;
    case 'scale':
      return <Scale className="h-10 w-10" />;
    case 'trending-up':
      return <TrendingUp className="h-10 w-10" />;
    case 'shopping-cart':
      return <ShoppingCart className="h-10 w-10" />;
    case 'megaphone':
      return <Megaphone className="h-10 w-10" />;
    default:
      return <Briefcase className="h-10 w-10" />;
  }
};

export default function IndustryTrackPage({ params }: { params: { id: string } }) {
  const trackId = params.id;
  const track = industryTracks[trackId as keyof typeof industryTracks];
  
  if (!track) {
    return (
      <SiteLayout>
        <div className="container py-12 flex justify-center">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold">Industry Track Not Found</h1>
            <p className="mt-4 text-muted-foreground">
              The industry track you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/tutorials">
              <Button className="mt-6">
                Return to Tutorials
              </Button>
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-5xl px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center">
            <div className="w-full flex justify-center mb-4">
              <Link href="/tutorials" className="inline-flex items-center text-sm hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to tutorials
              </Link>
            </div>
            
            <div className={`${track.bgColor} text-${track.textColor} rounded-xl p-8 mb-6 w-full`}>
              <div className="flex flex-col items-center gap-6">
                <div className="p-4 bg-white/20 rounded-full">
                  {getIcon(track.icon)}
                </div>
                
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl font-bold">{track.title}</h1>
                  <p className="mt-2 text-lg opacity-90 max-w-3xl mx-auto">{track.description}</p>
                  
                  <div className="mt-4 flex flex-wrap justify-center gap-4">
                    <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1">
                      {track.stats.contentHours}+ Hours of Content
                    </Badge>
                    <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1">
                      {track.stats.modules} Learning Modules
                    </Badge>
                    <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1">
                      {track.stats.projects} Practical Projects
                    </Badge>
                    <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1">
                      {track.stats.certifications} Industry Certifications
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <Button size="lg" className="bg-white text-black hover:bg-white/90">
                    Enroll Now <Lock className="h-4 w-4 ml-2 text-amber-500" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Industry Certifications Section */}
          <div className="mb-12 w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Industry-Recognized Certifications</h2>
            
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/10 rounded-xl p-8 mb-6 w-full">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-amber-200/50 dark:bg-amber-800/30 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 9.5V5.5C4.5 4.4 5.4 3.5 6.5 3.5H17.5C18.6 3.5 19.5 4.4 19.5 5.5V9.5"></path>
                      <path d="M2.5 12.5H21.5V18.5C21.5 19.6 20.6 20.5 19.5 20.5H4.5C3.4 20.5 2.5 19.6 2.5 18.5V12.5Z"></path>
                      <path d="M12 7.5V16.5"></path>
                      <path d="M8 16.5H16"></path>
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-center">{track.title.split(' ')[0]} AI Professional Certification</h3>
                
                <p className="mb-6 text-muted-foreground text-center max-w-3xl mx-auto">
                  Upon completion of this comprehensive industry track, you'll receive our prestigious
                  {" "}<span className="font-semibold text-foreground">{track.title.split(' ')[0]} AI Professional Certification</span>—an 
                  industry-recognized credential that validates your expertise in implementing AI solutions specific to the {track.title.split(' ')[0].toLowerCase()} sector.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex flex-col items-center p-4 bg-background rounded-lg border border-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22v-5"></path>
                      <path d="M9 7V2"></path>
                      <path d="M15 7V2"></path>
                      <path d="M12 17V7"></path>
                      <path d="M5 17h14"></path>
                      <path d="M5 7h14"></path>
                    </svg>
                    <h4 className="font-semibold mb-2">Industry Validated</h4>
                    <p className="text-sm text-center">Developed with leading {track.title.split(' ')[0].toLowerCase()} organizations to ensure real-world relevance</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-background rounded-lg border border-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                      <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                    </svg>
                    <h4 className="font-semibold mb-2">Skill Verification</h4>
                    <p className="text-sm text-center">Includes practical assessments that prove your ability to deliver AI solutions</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-background rounded-lg border border-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    <h4 className="font-semibold mb-2">Career Acceleration</h4>
                    <p className="text-sm text-center">Recognized by employers as a signal of in-demand AI expertise</p>
                  </div>
                </div>
                
                <div className="bg-background rounded-lg p-6 border border-muted">
                  <h4 className="text-lg font-semibold mb-4 text-center">How This Certification Advances Your Career</h4>
                  <ul className="space-y-3 text-left max-w-3xl mx-auto">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p><span className="font-medium">Salary Premium:</span> Certified AI professionals in {track.title.split(' ')[0].toLowerCase()} earn up to 32% higher salaries than their non-certified peers</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p><span className="font-medium">Employer Recognition:</span> Our certification is recognized by over 500+ companies globally, including Fortune 500 leaders</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p><span className="font-medium">Job Placement Support:</span> Access to our exclusive job board with {track.title.split(' ')[0].toLowerCase()}-specific AI roles from premium employers</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p><span className="font-medium">Digital Credential:</span> Shareable badges for LinkedIn and other professional platforms to showcase your expertise</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Key Features */}
          <div className="mb-12 w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Key Capabilities You'll Develop</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {track.keyFeatures.map((feature, index) => (
                <Card key={index} className="border-muted bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-left">{feature}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Learning Journey */}
          <div className="mb-12 w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Your Learning Journey</h2>
            
            <Tabs defaultValue="phase1" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                <TabsTrigger value="phase1">Foundation</TabsTrigger>
                <TabsTrigger value="phase2">Capability</TabsTrigger>
                <TabsTrigger value="phase3">Transformation</TabsTrigger>
                <TabsTrigger value="phase4">Innovation</TabsTrigger>
              </TabsList>
              
              {track.phases.map((phase, phaseIndex) => (
                <TabsContent key={phaseIndex} value={`phase${phaseIndex + 1}`}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{phase.title}</span>
                        <Badge variant="outline">{phase.duration}</Badge>
                      </CardTitle>
                      <CardDescription>
                        {phaseIndex === 0 && "Build your fundamental understanding and strategic framework"}
                        {phaseIndex === 1 && "Develop practical implementation skills through hands-on projects"}
                        {phaseIndex === 2 && "Learn to scale solutions and drive organizational change"}
                        {phaseIndex === 3 && "Stay at the cutting edge with advanced techniques and future trends"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {phase.modules.map((module, moduleIndex) => (
                          <div key={moduleIndex} className="flex items-start justify-between p-4 rounded-lg border border-muted bg-background text-left">
                            <div className="flex-1">
                              <h4 className="font-medium">{module.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                            </div>
                            {module.isPremium && <Lock className="h-4 w-4 text-amber-500 flex-shrink-0 mt-1" />}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          {/* CALM Methodology */}
          <div className="mb-12 w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Interactive Learning Methodology</h2>
            <p className="mb-6 max-w-3xl mx-auto text-center">Our proprietary Continuous Application Learning Method (CALM) ensures maximum retention and implementation:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">1. Discover (10%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{track.calmMethodology.discover}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">2. Experiment (20%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{track.calmMethodology.experiment}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">3. Apply (40%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{track.calmMethodology.apply}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">4. Review (15%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{track.calmMethodology.review}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">5. Extend (15%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{track.calmMethodology.extend}</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Implementation Tools */}
          <div className="mb-12 w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Implementation Accelerators</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {track.implementationTools.map((tool, index) => (
                <Card key={index} className={`border-muted ${tool.isPremium ? 'bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/10' : ''}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between">
                      <span>{tool.title}</span>
                      {tool.isPremium && <Lock className="h-4 w-4 text-amber-500" />}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <div className="rounded-xl bg-muted p-8 w-full">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Organization?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of professionals who are leading their industry's AI transformation. 
                Our comprehensive program will give you the skills, tools, and confidence to implement 
                AI solutions that deliver measurable business impact.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className={`${track.bgColor} hover:opacity-90`}>
                  Enroll Now <Lock className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Request Team Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
} 