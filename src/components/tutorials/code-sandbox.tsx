'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  RefreshCw, 
  Copy, 
  Check, 
  Download, 
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileCode2 
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

// Import Prism.js for syntax highlighting
import Prism from 'prismjs';
// Import basic languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';

interface CodeSandboxProps {
  initialCode: string;
  language: 'javascript' | 'python' | 'typescript' | 'jsx' | 'tsx';
  title?: string;
  description?: string;
  defaultOutput?: string;
  readOnly?: boolean;
  solutionCode?: string; // Optional solution code to reveal
}

export function CodeSandbox({
  initialCode,
  language,
  title = 'Code Sandbox',
  description,
  defaultOutput = 'Run the code to see the output',
  readOnly = false,
  solutionCode
}: CodeSandboxProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(defaultOutput);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('code');
  const [copied, setCopied] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showingSolution, setShowingSolution] = useState(false);
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  
  // Highlight code using Prism.js
  useEffect(() => {
    if (preRef.current) {
      Prism.highlightElement(preRef.current);
    }
  }, [code, activeTab]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Enter or Cmd+Enter to run code
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!readOnly) {
          handleRun();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [readOnly]);

  // Sync textarea and highlighted code
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  // Reset code to initial state
  const handleReset = () => {
    setCode(initialCode);
    setOutput(defaultOutput);
    setHasError(false);
    setShowingSolution(false);
  };

  // Copy code to clipboard
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Export code to a file
  const handleExport = () => {
    const fileExtension = language === 'python' ? '.py' : 
                           language === 'javascript' ? '.js' : 
                           language === 'typescript' ? '.ts' : 
                           language === 'jsx' ? '.jsx' : '.tsx';
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code-example${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Show solution code
  const handleShowSolution = () => {
    if (showingSolution) {
      setCode(initialCode);
    } else {
      setCode(solutionCode || initialCode);
    }
    setShowingSolution(!showingSolution);
  };

  // Simulate code execution
  const handleRun = () => {
    setIsRunning(true);
    setActiveTab('output');
    setHasError(false);
    
    // Simulate execution delay
    setTimeout(() => {
      try {
        let result;
        
        // This is a simplified simulation - in a real implementation,
        // you would use a secure sandboxed environment or API
        if (language === 'javascript' || language === 'typescript' || language === 'jsx' || language === 'tsx') {
          // For demo purposes only - never use eval in production!
          // This is just to simulate execution for the demo
          result = `// Simulated output for ${language}:\n`;
          
          if (code.includes('console.log')) {
            const logMatches = code.match(/console\.log\((.*?)\)/g);
            if (logMatches) {
              result += logMatches.map(match => {
                const content = match.substring(12, match.length - 1);
                return `> ${content}`;
              }).join('\n');
            } else {
              result += '> Code executed successfully';
            }
          } else {
            result += '> Code executed successfully';
          }
          
          // Simulate errors - detect syntax errors
          if (code.includes('{') && !code.includes('}')) {
            throw new Error('SyntaxError: Missing closing curly brace');
          }
          if (code.includes('(') && !code.includes(')')) {
            throw new Error('SyntaxError: Missing closing parenthesis');
          }
        } else if (language === 'python') {
          result = `# Simulated output for Python:\n`;
          
          if (code.includes('print(')) {
            const printMatches = code.match(/print\((.*?)\)/g);
            if (printMatches) {
              result += printMatches.map(match => {
                const content = match.substring(6, match.length - 1);
                return `> ${content}`;
              }).join('\n');
            } else {
              result += '> Code executed successfully';
            }
          } else {
            result += '> Code executed successfully';
          }
          
          // Simulate Python-specific errors
          if (code.includes('def') && !code.includes(':')) {
            throw new Error('SyntaxError: Missing colon after function definition');
          }
          if ((code.includes('if') || code.includes('for') || code.includes('while')) && !code.includes(':')) {
            throw new Error('SyntaxError: Missing colon after conditional or loop statement');
          }
        }
        
        setOutput(result || 'Execution completed');
      } catch (error) {
        setHasError(true);
        setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setIsRunning(false);
      }
    }, 1000);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-background shadow-sm">
      {title && (
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between px-4 border-b">
          <TabsList className="h-12">
            <TabsTrigger value="code" className="px-4">Code</TabsTrigger>
            <TabsTrigger value="output" className="px-4">Output</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              title="Copy code"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleExport}
              title="Export code"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              title="Reset code"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleRun}
              disabled={isRunning || readOnly}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              Run
            </Button>
          </div>
        </div>
        
        <TabsContent value="code" className="m-0">
          <div className="relative min-h-[300px] font-mono text-sm">
            <pre
              ref={preRef}
              className="absolute top-0 left-0 w-full h-full p-4 m-0 bg-background overflow-auto pointer-events-none"
              aria-hidden="true"
            >
              <code className={`language-${language}`}>{code}</code>
            </pre>
            <textarea
              ref={codeRef}
              value={code}
              onChange={handleCodeChange}
              className="absolute top-0 left-0 w-full h-full min-h-[300px] p-4 font-mono text-sm bg-transparent text-transparent caret-black dark:caret-white resize-none focus:outline-none"
              style={{ caretColor: 'currentColor' }}
              spellCheck="false"
              readOnly={readOnly}
            />
          </div>
          
          {solutionCode && (
            <div className="p-2 border-t">
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <FileCode2 className="h-4 w-4" />
                      {showingSolution ? 'Hide Solution' : 'Show Solution'}
                    </span>
                    {showingSolution ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 bg-muted/30 rounded-md mt-2">
                    <pre className="text-sm overflow-auto">
                      <code className={`language-${language}`}>
                        {solutionCode}
                      </code>
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShowSolution}
                      className="mt-4"
                    >
                      {showingSolution ? 'Revert to Initial Code' : 'Apply Solution Code'}
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="output" className="m-0">
          <div className={cn(
            "min-h-[300px] p-4 font-mono text-sm whitespace-pre-wrap",
            hasError ? "bg-red-50 dark:bg-red-950/10 text-red-500" : "bg-muted/30"
          )}>
            {isRunning ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span>Running...</span>
              </div>
            ) : hasError ? (
              <div>
                <div className="flex items-center gap-2 mb-2 text-red-500">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-semibold">Execution Error</span>
                </div>
                {output}
              </div>
            ) : (
              output
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="px-4 py-2 border-t text-xs text-muted-foreground">
        <span>Tip: Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl</kbd>+<kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> to run code</span>
      </div>
    </div>
  );
} 