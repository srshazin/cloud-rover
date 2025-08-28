import { createRouter } from 'cloud-rover';
import { handleDynamicRoute } from './handlers/dynamic.route.handler';
import { handlePost } from './handlers/post.handler';
import { handleRoot } from './handlers/root.handler';

export const router = createRouter([
	{
		path: '/',
		method: 'GET',
		handler: handleRoot,
	},
	{
		path: '/post',
		method: 'POST',
		handler: handlePost,
	},
	{
		path: '/profile/{user_name}',
		method: 'GET',
		handler: handleDynamicRoute,
	},
]);
