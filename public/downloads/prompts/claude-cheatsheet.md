# Claude Prompt Engineering Cheat Sheet

A comprehensive guide to optimizing prompts for Anthropic's Claude models

## Claude's Unique Capabilities

### Constitutional AI
Claude is built with Constitutional AI principles, making it:
- More aligned with human values
- Better at following complex instructions
- Resistant to generating harmful content
- Transparent about limitations

### XML Formatting
Claude excels at understanding and generating structured content with XML tags.

```
<instructions>
  Analyze the following text and identify the main themes, key arguments, and any logical fallacies.
  Format your response with clear headings and bullet points.
</instructions>

<text>
  [Your text here]
</text>
```

### Long Context Window
Claude Opus supports up to 200,000 tokens, enabling:
- Analysis of entire documents
- Processing multiple documents together
- Maintaining conversation history
- Complex multi-step reasoning

## Prompt Structure Best Practices

### Clear Delineation
Use formatting to separate different parts of your prompt:

```
CONTEXT:
[Provide relevant background information here]

TASK:
[Clearly state what you want Claude to do]

FORMAT:
[Specify how you want the response structured]

CONSTRAINTS:
[Add any limitations or requirements]
```

### System Prompts
While Claude doesn't have a dedicated system message like GPT-4, you can simulate one:

```
You are an expert data scientist specializing in statistical analysis and data visualization. 
You communicate complex concepts clearly and provide actionable insights.

TASK: [your request here]
```

### XML Tagging for Roles
Use XML tags to define roles and sections:

```
<role>
You are a professional editor with expertise in academic writing.
</role>

<input>
[Text to be edited]
</input>

<instructions>
Edit the above text to improve clarity, fix grammatical errors, and ensure it follows APA style guidelines.
</instructions>
```

## Advanced Techniques for Claude

### Tool Use Framework
Claude can simulate tool use with structured prompting:

```
AVAILABLE TOOLS:
1. Calculator - Performs mathematical calculations
2. Search - Retrieves information from a knowledge base
3. Translator - Translates text between languages

TASK: [description of task]

To use a tool, use the following format:
<tool_use>
Tool: [tool name]
Input: [what to input to the tool]
</tool_use>

Then simulate the tool's response:
<tool_response>
[simulated response from the tool]
</tool_response>

Then continue with your analysis.
```

### Multi-Step Reasoning
Guide Claude through complex reasoning:

```
To solve this problem, please follow these steps:
1. Identify the key variables and constraints
2. Set up the relevant equations
3. Solve the equations step by step
4. Verify your solution
5. Explain the significance of the result

Problem: [your problem here]
```

### Persona-Based Responses
Create specific personas for specialized knowledge:

```
Please respond to my question from the perspective of three different experts:

<expert type="Physicist">
[Response from physics perspective]
</expert>

<expert type="Philosopher">
[Response from philosophical perspective]
</expert>

<expert type="Historian">
[Response from historical perspective]
</expert>

Question: [your question]
```

## Troubleshooting Common Issues

### Verbosity
When Claude is too wordy:
- Request "concise responses only"
- Specify a word or character limit
- Ask for bullet points instead of paragraphs
- Use "Please be direct and to the point"

### Refusals
When Claude declines to help:
- Clarify the educational or legitimate purpose
- Reframe as a hypothetical scenario
- Break complex tasks into smaller steps
- Specify that you're seeking general information, not advice

### Hallucinations
When Claude provides incorrect information:
- Ask it to only state facts it's confident about
- Request that it indicates uncertainty explicitly
- Ask for reasoning and sources for claims
- Use "If you don't know, please say so"

### Formatting Issues
When output formatting is inconsistent:
- Provide explicit examples of desired format
- Use XML tags to structure the response
- Number the sections you want included
- Create a template for Claude to fill in

---

© 2024 How-to-AI. All rights reserved.
For educational purposes only. Updated for Claude models as of March 2024. 