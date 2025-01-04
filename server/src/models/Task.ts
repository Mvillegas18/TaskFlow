import { Document, model, Schema, Types } from 'mongoose';

export interface ITask extends Document {
	name: string;
	description: string;
	project: Types.ObjectId;
}

export const taskSchema: Schema = new Schema(
	{
		name: {
			type: String,
			require: true,
			trim: true,
		},
		description: {
			type: String,
			require: true,
			trim: true,
		},
		project: {
			type: Types.ObjectId,
			ref: 'Project',
		},
	},
	{ timestamps: true }
);

const Task = model<ITask>('Task', taskSchema);

export default Task;
