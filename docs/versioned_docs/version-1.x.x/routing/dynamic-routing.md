---
sidebar_position: 2
title: Dynamic Routing
---

Dynamic routing is essential. In this section we will cover how to use _Dynamic Path Parameter_ and also _Query Parameter_ Parsing

## Dynamic Path Parameter

Suppose you want to create a route for user's profile. So practically your url should kinda look like this `https://yoursite.com/profile/alex` or even `https://yoursite.com/alex`.

Now in order to incorporate this dynamic routing what you need to do is as follows

### Define your path structure in the the router

```ts
[
  {
    // highlight-next-line
    path: "/art/{username}/{art_id}",
    method: "GET",
    handler: article_handler,
  },
];
```

Take a closer look at the line `path: "/art/{username}/{art_id}"` here `{username}` and `{art_id}` is defined as dynamic paths, so users can visit at `/art/alex/69`.

### Get dynamic path

So, in order to get the dynamic paths from your handlers, your handler function needs one more argument for params then you can use this argument to retrieve the path parameter. Take a look at the following snippet

```js
async function article_handler(request, params) {
  return reply.text(
    // highlight-next-line
    `Article from ${params.pathParams.username} and the article id is ${params.pathParams.art_id}.`
  );
}
```

Which will output this for the previous example.

```plaintext
Article from alex and the id is 69.
```

## Query Parameters

[URL Query parameters](https://en.wikipedia.org/wiki/Query_string) can be defined in the same manner as dynamic path params. The only difference is you access those using `params.queryParams.paramName` and you don't need to specify a path structure in the [Router](../routing/router.md) . Here's a quick example.

Suppose, user's profile page is serving in `/profile` and you want to identify user using their profile id so a specific user's profile will be located by `/profile?id=69420`. So if you want to catch the query all you need to do is on the handler for the route `/profile` catch the parameter `params.queryParams.id`. That's it, no extra fuss.
