'use client';

import Link from "next/link";
import { ArrowLeft, BookOpen, BadgeCheck, Clock, Star, Lock, Zap, Award, Sparkles, Brain, Code, FileCode, GitBranch, Layers, Command, Globe, EyeIcon, Server, FlaskConical, Rocket } from "lucide-react";
import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { learningPaths } from "@/data/learning-paths";

// Helper function to get the icon component based on the icon name
const getIcon = (iconName: string, className?: string) => {
  switch (iconName) {
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

export default function LearningPathsPage() {
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
            <h1 className="text-3xl font-bold">Learning Paths</h1>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Structured learning journeys designed to take you from beginner to expert in specific AI domains. 
              Each path includes multiple modules with hands-on projects and leads to a recognized certification.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {learningPaths.map((path, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
              <div className={`h-2 bg-gradient-to-r ${path.color}`}></div>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 rounded-lg bg-muted/50">
                    {getIcon(path.iconName, "h-6 w-6")}
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200">
                    {path.level}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{path.title}</CardTitle>
                <CardDescription className="line-clamp-2">{path.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4 flex-grow">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Course Progress</span>
                      <span className="font-medium">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{path.totalHours} hours</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{path.modules.length} modules</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {path.skills.slice(0, 3).map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="bg-muted/50">
                        {skill.name}
                      </Badge>
                    ))}
                    {path.skills.length > 3 && (
                      <Badge variant="secondary" className="bg-muted/50">
                        +{path.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button asChild className={`w-full bg-gradient-to-r ${path.color} text-white hover:opacity-90`}>
                  <Link href={`/tutorials/learning-paths/${path.id}`}>
                    View Learning Path
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="bg-muted/30 rounded-xl p-8 border border-muted">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Award className="h-12 w-12 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Earn Industry-Recognized Certifications</h2>
              <p className="text-muted-foreground mb-4 max-w-3xl">
                Complete any learning path to earn a certification recognized by leading companies in the AI industry.
                Our certifications validate your expertise and can help advance your career in AI.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button variant="outline" className="gap-2">
                  <BadgeCheck className="h-4 w-4" />
                  View All Certifications
                </Button>
                <Button variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  For Enterprise
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
} 