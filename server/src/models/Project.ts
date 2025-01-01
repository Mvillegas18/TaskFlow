import { Document, model, Schema } from 'mongoose';

export interface ProjectType extends Document {
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

const Project = model<ProjectType>('Project', projectSchema);
export default Project;
