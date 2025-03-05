import swaggerJSDoc from 'swagger-jsdoc';

/**
 * Swagger definition for the How-to-AI API
 */
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'How-to-AI API',
    version: '1.0.0',
    description: 'RESTful API for the How-to-AI platform',
    license: {
      name: 'Private',
    },
    contact: {
      name: 'API Support',
      email: 'support@howtoai.com',
    },
  },
  servers: [
    {
      url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      description: 'Development Server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
          },
          details: {
            type: 'array',
            items: {
              type: 'object',
            },
          },
        },
      },
      AITextRequest: {
        type: 'object',
        required: ['prompt'],
        properties: {
          prompt: {
            type: 'string',
            minLength: 3,
            maxLength: 5000,
          },
          model: {
            type: 'string',
          },
          maxTokens: {
            type: 'integer',
            minimum: 1,
            maximum: 4000,
          },
          temperature: {
            type: 'number',
            minimum: 0,
            maximum: 2,
          },
        },
      },
      AITextResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
          },
          text: {
            type: 'string',
          },
          modelUsed: {
            type: 'string',
          },
          tokenCount: {
            type: 'integer',
          },
        },
      },
      AIImageRequest: {
        type: 'object',
        required: ['prompt'],
        properties: {
          prompt: {
            type: 'string',
            minLength: 3,
            maxLength: 1000,
          },
          model: {
            type: 'string',
          },
          size: {
            type: 'string',
            enum: ['256x256', '512x512', '1024x1024'],
          },
        },
      },
      AIImageResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
          },
          imageUrl: {
            type: 'string',
          },
          modelUsed: {
            type: 'string',
          },
        },
      },
      AICodeRequest: {
        type: 'object',
        required: ['prompt'],
        properties: {
          prompt: {
            type: 'string',
            minLength: 3,
            maxLength: 2000,
          },
          model: {
            type: 'string',
          },
          language: {
            type: 'string',
          },
          maxTokens: {
            type: 'integer',
            minimum: 1,
            maximum: 4000,
          },
        },
      },
      AICodeResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
          },
          code: {
            type: 'string',
          },
          language: {
            type: 'string',
          },
          modelUsed: {
            type: 'string',
          },
          tokenCount: {
            type: 'integer',
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// Options for the swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: [
    './src/app/api/**/route.ts',
    './src/app/api/**/*/route.ts',
  ],
};

// Initialize swagger-jsdoc
export const swaggerSpec = swaggerJSDoc(options); 