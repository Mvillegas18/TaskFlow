import { green } from 'colors';
import server from './server';

const PORT = process.env.PORT ?? 3000;

server.listen(PORT, () => {
	console.log(green.bold(`Server is running on http://localhost:${PORT}`));
});
