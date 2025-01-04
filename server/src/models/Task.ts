import { Document, model, Schema, Types } from 'mongoose';

const taskStatus = {
	PENDING: 'pending',
	ON_HOLD: 'onHold',
	IN_PROGRESS: 'inProgress',
	UNDER_REVIEW: 'underReview',
	COMPLETED: 'completed',
} as const;

export type TaskType = (typeof taskStatus)[keyof typeof taskStatus];

export interface ITask extends Document {
	name: string;
	description: string;
	project: Types.ObjectId;
	status: TaskType;
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
		status: {
			type: String,
			enum: Object.values(taskStatus),
			default: taskStatus.PENDING,
		},
	},
	{ timestamps: true }
);

const Task = model<ITask>('Task', taskSchema);

export default Task;
