"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, Clock, Trophy, ArrowRight, CalendarDays, 
  Settings, Award, Star, Flame, BarChart, CheckCircle, Target 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProgressSummary } from "@/components/dashboard/progress-summary";
import { StreakDisplay } from "@/components/tutorials/streak-display";
import { EnhancedProgress } from "@/components/tutorials/enhanced-progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgressStore } from "@/lib/stores/progress-store";
import { useAchievementsStore } from "@/lib/stores/achievements-store";
import { useStreakStore } from "@/lib/stores/streak-store";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  
  // Map the tab parameter to valid tab values
  const getInitialTab = () => {
    if (tabParam === "profile") return "overview";
    if (tabParam === "progress") return "progress";
    if (tabParam === "achievements") return "achievements";
    if (tabParam === "history") return "history";
    return "overview";
  };
  
  const [activeTab, setActiveTab] = useState(getInitialTab());
  
  // Update the tab when the URL parameter changes
  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [tabParam]);
  
  // Get data from stores
  const { 
    getCompletedTutorials, 
    getInProgressTutorials,
    getOverallProgress,
    categoryProgress
  } = useProgressStore();
  
  const { 
    getUnlockedAchievements,
    getLockedAchievements,
    achievements
  } = useAchievementsStore();
  
  const { getStreakStatus } = useStreakStore();
  
  // Computed values
  const completedTutorials = getCompletedTutorials();
  const inProgressTutorials = getInProgressTutorials();
  const unlockedAchievements = getUnlockedAchievements();
  const lockedAchievements = getLockedAchievements();
  const { currentStreak, longestStreak } = getStreakStatus();
  const overallProgress = getOverallProgress();
  
  // Group achievements by category
  const achievementsByCategory = unlockedAchievements.reduce((acc, achievement) => {
    const category = achievement.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(achievement);
    return acc;
  }, {} as Record<string, any[]>);
  
  // Recommended tutorials (mock data)
  const recommendedTutorials = [
    { id: "ai-model-fine-tuning", title: "AI Model Fine-Tuning" },
    { id: "rag-implementation", title: "RAG Implementation" },
    { id: "ai-agent-development", title: "AI Agent Development" }
  ];
  
  // Mock user data
  const user = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    joinDate: "Jan 2023",
    bio: "AI enthusiast and lifelong learner. Passionate about exploring new technologies and building innovative solutions.",
    avatarUrl: "/avatars/user.png"
  };
  
  // Calculate time spent (mock data)
  const timeSpent = {
    today: "1h 20m",
    week: "5h 45m",
    month: "18h 30m",
    total: "42h 15m"
  };
  
  return (
    <SiteLayout>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  Joined {user.joinDate}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Trophy className="h-3 w-3 mr-1" />
                  {unlockedAchievements.length} Achievements
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Flame className="h-3 w-3 mr-1" />
                  {currentStreak} Day Streak
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <EnhancedProgress showOverallProgress={true} />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest learning activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {inProgressTutorials.length > 0 ? (
                      <div className="space-y-4">
                        {inProgressTutorials.slice(0, 3).map((tutorial, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                            <div className="rounded-full bg-primary/10 p-2">
                              <Clock className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{tutorial.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {tutorial.completedSteps} of {tutorial.totalSteps} steps completed
                              </p>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/tutorials/${tutorial.id}`}>Continue</Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No recent activity</p>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-2xl font-bold">{completedTutorials.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">In Progress</p>
                        <p className="text-2xl font-bold">{inProgressTutorials.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Streak</p>
                        <p className="text-2xl font-bold">{currentStreak}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm">Overall Progress</p>
                        <p className="text-sm text-muted-foreground">
                          {overallProgress.completed}/{overallProgress.total}
                        </p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${overallProgress.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Tutorials</CardTitle>
                    <CardDescription>Based on your interests and progress</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {recommendedTutorials.map((tutorial, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="text-sm">
                            {tutorial.title}
                          </div>
                          <Link href={`/tutorials/${tutorial.id}`}>
                            <Button variant="ghost" size="sm">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                    <Link href="/tutorials">
                      <Button variant="outline" size="sm" className="w-full">
                        Browse All Tutorials
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                    <CardDescription>Your latest milestones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {unlockedAchievements.slice(0, 3).map((achievement, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-500">
                            {achievement.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setActiveTab("achievements")}
                    >
                      View All Achievements
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Track your progress across all categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Overall Progress</h3>
                    <span className="text-sm text-muted-foreground">
                      {overallProgress.completed}/{overallProgress.total} tutorials
                    </span>
                  </div>
                  <Progress value={overallProgress.percentage} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{overallProgress.percentage}% complete</span>
                    <span>{overallProgress.total - overallProgress.completed} tutorials remaining</span>
                  </div>
                </div>
                
                <div className="space-y-6 pt-4 border-t">
                  <h3 className="text-sm font-medium">Category Progress</h3>
                  
                  <div className="grid gap-6">
                    {categoryProgress.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Badge className="capitalize">
                              {category.category}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {category.completed}/{category.total}
                          </span>
                        </div>
                        <Progress value={category.percentage} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{category.percentage}% complete</span>
                          {category.completed === category.total ? (
                            <span className="flex items-center text-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </span>
                          ) : (
                            <span>{category.total - category.completed} remaining</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6 pt-4 border-t">
                  <h3 className="text-sm font-medium">Learning Statistics</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Completion
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <div className="text-2xl font-bold">{completedTutorials.length}</div>
                          <div className="text-xs text-muted-foreground">Completed</div>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <div className="text-2xl font-bold">{inProgressTutorials.length}</div>
                          <div className="text-xs text-muted-foreground">In Progress</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        Time Spent
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <div className="text-lg font-bold">{timeSpent.today}</div>
                          <div className="text-xs text-muted-foreground">Today</div>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <div className="text-lg font-bold">{timeSpent.total}</div>
                          <div className="text-xs text-muted-foreground">Total</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <Target className="h-4 w-4 text-amber-500" />
                        Learning Streak
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <div className="text-2xl font-bold">{currentStreak}</div>
                          <div className="text-xs text-muted-foreground">Current Streak</div>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <div className="text-2xl font-bold">{longestStreak}</div>
                          <div className="text-xs text-muted-foreground">Longest Streak</div>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <div className="text-2xl font-bold">{completedTutorials.length}</div>
                          <div className="text-xs text-muted-foreground">Total Completed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>
                  {unlockedAchievements.length} of {achievements.length} achievements unlocked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Achievement Categories */}
                  {Object.entries(achievementsByCategory).map(([category, achievements]) => (
                    <div key={category} className="space-y-4">
                      <h3 className="text-lg font-medium capitalize flex items-center gap-2">
                        {category === 'tutorial' && <BookOpen className="h-5 w-5" />}
                        {category === 'streak' && <Flame className="h-5 w-5" />}
                        {category === 'mastery' && <Award className="h-5 w-5" />}
                        {category === 'special' && <Star className="h-5 w-5" />}
                        {category} Achievements
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((achievement) => (
                          <div 
                            key={achievement.id} 
                            className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-muted"
                          >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20 text-amber-500 text-2xl">
                              {achievement.icon}
                            </div>
                            <div>
                              <p className="font-medium">{achievement.title}</p>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              {achievement.unlockedAt && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Locked Achievements */}
                  {lockedAchievements.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        Locked Achievements
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lockedAchievements.map((achievement) => (
                          <div 
                            key={achievement.id} 
                            className="flex items-center gap-4 p-4 rounded-lg bg-muted/20 border border-muted opacity-60"
                          >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted text-muted-foreground text-2xl">
                              ?
                            </div>
                            <div>
                              <p className="font-medium">{achievement.title}</p>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning History</CardTitle>
                <CardDescription>Your completed tutorials and courses</CardDescription>
              </CardHeader>
              <CardContent>
                {completedTutorials.length > 0 ? (
                  <div className="space-y-4">
                    {completedTutorials.map((tutorial, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Trophy className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{tutorial.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Completed on {new Date(tutorial.lastAccessed).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/tutorials/${tutorial.id}`}>Review</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No completed tutorials yet</p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>In Progress</CardTitle>
                <CardDescription>Tutorials you've started but not yet completed</CardDescription>
              </CardHeader>
              <CardContent>
                {inProgressTutorials.length > 0 ? (
                  <div className="space-y-4">
                    {inProgressTutorials.map((tutorial, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{tutorial.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {tutorial.completedSteps} of {tutorial.totalSteps} steps completed
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/tutorials/${tutorial.id}`}>Continue</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No tutorials in progress</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SiteLayout>
  );
} 