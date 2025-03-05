'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useProgressStore } from "@/lib/stores/progress-store";
import { BarChart, BookOpen, CheckCircle, Clock, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EnhancedProgressProps {
  showOverallProgress?: boolean;
}

export function EnhancedProgress({ showOverallProgress = false }: EnhancedProgressProps) {
  const [activeTab, setActiveTab] = useState("progress");
  
  const { 
    getOverallProgress, 
    categoryProgress, 
    getCompletedTutorials, 
    getInProgressTutorials 
  } = useProgressStore();
  
  const overallProgress = getOverallProgress();
  const completedTutorials = getCompletedTutorials();
  const inProgressTutorials = getInProgressTutorials();
  
  // Calculate time spent (mock data)
  const timeSpent = {
    today: "1h 20m",
    week: "5h 45m",
    month: "18h 30m",
    total: "42h 15m"
  };
  
  // Calculate completion rate
  const completionRate = completedTutorials.length > 0 
    ? Math.round((completedTutorials.length / (completedTutorials.length + inProgressTutorials.length)) * 100) 
    : 0;
  
  // Calculate streak data (mock data)
  const streakData = {
    current: 5,
    longest: 12,
    total: 28
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Your Progress</span>
        </CardTitle>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="mb-4">
            <TabsTrigger value="progress">
              <BookOpen className="h-4 w-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart className="h-4 w-4 mr-2" />
              Stats
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-0">
          <TabsContent value="progress">
            {showOverallProgress && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Overall Progress</h3>
                  <span className="text-sm text-muted-foreground">
                    {overallProgress.completed}/{overallProgress.total} tutorials
                  </span>
                </div>
                <Progress value={overallProgress.percentage} className="h-2" />
                <div className="flex justify-between mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-xs text-muted-foreground">Completed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-muted"></div>
                    <span className="text-xs text-muted-foreground">Remaining</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Category Progress</h3>
              
              <div className="grid gap-4">
                {categoryProgress.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
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
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Completion
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold">{completedTutorials.length}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold">{inProgressTutorials.length}</div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold">{completionRate}%</div>
                    <div className="text-xs text-muted-foreground">Completion Rate</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold">{overallProgress.total}</div>
                    <div className="text-xs text-muted-foreground">Total Tutorials</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  Time Spent
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-lg font-bold">{timeSpent.today}</div>
                    <div className="text-xs text-muted-foreground">Today</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-lg font-bold">{timeSpent.week}</div>
                    <div className="text-xs text-muted-foreground">This Week</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-lg font-bold">{timeSpent.month}</div>
                    <div className="text-xs text-muted-foreground">This Month</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-lg font-bold">{timeSpent.total}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4 text-amber-500" />
                  Learning Streak
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold">{streakData.current}</div>
                    <div className="text-xs text-muted-foreground">Current Streak</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold">{streakData.longest}</div>
                    <div className="text-xs text-muted-foreground">Longest Streak</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold">{streakData.total}</div>
                    <div className="text-xs text-muted-foreground">Total Days</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
} 