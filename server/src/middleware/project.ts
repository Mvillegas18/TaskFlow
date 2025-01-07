import type { NextFunction, Request, Response } from 'express';
import Project, { IProject } from '../models/Project';

declare global {
	namespace Express {
		interface Request {
			project: IProject;
		}
	}
}

export const projectExist = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { projectId } = req.params;
		const project = await Project.findById(projectId);

		if (project) {
			req.project = project;
			next();
		} else {
			res
				.status(404)
				.json({ error: new Error('No existe el proyecto').message });
		}
	} catch (error) {
		res.status(505).json({ error: 'Hubo un error' });
	}
};
