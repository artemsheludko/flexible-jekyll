---
layout: post
title: Understanding String Literals in TypeScript
date: 2024-01-05 00:00:00 +0300
description: Example Description.
image: assets/img/understanding-string-literals-in-typeScript.png
tags: [Programming, TypeScript, Web Development, Coding, JavaScript]
published: true
---

I want to go over a feature in TypeScript I use all the time; it's called the string literal types. They are a great alternative to enums if you need to add a simple type to an interface. In this piece, I'll be going over what string literals are, how you can use them, and why I sometimes choose them over enums.

## What Are String Literals?

String literal types fall under the literal type category. Literal types allow you to refer to specific strings or numbers in type positions. I'll focus on string literals for this piece, but the same principles can be used for numeric literals.

In practice, a string literal lets you set specific strings as a type.

```javascript
interface IPerson {
  name: string
  age: number
  mood: "happy" | "sad" | "neutral"
}
```

In the example above, I have a person interface with a name, age, and mood. Name and age use prototypes, but mood uses a string literal. The syntax for creating string literals is similar to union types.

Now when interacting with the person object, you'll only be able to set the value of mood to one of the strings defined in the interface.

## Where are they useful?

I find string literals useful when I’m consuming an external API with response types matching the string literal format. I recently built an integration with Mailchimp Webhooks. The webhook response payload has a field called type which can be profile, subscribe or unsubscribe.

When setting up the response interface, a string literal was a great option for the response type.

```javascript
interface IMailchimpResponse {
  type: "profile" | "subscribe" | "unsubscribe";
}
```

String literals are also ideal for types where you plan on using selection control mechanisms like switch statements or if blocks.

```javascript
const selection = (res: IMailchimpRes) => {
  switch (res.type) {
    case "profile":
    // do something

    case "subscribe":
    // do something

    case "unsubscribe":
    // do something
  }

  if (res.type === "profile") {
    // do something
  }
};
```

## Why Not Enums?

You may wonder why I would choose a string literal over an enum for the examples above. The main reason I choose not to use an enum is the ease of use. If I were to use an enum, it would require an extra import for the interface and the selection checks later.

Enum definition:

```javascript
export enum Mood {
  HAPPY = "happy",
  SAD = "sad",
  NEUTRAL = "neutral"
}
```

Interface:

```javascript
import { Mood } from "@enums"

interface IPerson {
  name: string
  age: number
  mood: Mood
}
```

Selection logic:

```javascript
import { Mood } from "@enums";

const selection = (res: IMailchimpRes) => {
  switch (res.type) {
    case Mood.HAPPY:
    // do something

    case Mood.SAD:
    // do something

    case Mood.NEUTRAL:
    // do something
  }

  if (res.type === Mood.HAPPY) {
    // do something
  }
};
```

## When To Use an Enum?

There are two factors I think of when I consider an enum over a string literal.

The first is, how many fields will my type have? Before switching to an enum, I usually limit my string literals to around five values. It’s a question of readability to me at that point.

```javascript
// Enum

enum Property {
  PROPERTY1 = "property1",
  PROPERTY2 = "property2",
  PROPERTY3 = "property3",
  PROPERTY4 = "property4",
  PROPERTY5 = "property5",
  PROPERTY6 = "property6",
  PROPERTY7 = "property7",
  PROPERTY8 = "property8",
  PROPERTY9 = "property9",
  PROPERTY10 = "property10",
}

interface Widget {
  name: string
  property: Property
  size: number
}

// String Literal

interface Widget {
  name: string
  property:
    | "property1"
    | "property2"
    | "property3"
    | "property4"
    | "property5"
    | "property6"
    | "property7"
    | "property8"
    | "property9"
    | "property10"
  size: number
}
```

The example above shows ten. I have worked with enums in the past with around fifty values.

Another factor is if the type exists elsewhere as an enum. If a project I’m working on has an API with enums already defined, I’ll do my best to mimic the API structure to promote consistency. If another developer needs to do some work in the frontend and sees similar defined types as the backend, they should have an easier time understanding data structures and types.

```javascript
public enum Mood {
 HAPPY,
 SAD,
 NEUTRAL;
}

public class Person {
 public String name;
 public int age;
 public Mood mood;
}
```

If I have a backend API with a person class that gets sent to the frontend, I’ll do my best to replicate the structure.

```javascript

enum Mood {
 HAPPY,
 SAD,
 NEUTRAL;
}

interface IPerson {
 name: string
 age: number
 mood: Mood
}
```

## Wrapping Up

String literals are a great feature in TypeScript. I hope this piece was informative and sparked some ideas on where you could use them.
