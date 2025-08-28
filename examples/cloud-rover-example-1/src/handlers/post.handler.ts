import { RC, reply } from '../../../../dist';

export async function handlePost({ request }: RC): Promise<Response> {
	const body = (await request.json()) as any;
	const name = body.name;
	return reply.text(`"Hello Mr. ${name}`);
}
