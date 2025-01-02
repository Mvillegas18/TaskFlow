import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
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
