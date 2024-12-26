---
sidebar-position: 2
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
