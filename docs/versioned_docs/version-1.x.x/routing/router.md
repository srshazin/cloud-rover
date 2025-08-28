---
sidebar_position: 1
title: Router
---

Rover middleware needs a router to operate. Router is essentially an array of `Route` object.

## The route interface

The route object looks somewhat like this:

```ts
export interface Route {
  path: string;
  // Overloading handler for multiple call signatures
  handler(request: Request, env: Env): Promise<Response>;
  handler(request: Request, params: RouteParams): Promise<Response>;
  handler(request: Request, ctx: ExecutionContext): Promise<Response>;
  handler(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>;
  handler(request: Request, params: RouteParams, env: Env): Promise<Response>;
  handler(request: Request, params: RouteParams, env: Env, ctx: ExecutionContext): Promise<Response>;
  method?: string;
}
```

Here,
- `path` is the url path which starts with a `/` for instance `/blog`
- `handler` is the handler function which accepts `request` as a param which is useful for inspecting requests
- `method` as the name suggests the http method like `POST` or `GET`. By default the method will be `GET`, if it's not explicitly defined.

## Create Router

Creating router is simple, just call the built-in `Router` function and pass in an array of `Route`

For instance here's a demo router

**router.js**

```js
const router = Router([
  {
    path: "/",
    handler: home_handler,
    method: "GET",
  },
  {
    path: "/blogs",
    handler: blog_handler,
    method: "GET",
  },
  {
    path: "/auth/login",
    handler: login_handler,
    method: "POST",
  },
]);
```

That's it, it's as simple as that. No need to make it any complex further. This design helps you keep a separate route tree for your application.
