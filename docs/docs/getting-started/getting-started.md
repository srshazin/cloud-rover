---
title: Environment Setup
---

To started with **Cloud Rover** you need to have a [Cloudflare Worker](https://developers.cloudflare.com/workers/) project setup. Follow [this](https://developers.cloudflare.com/workers/get-started/guide/) get started guide on cloudfare worker.

:::info
Please keep in mind that, **rover** is a middleware on top of cloudflare's raw worker environment. So, everything we offer is a wrapper around core worker runtime.
:::

## Requirements

- `node >= 18`
- `npm`
- `npx`

:::tip
This tutorial will be covered using `npm` but `pnpm` can be used along.
:::

## Create New Project

### Initialize a Cloudflare Worker Project

Refer to [Cloudflare official docs](https://developers.cloudflare.com/workers/get-started/guide/) or Follow Along

```bash
npm create cloudflare@latest -- my-first-worker
```

For setup, select the following options:

- For What would you like to start with?, choose Hello World example.
- For Which template would you like to use?, choose Hello World Worker.
- For Which language do you want to use?, choose JavaScript.
- For Do you want to use git for version control?, choose Yes.
- For Do you want to deploy your application?, choose No (we will be making some changes before deploying).

Now, you have a new project set up. Move into that project folder.

```bash
cd my-first-worker
```

This will create a project with the following structure

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

### Install Rover Middleware

```bash
npm install cloud-rover
```

Once rover is installed, you can now follow the [Using Rover](./using-rover.md) section
