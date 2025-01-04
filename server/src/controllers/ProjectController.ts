import type { Request, Response } from 'express';
import Project from '../models/Project';

export class ProjectController {
	static createProject = async (req: Request, res: Response) => {
		const project = new Project(req.body);

		try {
			await project.save();
			res.send('Projecto creado exitosamente');
		} catch (error) {
			console.log(error);
		}
	};

	static getAllProjects = async (req: Request, res: Response) => {
		try {
			const project = await Project.find({});
			res.status(200).json(project);
		} catch (error) {
			console.log(error);
		}
	};

	static getProyectById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;

			const project = await Project.findById(id);

			if (!project) {
				res
					.status(404)
					.json({ error: new Error('Proyecto no encontrado').message });
				return;
			}

			res.json(project);
			return;
		} catch (error) {
			console.log({ error });
		}
	};

	static updateProject = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;

			const project = await Project.findByIdAndUpdate(id, req.body);

			if (!project) {
				res
					.status(404)
					.json({ error: new Error('Proyecto no encontrado').message });
				return;
			}

			await project?.save();

			res.status(201).json({ proyecto: 'Proyecto actualizado' });
		} catch (error) {}
	};

	static deleteProject = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;

			const project = await Project.findById(id);
			if (!project) {
				res
					.status(404)
					.json({ error: new Error('Proyecto no encontrado').message });
				return;
			}

			await project?.deleteOne();

			res.send('Proyecto eliminado');
		} catch (error) {
			console.log(error);
		}
	};
}
