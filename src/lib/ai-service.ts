import { GoogleGenerativeAI, GenerativeModel, GenerationConfig } from '@google/generative-ai';
import { logger } from './logging';
import { analytics } from './analytics';

// Types for AI responses
export interface TextGenerationResponse {
  text: string;
  modelUsed: string;
  tokenCount: number;
}

export interface ImageGenerationResponse {
  imageUrl: string;
  modelUsed: string;
}

export interface CodeGenerationResponse {
  code: string;
  language: string;
  modelUsed: string;
  tokenCount: number;
}

/**
 * Service for interacting with AI models (Gemini)
 */
export class AIService {
  private apiKey: string;
  private defaultModel: string;
  private genAI: GoogleGenerativeAI;
  private usage: Map<string, number> = new Map();
  
  constructor(apiKey: string, defaultModel = 'gemini-1.5-flash') {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || 'demo-key';
    this.defaultModel = defaultModel;
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }
  
  /**
   * Generate text using the AI model
   */
  async generateText(
    prompt: string, 
    options?: {
      userId?: string;
      model?: string;
      maxTokens?: number;
      temperature?: number;
    }
  ): Promise<TextGenerationResponse> {
    try {
      const model = options?.model || this.defaultModel;
      const maxTokens = options?.maxTokens || 1000;
      const temperature = options?.temperature || 0.7;
      const userId = options?.userId;

      // Configure the generative model
      const generationConfig: GenerationConfig = {
        maxOutputTokens: maxTokens,
        temperature: temperature,
      };

      // Get the model
      const genModel = this.genAI.getGenerativeModel({ 
        model, 
        generationConfig 
      });

      // Generate content
      const result = await genModel.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // Estimate token count (for usage tracking)
      // Gemini doesn't directly provide token counts, so we'll estimate based on characters
      // ~4 characters per token is a rough estimate
      const estimatedTokenCount = Math.ceil(prompt.length / 4) + Math.ceil(text.length / 4);
      
      // Track usage if user ID is provided
      if (userId) {
        const currentUsage = this.usage.get(userId) || 0;
        this.usage.set(userId, currentUsage + estimatedTokenCount);
      }

      logger.info('AI text generated successfully', {
        model,
        estimatedTokenCount,
        userId,
        promptLength: prompt.length,
      });

      return {
        text,
        modelUsed: model,
        tokenCount: estimatedTokenCount,
      };
    } catch (error) {
      logger.error('Failed to generate AI text', { error, prompt });
      throw new Error('Failed to generate AI text: ' + (error instanceof Error ? error.message : String(error)));
    }
  }
  
  /**
   * Generate image using the AI model (Gemini)
   */
  async generateImage(
    prompt: string,
    options?: {
      userId?: string;
      model?: string;
      size?: '256x256' | '512x512' | '1024x1024';
    }
  ): Promise<ImageGenerationResponse> {
    try {
      // Use gemini-1.5-pro for image generation
      const model = 'gemini-1.5-pro';
      const userId = options?.userId;
      const size = options?.size || '512x512';

      // For Gemini we need to use text-to-text for image prompts
      // We'll append size information to the prompt
      const enhancedPrompt = `Generate a detailed image based on this description. Resolution: ${size}. Description: ${prompt}`;
      
      // Get the model - we use Pro for image generation capabilities
      const genModel = this.genAI.getGenerativeModel({ model });
      
      // Generate content
      const result = await genModel.generateContent(enhancedPrompt);
      const response = result.response;
      const responseText = response.text();
      
      // Since Gemini doesn't directly generate images via API, we'd typically:
      // 1. Generate a description or markdown with image details
      // 2. Use another service to render the image
      // 3. Return a URL to that image
      
      // For this implementation, we'll return a placeholder URL that indicates
      // this would be where an image would be generated
      const imageUrl = `https://image-placeholder.com/generated?prompt=${encodeURIComponent(prompt)}&size=${size}`;
      
      // Log the process
      logger.info('AI image prompt processed', {
        model,
        userId,
        size,
        promptLength: prompt.length,
      });

      return {
        imageUrl,
        modelUsed: model,
      };
    } catch (error) {
      logger.error('Failed to process image generation prompt', { error, prompt });
      throw new Error('Failed to process image generation: ' + (error instanceof Error ? error.message : String(error)));
    }
  }
  
