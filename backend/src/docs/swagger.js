import swaggerJsdoc from 'swagger-jsdoc';
import config from '../config/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PYQDeck API Explorer',
      version: '1.0.0',
      description: `
Welcome to the official **PYQDeck API Documentation**.

This API powers the PYQDeck platform, enabling users to access, bookmark, and study Previous Year Questions (PYQs) efficiently.

### 🔑 Authentication
Most endpoints require a valid Clerk JWT token. Include it in the header:
\`Authorization: Bearer <your_clerk_token>\`

### 📊 Rate Limiting
- **Standard API**: ${config.rateLimit.max} requests per ${
        config.rateLimit.windowMs / 60000
      } minutes.
- **Webhooks**: 50 requests per 15 minutes.
`,
      contact: {
        name: 'PYQDeck Support',
        url: `${config.appUrl}/support`,
        email: 'noreply@example.com',
      },
    },
    servers: [
      {
        url: config.apiUrl,
        description:
          config.nodeEnv === 'production'
            ? 'Production server'
            : 'Development server',
      },
    ],
    tags: [
      { name: 'System', description: 'Health and operational status' },
      {
        name: 'External Integrations',
        description: 'Webhooks and third-party callbacks',
      },
      { name: 'Universities', description: 'University directory' },
      { name: 'Branches', description: 'Branches under a university' },
      { name: 'Semesters', description: 'Semesters under a branch' },
      { name: 'Subjects', description: 'Academic subjects' },
      {
        name: 'SubjectOfferings',
        description: 'Subject instances per term (slugs, syllabus links)',
      },
      {
        name: 'Syllabus',
        description: 'Modules, topics, and syllabus-scoped questions',
      },
      { name: 'Questions', description: 'Question bank and search' },
      { name: 'Papers', description: 'Exam papers' },
      { name: 'PaperQuestions', description: 'Questions linked to a paper' },
      {
        name: 'Bookmarks',
        description: 'Saved questions and papers',
      },
      { name: 'Users', description: 'Current user profile' },
      { name: 'Search', description: 'Global search' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        BadRequest: {
          description: 'The request was invalid or could not be understood.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        Unauthorized: {
          description:
            'Authentication is required and has failed or has not yet been provided.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        Forbidden: {
          description:
            'The server understood the request but refuses to authorize it.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        NotFound: {
          description: 'The requested resource could not be found.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        TooManyRequests: {
          description:
            'The user has sent too many requests in a given amount of time.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        InternalServerError: {
          description: 'An unexpected error occurred on the server.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string', example: 'Detailed error message here' },
            code: { type: 'integer', example: 400 },
          },
        },
        Pagination: {
          type: 'object',
          properties: {
            total: { type: 'integer', example: 100 },
            limit: { type: 'integer', example: 20 },
            page: { type: 'integer', example: 1 },
            totalPages: { type: 'integer', example: 5 },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' },
            message: { type: 'string', example: 'Operation successful' },
            code: { type: 'integer', example: 200 },
          },
        },
      },
    },
  },
  // Paths to files containing OpenAPI definitions
  apis: [
    path.resolve(__dirname, '../routes/*.js'),
    path.resolve(__dirname, '../models/*.js'),
  ],
};

const spec = swaggerJsdoc(options);

export const swaggerSpec = spec;
