'use client';

import Link from "next/link";
import { ArrowLeft, BookOpen, BadgeCheck, Clock, Star, Lock, Zap, Award, Sparkles, Brain, Code, FileCode, GitBranch, Layers, Command, Globe, EyeIcon, Server, FlaskConical, Rocket, Briefcase, Building2, GraduationCap } from "lucide-react";
import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for industry tracks
const industryTracks = [
  {
    id: "healthcare-ai",
    title: "Healthcare AI Applications",
    description: "Learn to build AI solutions for healthcare diagnostics, patient care, and medical research",
    level: "Intermediate",
    modules: 8,
    hours: 20,
    certificate: true,
    color: "from-emerald-500 to-teal-600",
    iconName: "stethoscope",
    skills: [
      { name: "Medical Data Analysis", level: 8 },
      { name: "Healthcare Compliance", level: 7 },
      { name: "Clinical NLP", level: 9 },
      { name: "Medical Imaging AI", level: 8 }
    ]
  },
  {
    id: "financial-ai",
    title: "Financial Services AI",
    description: "Master AI applications in trading, risk assessment, fraud detection, and financial forecasting",
    level: "Advanced",
    modules: 7,
    hours: 18,
    certificate: true,
    color: "from-blue-500 to-cyan-600",
    iconName: "building",
    skills: [
      { name: "Financial Modeling", level: 9 },
      { name: "Risk Assessment", level: 8 },
      { name: "Fraud Detection", level: 9 },
      { name: "Algorithmic Trading", level: 7 }
    ]
  },
  {
    id: "legal-ai",
    title: "Legal AI Systems",
    description: "Develop AI tools for legal research, contract analysis, compliance, and case prediction",
    level: "Intermediate",
    modules: 6,
    hours: 15,
    certificate: true,
    color: "from-purple-500 to-indigo-600",
    iconName: "scale",
    skills: [
      { name: "Legal Document Analysis", level: 9 },
      { name: "Compliance Automation", level: 8 },
      { name: "Case Law Research", level: 7 },
      { name: "Legal NLP", level: 8 }
    ]
  }
];

// Helper function to get the icon component based on the icon name
const getIcon = (iconName: string, className?: string) => {
  switch (iconName) {
    case 'building':
      return <Building2 className={className || "h-8 w-8"} />;
    case 'stethoscope':
      return <GraduationCap className={className || "h-8 w-8"} />; // Using GraduationCap as a substitute for stethoscope
    case 'scale':
      return <Briefcase className={className || "h-8 w-8"} />; // Using Briefcase as a substitute for scale
    case 'command':
      return <Command className={className || "h-8 w-8"} />;
    case 'brain':
      return <Brain className={className || "h-8 w-8"} />;
    case 'layers':
      return <Layers className={className || "h-8 w-8"} />;
    case 'git-branch':
      return <GitBranch className={className || "h-8 w-8"} />;
    case 'zap':
      return <Zap className={className || "h-8 w-8"} />;
    case 'file-code':
      return <FileCode className={className || "h-8 w-8"} />;
    case 'eye-icon':
      return <EyeIcon className={className || "h-8 w-8"} />;
    case 'server':
      return <Server className={className || "h-8 w-8"} />;
    case 'flask-conical':
      return <FlaskConical className={className || "h-8 w-8"} />;
    case 'rocket':
      return <Rocket className={className || "h-8 w-8"} />;
    case 'sparkles':
      return <Sparkles className={className || "h-8 w-8"} />;
    case 'book-open':
      return <BookOpen className={className || "h-8 w-8"} />;
    case 'code':
      return <Code className={className || "h-8 w-8"} />;
    default:
      return <BookOpen className={className || "h-8 w-8"} />;
  }
};

export default function IndustryTracksPage() {
  return (
    <SiteLayout>
      <div className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/tutorials" className="text-sm text-muted-foreground hover:text-foreground flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Tutorials
              </Link>
            </div>
            <h1 className="text-3xl font-bold">Industry Tracks</h1>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Specialized learning tracks designed for professionals in specific industries. 
              Master AI applications tailored to your field and earn industry-recognized certifications.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {industryTracks.map((track, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
              <div className={`h-2 bg-gradient-to-r ${track.color}`}></div>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 rounded-lg bg-muted/50">
                    {getIcon(track.iconName, "h-6 w-6")}
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200">
                    {track.level}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{track.title}</CardTitle>
                <CardDescription className="line-clamp-2">{track.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4 flex-grow">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Track Progress</span>
                      <span className="font-medium">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{track.hours} hours</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{track.modules} modules</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {track.skills.slice(0, 3).map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="bg-muted/50">
                        {skill.name}
                      </Badge>
                    ))}
                    {track.skills.length > 3 && (
                      <Badge variant="secondary" className="bg-muted/50">
                        +{track.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button asChild className={`w-full bg-gradient-to-r ${track.color} text-white hover:opacity-90`}>
                  <Link href={`/tutorials/industry/${track.id}`}>
                    View Industry Track
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="bg-muted/30 rounded-xl p-8 border border-muted">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Briefcase className="h-12 w-12 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Industry-Specific AI Expertise</h2>
              <p className="text-muted-foreground mb-4 max-w-3xl">
                Our industry tracks are developed in collaboration with leading companies and experts in each field.
                Gain specialized knowledge and skills that are directly applicable to your professional domain.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button variant="outline" className="gap-2">
                  <BadgeCheck className="h-4 w-4" />
                  Industry Certifications
                </Button>
                <Button variant="outline" className="gap-2">
                  <Building2 className="h-4 w-4" />
                  For Organizations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
} 