  /**
   * Generate code using the AI model
   */
  async generateCode(
    prompt: string,
    options?: {
      userId?: string;
      model?: string;
      language?: string;
      maxTokens?: number;
    }
  ): Promise<CodeGenerationResponse> {
    try {
      const model = options?.model || this.defaultModel;
      const language = options?.language || this.detectLanguage(prompt);
      const maxTokens = options?.maxTokens || 2000;
      const userId = options?.userId;

      // Enhance the prompt to specifically request code
      const enhancedPrompt = `Generate ${language} code that ${prompt}. 
      Please provide only the code without explanations.
      Make sure the code is functional, well-structured, and follows best practices.`;

      // Configure the generative model
      const generationConfig: GenerationConfig = {
        maxOutputTokens: maxTokens,
        temperature: 0.2, // Lower temperature for more deterministic code generation
      };

      // Get the model
      const genModel = this.genAI.getGenerativeModel({ 
        model, 
        generationConfig 
      });

      // Generate content
      const result = await genModel.generateContent(enhancedPrompt);
      const response = result.response;
      const text = response.text();

      // Extract code from the response (remove markdown code blocks if present)
      let code = text;
      if (code.startsWith('```')) {
        const codeBlockRegex = /```(?:\w+)?\n([\s\S]+?)```/;
        const match = code.match(codeBlockRegex);
        code = match ? match[1].trim() : code;
      }

      // Estimate token count (for usage tracking)
      const estimatedTokenCount = Math.ceil(enhancedPrompt.length / 4) + Math.ceil(code.length / 4);
      
      // Track usage if user ID is provided
      if (userId) {
        const currentUsage = this.usage.get(userId) || 0;
        this.usage.set(userId, currentUsage + estimatedTokenCount);
      }

      logger.info('AI code generated successfully', {
        model,
        language,
        estimatedTokenCount,
        userId,
        promptLength: prompt.length,
      });

      return {
        code,
        language,
        modelUsed: model,
        tokenCount: estimatedTokenCount,
      };
    } catch (error) {
      logger.error('Failed to generate code', { error, prompt });
      throw new Error('Failed to generate code: ' + (error instanceof Error ? error.message : String(error)));
    }
  }
  
  /**
   * Get usage statistics
   */
  getUsage() {
    return Object.fromEntries(this.usage);
  }
  
  /**
   * Detect the programming language from the prompt
   */
  private detectLanguage(prompt: string): string {
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes('javascript') || promptLower.includes('js')) return 'javascript';
    if (promptLower.includes('typescript') || promptLower.includes('ts')) return 'typescript';
    if (promptLower.includes('python') || promptLower.includes('py')) return 'python';
    if (promptLower.includes('java')) return 'java';
    if (promptLower.includes('c#') || promptLower.includes('csharp')) return 'csharp';
    if (promptLower.includes('php')) return 'php';
    if (promptLower.includes('ruby')) return 'ruby';
    if (promptLower.includes('go') || promptLower.includes('golang')) return 'go';
    if (promptLower.includes('rust')) return 'rust';
    if (promptLower.includes('swift')) return 'swift';
    if (promptLower.includes('kotlin')) return 'kotlin';
    if (promptLower.includes('sql')) return 'sql';
    if (promptLower.includes('html')) return 'html';
    if (promptLower.includes('css')) return 'css';
    
    // Default to JavaScript/TypeScript for web context
    return 'typescript';
  }
}

// Factory function to create AIService instance
export const aiService = (apiKey?: string) => new AIService(apiKey || ''); 