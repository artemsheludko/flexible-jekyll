---
layout: post
title: Consolidate Your TypeScript Imports With index.ts Files
date: 2023-12-28 00:00:00 +0300
description: I wanted to share a helpful technique I use in TypeScript projects to consolidate imports and make my code base much easier to read. It involves re-exporting modules in directories with index.ts files.
image: assets/img/consolidate-your-typescript-imports-with-index-files.png
tags: [Software, Web Development, TypeScript, Optimization]
---

I wanted to share a helpful technique I use in TypeScript projects to consolidate imports and make my code base much easier to read. It involves re-exporting modules in directories with index.ts files. Exporting through an index.ts file allows other modules to import everything directly in a single import statement.

To start, let’s take a simple example app.

```bash
/src
  /components
    message.ts
    user.ts
  server.ts
index.ts
```

message.ts and user.ts both have exported functions used in the server.ts file.

### user.ts

```javascript
export const userFunc = (user: string) => {
  return `Here is your user: ${user}`;
};
```

### message.ts

```javascript
export const messageFunc = (message: string) => {
  return `Here is your message: ${message}`;
};
```

### server.ts

```javascript
import { messageFunc } from "./components/message";
import { userFunc } from "./components/user";

export const runServer = () => {
  console.log(messageFunc("Hello"));
  console.log(userFunc("Jesse"));
};
```

Inside server.ts, I need to have two import lines to get both functions. To simplify the imports, add an index.ts file to the components folder and re-export the contents of the files contained within it.

```bash
/src
  /components
    index.ts
    message.ts
    user.ts
  server.ts
index.ts
```

### index.ts

```javascript
export * from "./message";
export * from "./user";
```

When importing modules, TypeScript initially looks for an index.ts file. If one cannot be found, it will look for a file with the name specified ie. message or user.

With an index.ts file in place, the imports in the server.ts file can be consolidated into one import line.

```javascript
import { messageFunc, userFunc } from "./components";

export const runServer = () => {
  console.log(messageFunc("Hello"));
  console.log(userFunc("Jesse"));
};
```

Even a simplified example shows the improvement in readability between the two versions.

### Application Growth

Another benefit of this technique is it handles new exports automatically. Let’s say I add another function to my user.ts file.

```javascript
export const userFunc = (user: string) => {
  return `Here is your user: ${user}`;
};

export const newUserFunc = (user: string) => {
  return `Here is your new user: ${user}`;
};
```

With the new function in place, I don’t have to make any changes to my index.ts file. Everything in users.ts is already being exported. Now, I just need to specify the import in my server.ts file.

```javascript
import { messageFunc, userFunc, newUserFunc } from "./components";

export const runServer = () => {
  console.log(messageFunc("Hello"));
  console.log(userFunc("Jesse"));
  console.log(newUserFunc("Jesse Again"));
};
```

### Declaration Files

If you have a folder containing files, you can utilize the same design pattern, with one alteration. Instead of an index.ts file, use an index.d.ts file.

It’s possible to use index.ts for your declaration files, but they will be included when you convert your project to JavaScript. Ideally, you keep out files with no purpose.

### Drawbacks

Speaking from experience, this is a painful design pattern to implement after a codebase has been in existence for some time. If you can, I would adopt this technique at the start of a project.

Also, this technique will increase the number of files you have in your project. In my experience, the benefits of simplified import paths outweigh the costs of extra files.

### Wrapping Up

Using index.ts files to consolidate imports is a great way to promote readability in your codebase. It’s a vital tool in every medium to large codebase I’ve worked on in the past few years.
