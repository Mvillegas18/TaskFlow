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
			res.json(req.task);
		} catch (error) {
			res.status(500).json({ error });
		}
	};

	static updateTask = async (req: Request, res: Response) => {
		try {
			if (req.task) {
				req.task.name = req.body.name;
				req.task.description = req.body.description;
			}
			res.send('Tarea actualizada correctamente');
		} catch (error) {
			res.status(500).json({ error });
		}
	};

	static deleteTask = async (req: Request, res: Response) => {
		try {
			req.project.tasks = req.project.tasks.filter(
				(task) => task?.toString() !== req.task.id.toString()
			);
			await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
			res.send('Tarea eliminada correctamente');
		} catch (error) {
			res.status(500).json({ error });
		}
	};

	static updateStatus = async (req: Request, res: Response) => {
		try {
			const { status } = req.body;
			if (req.task) {
				req.task.status = status;
			}
			await req.task?.save();
			res.send('Estado actualizado');
		} catch (error) {
			res.status(500).json({ error });
		}
	};
}
