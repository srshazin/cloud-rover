---
title: Environment Setup
---

To started with **Cloud Rover** you need to have a [Cloudflare Worker](https://developers.cloudflare.com/workers/) project setup. Follow [this](https://developers.cloudflare.com/workers/get-started/guide/) get started guide on cloudfare worker.

:::remember
Ok
:::

## Requirements

- `node >= 18`
- `npm`
- `npx`

:::tip
This tutorial will be covered using `npm` but `pnpm` can be used along.
:::

## Create New Project

The easiest way to create a rover project is by using `npx`

```bash
npx cloud-rover init
```

Now this will prompt you different configurations for your project. You have choices between good old **Javascript** or **Typescript**.

After that `cd` into your project and hit `npm install`
