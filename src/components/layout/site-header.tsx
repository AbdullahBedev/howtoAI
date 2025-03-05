"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Sparkles, User, Wand2, Users, Bot, BookOpen, Gamepad2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    // Redirect to home page after logout
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-[#f85032]" />
          <span className="text-xl font-bold bg-gradient-to-r from-[#f85032] via-[#e73827] to-secondary bg-clip-text text-transparent">How-to-AI</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/tutorials" 
            className={`text-sm font-medium hover:text-[#f85032] transition-colors flex items-center gap-1 ${
              isActive("/tutorials") ? "text-[#f85032]" : ""
            }`}
          >
            <BookOpen className={`h-4 w-4 ${isActive("/tutorials") ? "text-[#f85032]" : ""}`} />
            Tutorials
          </Link>
          
          <Link 
            href="/prompts" 
            className={`text-sm font-medium hover:text-[#f85032] transition-colors flex items-center gap-1 ${
              isActive("/prompts") ? "text-[#f85032]" : ""
            }`}
          >
            <Wand2 className={`h-4 w-4 ${isActive("/prompts") ? "text-[#f85032]" : ""}`} />
            Prompts
          </Link>
          
          <Link 
            href="/ai-agent" 
            className={`text-sm font-medium hover:text-[#f85032] transition-colors flex items-center gap-1 ${
              isActive("/ai-agent") ? "text-[#f85032]" : ""
            }`}
          >
            <Bot className={`h-4 w-4 ${isActive("/ai-agent") ? "text-[#f85032]" : ""}`} />
            AI Agent
          </Link>
          
          <Link 
            href="/playground" 
            className={`text-sm font-medium hover:text-[#f85032] transition-colors flex items-center gap-1 ${
              isActive("/playground") ? "text-[#f85032]" : ""
            }`}
          >
            <Gamepad2 className={`h-4 w-4 ${isActive("/playground") ? "text-[#f85032]" : ""}`} />
            Playground
          </Link>
          
          <Link 
            href="/community" 
            className={`text-sm font-medium hover:text-[#f85032] transition-colors flex items-center gap-1 ${
              isActive("/community") ? "text-[#f85032]" : ""
            }`}
          >
            <Users className={`h-4 w-4 ${isActive("/community") ? "text-[#f85032]" : ""}`} />
            Community
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="shadow-sm hover:text-[#f85032] hover:border-[#f85032] transition-colors">
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:text-[#f85032] hover:bg-[#f85032]/10">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="hover:text-[#f85032] cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="hover:text-[#f85032] cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/tutorials" className="hover:text-[#f85032] cursor-pointer">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Tutorials
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/prompts" className="hover:text-[#f85032] cursor-pointer">
                      <Wand2 className="mr-2 h-4 w-4" />
                      Prompts
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/ai-agent" className="hover:text-[#f85032] cursor-pointer">
                      <Bot className="mr-2 h-4 w-4" />
                      AI Agent
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm" className="shadow-sm hover:text-[#f85032] hover:border-[#f85032] transition-colors">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="shadow-md bg-gradient-to-r from-[#f85032] to-[#e73827] hover:opacity-90">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 