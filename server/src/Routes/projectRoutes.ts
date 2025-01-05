import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { TaskController } from '../controllers/TaskController';
import { validateProjectExist } from '../middleware/project';
import { handleInputErrors } from '../middleware/validation';

export const router = Router();

router.post(
	'/',
	body('projectName')
		.notEmpty()
		.withMessage('El nombre del proyecto es obligatorio'),
	body('clientName')
		.notEmpty()
		.withMessage('El nombre del cliente es obligatorio'),
	body('description')
		.notEmpty()
		.withMessage('La descripcion del proyecto es obligatorio'),
	handleInputErrors,

	ProjectController.createProject
);

router.get('/', ProjectController.getAllProjects);

router.get(
	'/:id',
	param('id').isMongoId().withMessage('ID no valido'),
	handleInputErrors,
	ProjectController.getProyectById
);

router.put(
	'/:id',
	param('id').isMongoId().withMessage('ID no valido'),
	body('projectName')
		.notEmpty()
		.withMessage('El nombre del proyecto es obligatorio'),
	body('clientName')
		.notEmpty()
		.withMessage('El nombre del cliente es obligatorio'),
	body('description')
		.notEmpty()
		.withMessage('La descripcion del proyecto es obligatorio'),
	handleInputErrors,
	ProjectController.updateProject
);

router.delete(
	'/:id',

	param('id').isMongoId().withMessage('ID no valido'),
	handleInputErrors,

	ProjectController.deleteProject
);

// Routes for tasks

router.post(
	'/:projectId/task',
	validateProjectExist,
	TaskController.createTask
);
