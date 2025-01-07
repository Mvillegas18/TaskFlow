import type { Request, Response } from 'express';
import Task from '../models/Task';

export class TaskController {
	static createTask = async (req: Request, res: Response) => {
		try {
			const task = new Task(req.body);
			task.project = req.project?.id;
			req.project?.tasks.push(task.id);
			await Promise.allSettled([task.save(), req.project.save()]);
			res.send('Tarea creada correctamente');
		} catch (error) {
			console.log(error);
		}
	};

	static getProjectTask = async (req: Request, res: Response) => {
		try {
			const tasks = await Task.find({ project: req.project.id }).populate(
				'project'
			);
			res.json(tasks);
			return;
		} catch (error) {
			res.status(500).json({ error });
		}
	};

	static getTaskById = async (req: Request, res: Response) => {
		try {
			const { taskId } = req.params;
			const task = await Task.findById(taskId);
			if (!task) {
				res
					.status(404)
					.json({ error: new Error('Tarea no encontrada').message });
			}
			if (task?.project.toString() !== req.project.id) {
				res.status(400).json({ error: new Error('Accion no valida').message });
			}
			res.json(task);
		} catch (error) {
			res.status(500).json({ error });
		}
	};

	static updateTask = async (req: Request, res: Response) => {
		try {
			const { taskId } = req.params;
			const task = await Task.findById(taskId);
			if (!task) {
				res
					.status(404)
					.json({ error: new Error('Tarea no encontrada').message });
			}
			if (task?.project.toString() !== req.project.id) {
				res.status(400).json({ error: new Error('Accion no valida').message });
			}
			if (task) {
				task.name = req.body.name;
				task.description = req.body.description;
			}
			res.send('Tarea actualizada correctamente');
		} catch (error) {
			res.status(500).json({ error });
		}
	};

	static deleteTask = async (req: Request, res: Response) => {
		try {
			const { taskId } = req.params;
			const task = await Task.findById(taskId, req.body);
			if (!task) {
				res
					.status(404)
					.json({ error: new Error('Tarea no encontrada').message });
			}

			req.project.tasks = req.project.tasks.filter(
				(task) => task?.toString() !== taskId
			);
			await Promise.allSettled([Task.deleteOne(), req.project.save()]);
			res.send('Tarea eliminada correctamente');
		} catch (error) {
			res.status(500).json({ error });
		}
	};
}
