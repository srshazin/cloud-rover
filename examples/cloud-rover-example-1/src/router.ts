import { createRouter } from '../../../dist';
import { handleRoot } from './handlers/root.handler';

export const router = createRouter([
	{
		path: '/',
		method: 'GET',
		handler: handleRoot,
	},
]);
