# GPT-4 Prompt Engineering Cheat Sheet

A comprehensive guide to optimizing prompts for OpenAI's GPT-4

## System Message Optimization

### Purpose
The system message sets the behavior, personality, and constraints for the AI. It's the most powerful way to control GPT-4's responses.

### Example System Messages
```
You are an expert software developer specializing in React and TypeScript. Provide detailed, production-ready code with best practices. Include comments explaining complex logic.
```

```
You are a concise writing assistant. Rewrite text to be clear and brief while preserving all key information. Aim to reduce word count by at least 30%.
```

### Best Practices
- Be specific about expertise areas and knowledge boundaries
- Define output format and style expectations clearly
- Include constraints and limitations (e.g., "Keep responses under 100 words")
- Specify the audience level (e.g., "Explain as if to a 10-year-old")

## Parameter Recommendations

### Temperature
- **0.0-0.3:** Factual, deterministic responses
- **0.4-0.7:** Balanced creativity and accuracy
- **0.8-1.0:** Maximum creativity and variation

### Top P (Nucleus Sampling)
- **0.1-0.5:** More focused, less random
- **0.5-0.9:** Balanced diversity
- **1.0:** Consider all possibilities

### Max Tokens
- Set based on expected response length
- For detailed responses: 1000-2000
- For concise answers: 100-300

### Frequency/Presence Penalty
- **0.0:** No repetition control
- **0.5-1.0:** Reduce repetition
- **1.5-2.0:** Strong diversity emphasis

## Advanced Techniques for GPT-4

### Chain-of-Thought Prompting
Ask GPT-4 to break down its reasoning step by step.

```
Solve this problem step by step, showing your reasoning at each stage: [problem]
```

### Few-Shot Learning
Provide examples of desired input-output pairs.

```
Input: Convert this sentence to past tense: "I walk to the store."
Output: I walked to the store.

Input: Convert this sentence to past tense: "She runs quickly."
Output: She ran quickly.

Input: Convert this sentence to past tense: "They build a house."
Output:
```

### Role-Based Prompting
Assign specific roles to guide expertise and perspective.

```
Act as an experienced UX designer reviewing this website mockup. Identify usability issues and suggest improvements based on established UX principles.
```

## Troubleshooting Common Issues

### Hallucinations
When GPT-4 generates incorrect information:
- Add "Only state facts you're certain about"
- Request citations or sources
- Ask model to indicate confidence level

### Verbosity
When responses are too long:
- Specify word/character limits
- Request bullet points instead of paragraphs
- Add "Be concise" to system message

### Refusals
When GPT-4 declines to answer:
- Clarify legitimate use case
- Reframe as hypothetical or educational
- Break complex tasks into smaller steps

### Inconsistency
When responses vary too much:
- Lower temperature (0.0-0.3)
- Use more detailed system messages
- Provide explicit formatting templates

---

© 2024 How-to-AI. All rights reserved.
For educational purposes only. Updated for GPT-4 as of March 2024. 