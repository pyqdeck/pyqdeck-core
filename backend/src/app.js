/**
 * PyqDeck - Next-Generation Exam Learning Platform
 *
 * @copyright (c) 2026 PyqDeck. All rights reserved.
 * @license Proprietary
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by the PyqDeck Team <admin@pyqdeck.in>
 */

import express from 'express';
import dns from 'dns';

// Fix Node 20 native fetch bugs with IPv6 / external APIs
dns.setDefaultResultOrder('ipv4first');

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';
import swaggerUi from 'swagger-ui-express';
import healthRoutes from './routes/health.js';
import webhookRoutes from './routes/webhook.js';
import universityRoutes from './routes/universities.js';
import subjectRoutes from './routes/subjects.js';
import paperRoutes from './routes/papers.js';
import branchRoutes from './routes/branches.js';
import semesterRoutes from './routes/semesters.js';
import subjectOfferingRoutes from './routes/subjectOfferings.js';
import questionRoutes from './routes/questions.js';
import paperQuestionRoutes from './routes/paperQuestions.js';
import bookmarkRoutes from './routes/bookmarks.js';
import userRoutes from './routes/users.js';
import searchRoutes from './routes/search.js';
import syllabusRoutes from './routes/syllabus.js';
import seoRoutes from './routes/seo.js';
import analyticsRoutes from './routes/analytics.js';
import maintenanceRoutes from './routes/maintenance.js';
import platformConfigRoutes from './routes/platformConfig.js';
import { syncUser } from './middlewares/syncUser.middleware.js';
import errorHandler from './middlewares/errorHandler.js';
import * as Sentry from '@sentry/node';
import { createRouteHandler } from 'uploadthing/express';
import { uploadRouter } from './utils/uploadthing.js';
import { swaggerSpec } from './docs/swagger.js';

const app = express();

// Sentry error handler (Must be after app is initialized)
if (process.env.SENTRY_DSN) {
  Sentry.setupExpressErrorHandler(app);
}

// Security middlewares
app.use(helmet());
app.use(cors());

// Logging
app.use(morgan('dev'));

// Webhook routes (must be before express.json() — svix needs the raw body)
app.use('/api/v1/webhooks', webhookRoutes);

// Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API documentation (OpenAPI 3) — use for SDK generation (orval, openapi-generator, etc.)
app.get('/api-docs/openapi.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Clerk Middleware
app.use(clerkMiddleware());
app.use(syncUser);

// Routes
app.use('/api/v1', healthRoutes);
app.use('/api/v1/universities', universityRoutes);
app.use('/api/v1/branches', branchRoutes); // Global routes
app.use('/api/v1/universities/:universityId/branches', branchRoutes); // Nested routes
app.use('/api/v1/semesters', semesterRoutes); // Global routes
app.use('/api/v1/branches/:branchId/semesters', semesterRoutes); // Nested routes
app.use('/api/v1/subjects', subjectRoutes);
app.use('/api/v1/subject-offerings', subjectOfferingRoutes);
app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/papers', paperRoutes);
app.use('/api/v1/papers/:paperId/questions', paperQuestionRoutes);
app.use('/api/v1/bookmarks', bookmarkRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1', syllabusRoutes);
app.use('/api/v1/seo', seoRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/maintenance', maintenanceRoutes);
app.use('/api/v1/platform-config', platformConfigRoutes);
app.use(
  '/api/v1/uploadthing',
  createRouteHandler({
    router: uploadRouter,
  })
);

// Error handling
app.use(errorHandler);

export default app;
