---
sidebar_position: 1
title: Handle Response
---

Responses can be made using the `reply` object . Rover offers 4 native ways to send response to the client. These are explained below

## text

- **Interface:** `send(text: string, status: number = 200, headers: Headers )`
- **Use cases:** returns a simple text in response.
- **Example:**
  ```js
  return reply.text("Hello world from Rover!");
  ```

## json

- **Interface:** `json(body: object, status?: number, headers?: Headers): Promise<Response>`
- **Use cases:** Use it to make a json response. The response contains header `Content-Type: application/json`.
- **Example:**

  ```js
  return reply.json({
    status: true,
    msg: "request successful",
  });
  ```

## html

- **Interface:** `html(html: string, status?: number, headers?: Headers): Promise<Response>`
- **Use cases:** Make `html` response to the browsers
- **Example:**
  ```js
  return reply.html(
    "<h1>Hello World, this is my greatest website made using html programming language!</h1>"
  );
  ```

## error

- **Interface:** `error(msg: string, errorStatus: number, headers?: Headers): Promise<Response>`
- **Use cases:** Make error response with any error code. The response will send the following json
  ```json
  {
    "success": false,
    "message": "Your msg here"
  }
  ```
- **Example:**
  ```js
  return reply.error("Bad request", 400);
  ```
