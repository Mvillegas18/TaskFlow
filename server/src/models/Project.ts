import { Document, model, Schema } from 'mongoose';

export interface IProject extends Document {
	projectName: string;
	clientName: string;
	description: string;
}

const projectSchema: Schema = new Schema({
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
});

const Project = model<IProject>('Project', projectSchema);
export default Project;
