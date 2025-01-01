import { blue, red } from 'colors';
import { connect } from 'mongoose';
import { exit } from 'node:process';

export const connectDB = async () => {
	try {
		const { connection } = await connect(process.env.MONGO_URI as string);
		const url = `${connection.host}:${connection.port}`;
		console.log(blue.bold(`MongoDB Connected: ${url}`));
	} catch (error: any) {
		console.error(red.bold('Error failed to connect to MongoDB'));
		exit(1);
	}
};
