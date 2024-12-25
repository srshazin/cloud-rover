---
title: Using Rover
---

Once you have installed rover middleware you can begin to use it. Earlier we stated the project structure in [Getting started](./getting-started.md) guide as follows

```plaintext
my-first-worker
├── package.json
├── pnpm-lock.yaml
├── src
│   └── index.ts
├── test
│   ├── index.spec.ts
│   └── tsconfig.json
├── tsconfig.json
├── vitest.config.mts
├── worker-configuration.d.ts
└── wrangler.toml
```

Here we are interested in `src/index.ts` file as it the default entrypoint in a worker project.

:::tip
You can change the default entrypoint by editing `wrangler.tml`. by updating the lin `main = "src/index.ts"` to point to your desired file.
:::

## Create a Router

Start by creating a router

```js
import { Router, Rover, reply } from "cloud-rover";
// Define  a router
const router = Router([
  {
    path: "/",
    handler: index_handler,
  },
]);

// the index handler function
async function index_handler(request): Promise<Response> {
  return reply.text("Hello World From Rover!");
}
```

Here, `index_handler` is the handler function for that router. More on router will be discussed on Router section

## Call the Middleware

By default your entry file or `index.js` will look like this

```ts
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  },
};
```

Edit this file **src/index.js**:

```js
export default {
	async fetch(request, env, ctx): Promise<Response> {
		return Rover(request, router)
	},
} satisfies ExportedHandler<Env>;
```

Notice here the `router` is the router we created earlier

So now our `index.js` file will look like this

```js
import { reply, Router, Rover } from "cloud-rover"
const router = Router(
	[
		{
			path: "/",
			handler: index_handler,
			method: "POST"
		}
	]
)

async function index_handler(request): Promise<Response> {
	return reply.text("Hello World from Rover!")
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return Rover(request, router)
	},
} satisfies ExportedHandler<Env>;

```

## Run The Project

Follow cloudflare's standard run command for running the project

```bash
npm run start
```

It should start the development server

```bash
> wrangler dev


 ⛅️ wrangler 3.99.0
-------------------

⎔ Starting local server...
[wrangler:inf] Ready on http://localhost:8787

```

And you should see a "Hello World from Rover!" at `http://localhost:8787`
