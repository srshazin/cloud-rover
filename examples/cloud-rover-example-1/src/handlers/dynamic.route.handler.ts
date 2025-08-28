import { RC, reply } from 'cloud-rover';

// suppose path is /profile/John where John is dynamic
export async function handleDynamicRoute({ request, params }: RC): Promise<Response> {
	const userName = params.pathParams.user_name;
	return reply.json({
		success: true,
		message: `Hey ${userName}`,
	});
}
