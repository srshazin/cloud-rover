---
sidebar_position: 2
title: Handler Function
---
In this section we cover everything you need to know about a handler function.
As in any other http library each route is assigned a handle function and it handles the incoming request to the specific route and returns response. In cloud-rover a handler function must a carry a specific signature.

## Signature
```ts
handler(rc: RC): Promise<Response>;
```

It passes an `RC` object which stands for *Router Context*.

### `RC` Interface
```ts
interface RC {
  request: Request;
  params: RouteParams;
  env: unknown;
  ctx: ExecutionContext;
}
```
Here each parameter contains information regarding the request, context or environment. A brief introduction of each parameter is given below:
- `request`: This is the standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) interface for fetch request. It contains all the necessary information regarding the request.
- `params`: RouteParams is an interface provided with cloud-rover, it has two properties `pathParams` and `queryParams` please refer to [Dynamic Routing](./routing/dynamic-routing.md) section to learn more.
- env: This is cloudflare's binding of worker platform. This is provided by cloudflare. Bindings allow your Worker to interact with resources on the Cloudflare Developer Platform. [Learn more here](https://developers.cloudflare.com/workers/runtime-apis/bindings/)
- ctx: provides run-time APIs. This also comes with core worker package from cloudflare. [Learn more](https://developers.cloudflare.com/workers/runtime-apis/context/).

## Example handler
```ts
export async function handleRoot(rc): Promise<Response> {
	return reply.text('Hello World');
}
```

## Reading JSON Request Body
You can read request body using `request.json()`. Here's an example
```js
export async function handlePost(rc): Promise<Response> {
	const body = await rc.request.json();
	const name = body.name;
	return reply.text(`"Hello Mr. ${name}`);
}
```

In **typescript** use `RC` as parameter type
```ts
export async function handlePost(rc: RC): Promise<Response> {
	const body = await rc.request.json();
	const name = body.name;
	return reply.text(`"Hello Mr. ${name}`);
}
```

:::tip
Instead of typing `rc.request.foo` all the time it's recommended to destructure the object and use them directly.
:::

## Destructuring `RC`
We can write the previous example like this
```ts
    export async function handlePost({request}): Promise<Response> {
	const body = await request.json();
	const name = body.name;
	return reply.text(`"Hello Mr. ${name}`);
}
```

or in **typescript** like this
```ts
export async function handlePost({request}: RC): Promise<Response> {
	const body = await request.json();
	const name = body.name;
	return reply.text(`"Hello Mr. ${name}`);
}
```
To learn more about the request object please refer to the [https://developer.mozilla.org/en-US/docs/Web/API/Request](MDN Reference).