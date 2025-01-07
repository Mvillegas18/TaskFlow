import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { TaskController } from '../controllers/TaskController';
import { projectExist } from '../middleware/project';
import { taskBelongToProject, taskExist } from '../middleware/task';
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
router.param('projectId', projectExist);
router.param('projectId', taskBelongToProject);

router.post(
	'/:projectId/task',
	param('projectId').isMongoId().withMessage('ID no valido'),
	body('name').notEmpty().withMessage('El nombre de la tarea es obligatoria'),
	body('description').notEmpty().withMessage('La descripcion es obligatoria'),
	handleInputErrors,
	TaskController.createTask
);

router.get('/:projectId/task', TaskController.getProjectTask);

router.param('taskId', taskExist);
router.get(
	'/:projectId/task/:taskId',
	param('taskId').notEmpty().withMessage('ID de la tarea no valido'),
	handleInputErrors,
	TaskController.getTaskById
);

router.put(
	'/:projectId/task/:taskId',
	param('taskId').isMongoId().withMessage('ID no valido'),
	body('name').notEmpty().withMessage('El nombre de la tarea es obligatoria'),
	body('description').notEmpty().withMessage('La descripcion es obligatoria'),
	handleInputErrors,
	TaskController.updateTask
);

router.delete(
	'/:projectId/task/:taskId',
	param('taskId').isMongoId().withMessage('ID no valido'),
	handleInputErrors,
	TaskController.deleteTask
);

router.post(
	'/:projectId/task/:taskId/status',
	param('taskId').isMongoId().withMessage('ID no valido'),
	body('status').notEmpty().withMessage('El estado es obligatorio'),
	handleInputErrors,
	TaskController.updateStatus
);
