import { Document, model, PopulatedDoc, Schema, Types } from 'mongoose';
import type { ITask } from './Task';

export interface IProject extends Document {
	projectName: string;
	clientName: string;
	description: string;
	tasks: PopulatedDoc<ITask & Document>[];
}

const projectSchema: Schema = new Schema(
	{
		projectName: {
			type: String,
			require: true,
			trim: true,
		},
		clientName: {
			type: String,
			require: true,
			trim: true,
		},
		description: {
			type: String,
			require: true,
			trim: true,
		},
		tasks: [
			{
				type: Types.ObjectId,
				ref: 'Task',
			},
		],
	},
	{ timestamps: true }
);

const Project = model<IProject>('Project', projectSchema);
export default Project;
