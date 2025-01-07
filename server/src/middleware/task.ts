import type { NextFunction, Request, Response } from 'express';
import Project, { IProject } from '../models/Project';
import Task, { ITask } from '../models/Task';

declare global {
	namespace Express {
		interface Request {
			task: ITask;
		}
	}
}

export const taskExist = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { taskId } = req.params;
		const task = await Task.findById(taskId);

		if (task) {
			req.task = task;
			next();
		} else {
			res.status(404).json({ error: new Error('No existe la tarea').message });
		}
	} catch (error) {
		res.status(505).json({ error: 'Hubo un error' });
	}
};
