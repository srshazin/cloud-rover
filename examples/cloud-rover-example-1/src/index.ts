import { Rover } from '../../../dist';
import { router } from './router';

// Allow only a specific list of front-end clients
// These allowed origins will pass the pre-flight test
// Any other origin will be blocked by CORS origin policy
export const allowedOrigins = ['http://localhost:8000'];

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return Rover(request, router, env, ctx, undefined);
	},
} satisfies ExportedHandler<Env>;
