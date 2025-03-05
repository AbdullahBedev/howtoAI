import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

const GPT4CheatSheet = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">GPT-4 Prompt Engineering Cheat Sheet</h1>
        <p className="text-muted-foreground">A comprehensive guide to optimizing prompts for OpenAI's GPT-4</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">System Message Optimization</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Purpose</h3>
            <p>The system message sets the behavior, personality, and constraints for the AI. It's the most powerful way to control GPT-4's responses.</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h4 className="font-medium mb-2">Example System Messages</h4>
            <div className="space-y-2">
              <div className="bg-background p-3 rounded border">
                <div className="font-mono text-sm">You are an expert software developer specializing in React and TypeScript. Provide detailed, production-ready code with best practices. Include comments explaining complex logic.</div>
              </div>
              <div className="bg-background p-3 rounded border">
                <div className="font-mono text-sm">You are a concise writing assistant. Rewrite text to be clear and brief while preserving all key information. Aim to reduce word count by at least 30%.</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium">Best Practices</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Be specific about expertise areas and knowledge boundaries</li>
              <li>Define output format and style expectations clearly</li>
              <li>Include constraints and limitations (e.g., "Keep responses under 100 words")</li>
              <li>Specify the audience level (e.g., "Explain as if to a 10-year-old")</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Parameter Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Temperature</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-semibold">0.0-0.3:</span> Factual, deterministic responses</li>
              <li><span className="font-semibold">0.4-0.7:</span> Balanced creativity and accuracy</li>
              <li><span className="font-semibold">0.8-1.0:</span> Maximum creativity and variation</li>
            </ul>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Top P (Nucleus Sampling)</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-semibold">0.1-0.5:</span> More focused, less random</li>
              <li><span className="font-semibold">0.5-0.9:</span> Balanced diversity</li>
              <li><span className="font-semibold">1.0:</span> Consider all possibilities</li>
            </ul>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Max Tokens</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Set based on expected response length</li>
              <li>For detailed responses: 1000-2000</li>
              <li>For concise answers: 100-300</li>
            </ul>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Frequency/Presence Penalty</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-semibold">0.0:</span> No repetition control</li>
              <li><span className="font-semibold">0.5-1.0:</span> Reduce repetition</li>
              <li><span className="font-semibold">1.5-2.0:</span> Strong diversity emphasis</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Advanced Techniques for GPT-4</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Chain-of-Thought Prompting</h3>
            <p className="mb-2">Ask GPT-4 to break down its reasoning step by step.</p>
            <div className="bg-background p-3 rounded border">
              <div className="font-mono text-sm">Solve this problem step by step, showing your reasoning at each stage: [problem]</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium">Few-Shot Learning</h3>
            <p className="mb-2">Provide examples of desired input-output pairs.</p>
            <div className="bg-background p-3 rounded border">
              <div className="font-mono text-sm">
                Input: Convert this sentence to past tense: "I walk to the store."<br/>
                Output: I walked to the store.<br/><br/>
                Input: Convert this sentence to past tense: "She runs quickly."<br/>
                Output: She ran quickly.<br/><br/>
                Input: Convert this sentence to past tense: "They build a house."<br/>
                Output:
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium">Role-Based Prompting</h3>
            <p className="mb-2">Assign specific roles to guide expertise and perspective.</p>
            <div className="bg-background p-3 rounded border">
              <div className="font-mono text-sm">
                Act as an experienced UX designer reviewing this website mockup. Identify usability issues and suggest improvements based on established UX principles.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Troubleshooting Common Issues</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Hallucinations</h3>
              <p className="mb-2">When GPT-4 generates incorrect information:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Add "Only state facts you're certain about"</li>
                <li>Request citations or sources</li>
                <li>Ask model to indicate confidence level</li>
              </ul>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Verbosity</h3>
              <p className="mb-2">When responses are too long:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Specify word/character limits</li>
                <li>Request bullet points instead of paragraphs</li>
                <li>Add "Be concise" to system message</li>
              </ul>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Refusals</h3>
              <p className="mb-2">When GPT-4 declines to answer:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Clarify legitimate use case</li>
                <li>Reframe as hypothetical or educational</li>
                <li>Break complex tasks into smaller steps</li>
              </ul>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Inconsistency</h3>
              <p className="mb-2">When responses vary too much:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Lower temperature (0.0-0.3)</li>
                <li>Use more detailed system messages</li>
                <li>Provide explicit formatting templates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2024 How-to-AI. All rights reserved.</p>
        <p>For educational purposes only. Updated for GPT-4 as of March 2024.</p>
      </div>
    </div>
  );
};

export default GPT4CheatSheet; 