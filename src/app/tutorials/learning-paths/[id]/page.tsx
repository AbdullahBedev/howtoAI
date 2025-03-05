import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Star, Lock, Zap, Award, Sparkles, Brain, Code, FileCode, GitBranch, Layers, Command, Globe, EyeIcon, Server, FlaskConical, Rocket, LucideIcon } from "lucide-react";
import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
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

export default function LearningPathPage({ params }: { params: { id: string } }) {
  const pathId = params.id;
  const path = learningPaths.find(p => p.id === pathId);
  
  if (!path) {
    return (
      <SiteLayout>
        <div className="container py-12 flex justify-center">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold">Learning Path Not Found</h1>
            <p className="mt-4 text-muted-foreground">
              The learning path you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/tutorials/learning-paths">
              <Button className="mt-6">
                Return to Learning Paths
              </Button>
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  // Calculate total sections across all modules
  const totalSections = path.modules.reduce((acc, module) => acc + module.sections.length, 0);
  
  // Calculate free vs premium content ratio
  const premiumModules = path.modules.filter(module => module.isPremium).length;
  const freeModules = path.modules.length - premiumModules;
  const premiumPercentage = (premiumModules / path.modules.length) * 100;

  return (
    <SiteLayout>
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-5xl px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center">
            <div className="w-full flex justify-center mb-4">
              <Link href="/tutorials/learning-paths" className="inline-flex items-center text-sm hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to learning paths
              </Link>
            </div>
            
            <div className={`bg-gradient-to-r ${path.color} text-white rounded-xl p-8 mb-6 w-full`}>
              <div className="flex flex-col items-center gap-6">
                <div className="p-4 bg-white/20 rounded-full">
                  {getIcon(path.iconName)}
                </div>
                
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl font-bold">{path.title}</h1>
                  <p className="mt-2 text-lg opacity-90 max-w-3xl mx-auto">{path.description}</p>
                  
                  <div className="mt-4 flex flex-wrap justify-center gap-4">
                    <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1">
                      {path.totalHours} Hours of Content
                    </Badge>
                    <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1">
                      {path.modules.length} Learning Modules
                    </Badge>
                    <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1">
                      {totalSections} Interactive Lessons
                    </Badge>
                    <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1">
                      {path.level} Level
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <Button size="lg" className="bg-white text-black hover:bg-white/90">
                    Start Learning <Zap className="h-4 w-4 ml-2 text-amber-500" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Overview Section */}
          <div className="mb-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">About This Learning Path</h2>
                <p className="text-muted-foreground mb-6">{path.longDescription}</p>
                
                <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {path.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{outcome}</p>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">Prerequisites</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-6">
                  {path.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Path Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Free vs Premium</span>
                        <span>{freeModules} Free / {premiumModules} Premium</span>
                      </div>
                      <div className="flex h-2 rounded-full overflow-hidden bg-muted">
                        <div className="bg-blue-500 h-full" style={{ width: `${100 - premiumPercentage}%` }}></div>
                        <div className="bg-amber-500 h-full" style={{ width: `${premiumPercentage}%` }}></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-muted-foreground">Level</span>
                      <Badge variant="outline">{path.level}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-muted-foreground">Total Duration</span>
                      <span className="font-medium">{path.totalHours} hours</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-muted-foreground">Modules</span>
                      <span className="font-medium">{path.modules.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-muted-foreground">Projects</span>
                      <span className="font-medium">{path.projects.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground">Certification</span>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
                        Included
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Enroll Now</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Skills You'll Gain */}
          <div className="mb-12 w-full">
            <h2 className="text-2xl font-bold mb-6">Skills You'll Gain</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {path.skills.map((skill, index) => (
                <Card key={index} className="border-muted">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{skill.name}</h3>
                    <div className="flex items-center gap-2">
                      <Progress value={skill.level * 10} className="h-2" />
                      <span className="text-xs text-muted-foreground">{skill.level}/10</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Learning Path Modules */}
          <div className="mb-12 w-full">
            <h2 className="text-2xl font-bold mb-6">Learning Path Modules</h2>
            <div className="space-y-6">
              {path.modules.map((module, moduleIndex) => (
                <Card key={moduleIndex} className={`border-l-4 ${module.isPremium ? 'border-l-amber-500' : 'border-l-blue-500'}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {module.title}
                          {module.isPremium && <Lock className="h-4 w-4 text-amber-500" />}
                        </CardTitle>
                        <CardDescription className="mt-1">{module.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {module.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {module.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="flex items-start gap-3 p-3 rounded-lg border border-muted bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="p-2 bg-background rounded-md border border-muted">
                            {section.iconName ? getIcon(section.iconName, "h-4 w-4 text-muted-foreground") : <BookOpen className="h-4 w-4 text-muted-foreground" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{section.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{section.content}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {section.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Certification */}
          <div className="mb-12 w-full">
            <h2 className="text-2xl font-bold mb-6">Certification</h2>
            <Card className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/10 border-amber-200">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="p-4 bg-amber-200/50 dark:bg-amber-800/30 rounded-full">
                    <Award className="h-12 w-12 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{path.certificationDetails.name}</h3>
                    <p className="text-muted-foreground mb-4">{path.certificationDetails.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-1">Validity Period</h4>
                        <p className="text-sm text-muted-foreground">{path.certificationDetails.validityPeriod}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">Recognized By</h4>
                        <p className="text-sm text-muted-foreground">{path.certificationDetails.recognizedBy.join(", ")}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Certified Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {path.certificationDetails.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 border-amber-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Projects */}
          <div className="mb-12 w-full">
            <h2 className="text-2xl font-bold mb-6">Hands-on Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {path.projects.map((project, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle>{project.title}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${project.difficulty === 'Easy' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                          ${project.difficulty === 'Medium' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                          ${project.difficulty === 'Hard' ? 'bg-orange-100 text-orange-800 border-orange-200' : ''}
                          ${project.difficulty === 'Expert' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                        `}
                      >
                        {project.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Skills Applied</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Deliverables</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {project.deliverables.map((deliverable, deliverableIndex) => (
                            <li key={deliverableIndex}>{deliverable}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Estimated: {project.estimatedHours} hours
                        </span>
                        <Button variant="outline" size="sm">View Project</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Instructors */}
          <div className="mb-12 w-full">
            <h2 className="text-2xl font-bold mb-6">Meet Your Instructors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {path.instructors.map((instructor, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-muted">
                        <Image 
                          src={instructor.avatar} 
                          alt={instructor.name} 
                          width={96} 
                          height={96} 
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-semibold">{instructor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{instructor.role}</p>
                      <p className="text-sm">{instructor.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* FAQs */}
          <div className="mb-12 w-full">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {path.faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Reviews */}
          <div className="mb-12 w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Student Reviews</h2>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-medium">
                  {path.reviews.reduce((acc, review) => acc + review.rating, 0) / path.reviews.length}
                  /5
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {path.reviews.map((review, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          src={review.avatar} 
                          alt={review.name} 
                          width={48} 
                          height={48} 
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{review.name}</h4>
                            <p className="text-xs text-muted-foreground">{review.role} at {review.company}</p>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">{review.review}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Related Resources */}
          <div className="mb-12 w-full">
            <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {path.resources.map((resource, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-muted rounded-md">
                        {resource.type === 'article' && <FileCode className="h-5 w-5 text-blue-500" />}
                        {resource.type === 'video' && <BookOpen className="h-5 w-5 text-red-500" />}
                        {resource.type === 'book' && <BookOpen className="h-5 w-5 text-green-500" />}
                        {resource.type === 'github' && <GitBranch className="h-5 w-5 text-purple-500" />}
                        {resource.type === 'website' && <Globe className="h-5 w-5 text-orange-500" />}
                      </div>
                      <div>
                        <h4 className="font-semibold">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                        <Link href={resource.url} target="_blank" className="text-sm text-blue-600 hover:underline">
                          View Resource
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <div className="w-full">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-900/10 border-blue-200">
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col items-center text-center">
                  <Sparkles className="h-12 w-12 text-blue-500 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Ready to Master {path.title.split(' ').slice(0, 2).join(' ')}?</h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl">
                    Join thousands of professionals who have transformed their careers through this comprehensive learning path.
                    Start your journey today and gain the skills that will set you apart.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Enroll Now
                    </Button>
                    <Button size="lg" variant="outline">
                      Download Syllabus
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
} 