---
layout: post
title: Function Hoisting in JavaScript
date: 2023-12-30 00:00:00 +0300
description: As web applications become more complex, managing code that interacts with APIs can become a challenge. TypeScript can help by providing type checking and other features that improve reliability and maintainability.
thumbnail: function-hoisting-in-javascript.png
tags: [Software, Web Development, JavaScript]
---

Hoisting is one of a few features in JavaScript that make no sense without context. It's important to understand how it works because it often comes up in interviews. In learning about hoisting, you learn about how JavaScript executes code, allocates memory, and the differences in how functions are created.

According to MDN:

"Hoisting refers to the process whereby the interpreter appears to move the declaration of functions, variables or classes to the top of their scope, prior to execution of the code."

Hoisting is what allows this to happen:

```javascript
callFunction();

function callFunction() {
  console.log("Function Called");
}
```

Being able to call functions before they are declared can seem odd at first. The explanation as to why you can is pretty interesting. It has to do with how JavaScript code is executed.

This article will focus mostly on function hoisting, but I should point out JavaScript can perform hoisting on variables and classes. In my experience, function hoisting is more common.

## Background

A good place to start with Hoisting is to answer the question: “What is the point?” It's a neat trick JavaScript can do, but why is it possible in the first place? Hoisting is not available because the community was calling for it as a feature. It's a possibility because of how JavaScript executes code. Let's look at this example again:

```javascript
callFunction();

function callFunction() {
  console.log("Function Called");
}
```

When I execute this code, JavaScript will create what is called a “global execution context.” The global execution context is where all code that is not inside of a function gets executed. The first step in creating a global execution context is what's called the “memory allocation phase.”

During the memory allocation phase, JavaScript will scan your code and allocate memory to all variables and functions. Variables declared with the var keyword are stored with the value undefined and functions are stored with all the code needed to execute.

The next step is the “code execution phase.” As the name suggests, this is where your JavaScript code is executed line by line. So when the above code example is executed, line 1 will be read and reference a function already stored in memory with the code needed to execute it.

This is what's really going on when we talk about Hoisting. We can call a function before its declared because it will be present in the variable environment before execution.

## Practical use

I have found Hoisting useful when I want to group functions and variables together. When I write React components, I like to have my variables declared at the top and my function below. To me, it just looks better.

```javascript
const ConditionalComponent = (props) => {
  const condition1 = condition1Function();
  const condition2 = condition2Function();

  function condition1Function() {
    // process condition1
  }

  function condition2Function() {
    // process condition2
  }

  return (
    <div>
      <p>{condition1}</p>
      <p>{condition2}</p>
    </div>
  );
};
```

Without hoisting, I would have to declare my functions at the top or mix functions and variables together. I could also define all functions in external files and import them into my components. Some functions are so specialized it makes sense to define them inside the component because they won't be used anywhere else.

Here’s the functions first:

```javascript
const ConditionalComponent = (props) => {
  function condition1Function() {
    // process condition1
  }

  function condition2Function() {
    // process condition2
  }

  const [name, setName] = useState("");
  const condition1 = condition1Function();
  const condition2 = condition2Function();

  return (
    <div>
      <p>{name}</p>
      <p>{condition1}</p>
      <p>{condition2}</p>
    </div>
  );
};
```

Mixed:

```javascript
const ConditionalComponent = (props) => {
  const [name, setName] = useState("");

  function condition1Function() {
    // process condition1
  }

  function condition2Function() {
    // process condition2
  }

  const condition1 = condition1Function();
  const condition2 = condition2Function();

  return (
    <div>
      <p>{name}</p>
      <p>{condition1}</p>
      <p>{condition2}</p>
    </div>
  );
};
```

Both options work, but I prefer the look of the Hoisted option.

## Exceptions

A notable exception to hoisting is function expressions. If I was to update the function from earlier to be an expression or arrow function, it would look like this:

```javascript
callVariableFunctionArrow();
callVariableFunctionExpression();

const callVariableFunctionArrow = () => {
  console.log("Variable Function Arrow");
};

const callVariableFunctionExpression = function () {
  console.log("Variable Function Expression");
};
```

With this structure, my IDE will present me with an error.

```bash
'callVariableFunction' was used before it was declared, which is illegal for 'const' variables.
```

The reason function expressions cannot be called early goes back to the memory allocation phase of our execution context. The memory allocation phase allocates spaces in memory for all variables, but with varying values.

Variables with the var keyword are stored with a value of undefined, while variables with let and const are stored but not initialized. let or const variables called before their values have been set exist in what's called the “temporal dead zone.” Calling any of these with the expectation of a function before the function logic is assigned will cause an error.

## Wrapping Up

I hope this article was informative to your understanding of hoisting. Once you know how JavaScript is executed, it becomes a lot easier to understand hoisting. It’s an important concept to learn because there are so many other concepts that tie into it.
