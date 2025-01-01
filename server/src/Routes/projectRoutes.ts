import { Router } from 'express';
import { ProjectController } from '../controllers/ProjectController';

export const router = Router();

router.post('/', ProjectController.createProject);
router.get('/', ProjectController.getAllProjects);
