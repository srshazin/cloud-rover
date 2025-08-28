import { RC, reply } from 'cloud-rover';
export async function handleRoot({ request }: RC): Promise<Response> {
	return reply.text('Hello World');
}
