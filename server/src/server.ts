import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db';
import { router } from './Routes/projectRoutes';

connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/projects', router);

export default app;
