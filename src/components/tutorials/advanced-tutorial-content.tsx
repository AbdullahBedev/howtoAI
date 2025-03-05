'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, ChevronDown, ChevronRight, PlayCircle, Code, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdvancedTutorialContentProps {
  tutorial: {
    id: string;
    title: string;
    description: string;
    requirements: string[];
    outcomes: string[];
    steps: {
      title: string;
      content: string;
      videoUrl?: string;
      codeExample?: string;
      challenge?: {
        description: string;
        hints: string[];
        solution: string;
      };
    }[];
  };
}

export function AdvancedTutorialContent({ tutorial }: AdvancedTutorialContentProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [showingSolution, setShowingSolution] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleSolution = (stepIndex: number) => {
    setShowingSolution(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  const markStepComplete = (stepIndex: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepIndex]: true
    }));
    if (stepIndex < tutorial.steps.length - 1) {
      setActiveStep(stepIndex + 1);
    }
  };

  const progress = (Object.values(completedSteps).filter(Boolean).length / tutorial.steps.length) * 100;

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Requirements and Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <BookOpen className="h-5 w-5" />
              <h3 className="font-semibold">Requirements</h3>
            </div>
            <ul className="space-y-2">
              {tutorial.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <ChevronRight className="h-4 w-4 mt-1 text-primary" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <CheckCircle2 className="h-5 w-5" />
              <h3 className="font-semibold">What You'll Learn</h3>
            </div>
            <ul className="space-y-2">
              {tutorial.outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <ChevronRight className="h-4 w-4 mt-1 text-primary" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Tutorial Steps */}
      <div className="space-y-6">
        {tutorial.steps.map((step, index) => (
          <Card
            key={index}
            className={cn(
              "border-2 transition-colors",
              activeStep === index ? "border-primary" : "border-transparent",
              completedSteps[index] && "bg-primary/5"
            )}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Step Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                      completedSteps[index] ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      {completedSteps[index] ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                    </div>
                    <h3 className="font-semibold">{step.title}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection(`step-${index}`)}
                  >
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      expandedSections[`step-${index}`] && "transform rotate-180"
                    )} />
                  </Button>
                </div>

                {/* Step Content */}
                <AnimatePresence>
                  {expandedSections[`step-${index}`] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 pt-4">
                        <p className="text-muted-foreground">{step.content}</p>

                        {/* Video Section */}
                        {step.videoUrl && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <PlayCircle className="h-4 w-4" />
                              <span>Video Tutorial</span>
                            </div>
                            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                              <Button variant="outline" size="sm">
                                Watch Video
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Code Example */}
                        {step.codeExample && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <Code className="h-4 w-4" />
                              <span>Code Example</span>
                            </div>
                            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                              <code>{step.codeExample}</code>
                            </pre>
                          </div>
                        )}

                        {/* Challenge Section */}
                        {step.challenge && (
                          <div className="space-y-4 border-t pt-4">
                            <h4 className="font-medium">Challenge</h4>
                            <p className="text-sm text-muted-foreground">{step.challenge.description}</p>
                            
                            <div className="space-y-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleSolution(index)}
                              >
                                {showingSolution[index] ? "Hide Solution" : "Show Solution"}
                              </Button>
                              
                              <AnimatePresence>
                                {showingSolution[index] && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <pre className="bg-muted p-4 rounded-lg mt-2 overflow-x-auto">
                                      <code>{step.challenge.solution}</code>
                                    </pre>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end pt-4">
                          <Button
                            onClick={() => markStepComplete(index)}
                            disabled={completedSteps[index]}
                          >
                            {completedSteps[index] ? "Completed" : "Mark as Complete"}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 