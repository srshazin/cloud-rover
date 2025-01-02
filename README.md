# Cloud Rover

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)  
[![Version](https://img.shields.io/npm/v/cloud-rover.svg)](https://www.npmjs.com/package/cloud-rover)

**Cloud Rover** is a lightweight middleware library designed to transform Cloudflare Workers into a fully functional backend server. With features like routing, request handling, and response management, this library simplifies the development process and helps you unlock the full potential of serverless applications.

---

## Features

- **Routing**: Define static, dynamic, and nested routes with ease.
- **Request Handling**: Effortlessly process GET, POST, PUT, DELETE, and other HTTP methods.
- **Response Management**: Generate structured, meaningful responses with built-in utilities.

---

## Installation

Install the library using npm.

```bash
npm install cloud-rover
```

---

## Quick Start

Here's a simple example to get you started:

```typescript
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

export default {
  async fetch(request, env, ctx): Promise<Response> {
    return Rover(request, router);
  },
} satisfies ExportedHandler<Env>;
```

---

## Documentation

Full documentation, including API references and examples, can be found [here](https://shazin.me/rover/docs/intro).

---

## Contributing

_Note: Contributing guide is still not ready please wait before we start accepting OS contributions_

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Feedback

If you find this library helpful, consider giving it a ⭐ on [GitHub](https://github.com/srshazin/cloud-rover). For any issues or feature requests, please open an issue on the GitHub repository.
