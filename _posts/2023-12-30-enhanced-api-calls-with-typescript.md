---
layout: post
title: Enhanced API Calls with TypeScript
date: 2023-12-30 00:00:00 +0300
description: As web applications become more complex, managing code that interacts with APIs can become a challenge. TypeScript can help by providing type checking and other features that improve reliability and maintainability.
image: assets/img/enhanced-api-calls-with-typescript.png
tags: [Software, Web Development, TypeScript, Optimization]
---

As web applications become more complex, managing code that interacts with APIs can become a challenge. TypeScript can help by providing type checking and other features that improve reliability and maintainability. In this article, we will explore how TypeScript can enhance API calls, with the main focus being type safety for HTTP clients, with examples to illustrate its benefits.

## Getting Started

Let's say we have two functions, one that uses an HTTP client to make requests, and another to consume the first.

```javascript
interface IMember {
  id: string
  name: string
}

const getMember = async (id: string) => {
  try {
    const member = await getMemberAPI(id)
    state.member = member
  } catch (error) {
    console.error(error)
  }
}

const getMemberAPI = async (id: string) => {
  const response  = await fetch(`/member-endpoint/${id}`)
  return await response.json()
}
```

This is just a base example we will build on throughout the rest of the piece.

## Promise Return Type

The first thing we can do to add type-safety is to define a return type for the getMemberAPI function.

### Fetch

```javascript
const getMemberAPI = async (id: string): Promise<IMember> => {
  const response = await fetch(`/member-endpoint/${id}`);
  return await response.json();
};
```

### Axios

```javascript
const getMemberAPI = async (id: string): Promise<IMember> => {
  const response = await axios.get(`/member-endpoint/${id}`);
  return response.data;
};
```

Async functions return a Promise by default, which can have a defined return type. With this in place, any function calling getMemberAPI will receive a value of type IMember.

## HTTP Client Return Type

After defining the return type of our function, we can move on to setting the type on the actual response of our HTTP client. This can come in handy if you need to do any data processing before allowing responses into your applications ecosystem.

### Fetch

```javascript
const getMemberAPI = async (id: string): Promise<IMember> => {
  const response  = await fetch(`/member-endpoint/${id}`)
  return await response.json() as Promise<IMember>
}
```

With fetch, we can use type assertions to tell TypeScript what the response will be. If you are using fetch, add extra checks when using type assertions.

### Axios

```javascript
const getMemberAPI = async (id: string): Promise<IMember> => {
  const response = (await axios.get) < IMember > `/member-endpoint/${id}`;
  return response.data;
};
```

For Axios, we can specify the type we expect to be returned after the method.
For both fetch and Axios, you may want to add further checks on the response before returning the value.

## Generics

Finally, we can add generics to make our API calls reusable. The added reusability generics provide may not be appropriate for some API calls requiring extra data processing. It's best to use generics when you are sure the function will not need any specific logic.
In order for us to implement generics, we need to make some changes to the function we had earlier.

### Fetch

```javascript
const getById = async <T>(url: string, id: string): Promise<T> => {
  const response  = await fetch(`${url}${id}`)
  return await response.json() as Promise<T>
}
```

### Axios

```javascript
const getById = async <T>(url: string, id: string): Promise<T> => {
  const response = (await axios.get) < T > `${url}${id}`;
  return response.data;
};
```

To incorporate generics into a function, we first need to add angle brackets before the parameters of the function: <> Inside those brackets, we add a capital T which tells TypeScript a generic type will go here: <T> . This is called a type parameter. After that, we need to replace any specific type reference with the generic T.

With these updates in place, we can inject any type we want into the function and expect it to be returned in the response.

Now we can update the method call from earlier.

```javascript
const getMember = async (id: string) => {
  try {
    const member = await getById<IMember>("/member-endpoint/", id)
    state.member = member
  } catch (error) {
    console.error(error)
  }
}

const getById = async <T>(url: string, id: string): Promise<T> => {
  const response  = await fetch(`${url}${id}`)
  return await response.json() as Promise<T>
}
```

Other methods with similar requirements can now use the same method.

```javascript
const getMember = async (id: string) => {
  try {
    const member = await getById<IMember>(id, "/member-endpoint/", id)
    state.member = member
  } catch (error) {
    console.error(error)
  }
}

const getPost = async (id: string) => {
  try {
    const post= await getById<IPost>("/post-endpoint/", id)
    state.post = post
  } catch (error) {
    console.error(error)
  }
}

const getById = async <T>(url: string, id: string): Promise<T> => {
  const response  = await fetch(`${url}${id}`)
  return await response.json() as Promise<T>
}
```

## Wrapping Up

In summary, TypeScript offers a range of benefits for developers working with APIs, including improved reliability, scalability, and maintainability. With its support for popular web frameworks and libraries, TypeScript is a versatile and accessible option for web developers looking to enhance their API-related code. By leveraging the power of TypeScript, developers can build more effective applications that meet the demands of modern web development.
