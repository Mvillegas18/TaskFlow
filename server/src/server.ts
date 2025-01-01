import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db';
import { router } from './Routes/projectRoutes';

connectDB();

const app = express();
app.use('/api/projects', router);

export default app;
