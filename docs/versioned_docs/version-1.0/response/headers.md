---
sidebar_position: 2
title: Response Header
---

A Response header can be passed on any native `reply` methods as the third parameter.

The headers can be constructed using [`Headers` API](https://developer.mozilla.org/en-US/docs/Web/API/Headers) of the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

## Creating header

A header can be set using

```js
const headers = new Headers();
headers.set("x-foo", "123");
// or
headers.append("x-foo", "world");
```

## Adding header to response

When returning the response using `reply.text()` or any other [native response method ](./response.md) you can pass the `headers` as the third argument of the function. By default the header is just an empty instance of the `Headers()`.

```js
// an example
return reply.text("Hello World", 200, headers);
```

For details on using headers please refer to [MDN Reference on Headers API](https://developer.mozilla.org/en-US/docs/Web/API/Headers)
