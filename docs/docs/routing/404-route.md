---
sidebar_position: 3
title: Custom 404 Route
---

Making a custom 404 page is as easy as adding another route. Let's keep it simple and clean. Just add another route but this time with path of `*` or `/*`, this path will serve as a 404 or default page when no page is found.

## Demo

### Define a Custom 404 Page Handler

```js
async function custom_404_handler(request) {
  return reply.html(`
			<body style="margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background-color: #1a1a1a; color: #f5f5f5; font-family: Arial, sans-serif; text-align: center;">
				<div>
					<h1 style="font-size: 5rem; margin: 0;">404</h1>
					<p style="font-size: 1.5rem; margin: 0.5rem 0;">Page Not Found</p>
					<a href="/" style="text-decoration: none; color: #4caf50; font-size: 1rem;">Return to Home</a>
				</div>
			</body>
		`);
}
```

### Add the route

```ts
const router = Router(
	[
        ...,
		{
            // highlight-next-line
			path: "*",
			handler: custom_404_handler
		},
    ]
```

Well that's it. Now you've a 404 page.

### Output

Let's browse to a random path `http://localhost:8787/wefewfwefwef`

![](../img/404_ss_demo.png)
