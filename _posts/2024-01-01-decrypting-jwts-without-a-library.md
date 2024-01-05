---
layout: post
title: Decrypting JWTs Without a Library
date: 2024-01-01 00:00:00 +0800
description: Working with JSON Web Tokens is a standard practice in web development. Until recently, whenever I needed to decrypt a JWT, I would import a library to do it and move on. I was curious what went into decryption so I I decided to learn how its done without the library and see if there are any ways I can improve the process for myself..
image: assets/img/decrypting-jwts-without-a-library.png
tags: [Software, Web Development, JavaScript]
published: true
---

Working with JSON Web Tokens is a standard practice in web development. Until recently, whenever I needed to decrypt a JWT, I would import a library to do it and move on. I was curious what went into decryption so I I decided to learn how its done without the library and see if there are any ways I can improve the process for myself.

## Sections

To get started, I'll cover the different sections of a JWT.

Lets take this JWT as an example:

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikplc3NlIiwiaWF0IjoxNTE2MjM5MDIyfQ._DlXUGrDP-vOcPb7fsHbDebLromT-D1mNR0p4Q6KFNI
```

Each section represents a different part of information in the token.

The first section is known as the headers.

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

If we decode the value it looks like this:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

The second section is where the payload of the JWT is encoded.

```bash
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikplc3NlIiwiaWF0IjoxNTE2MjM5MDIyfQ
```

When working with JWTs in the client side, this is the section we care about. When decoded, the claims of the token are:

```json
{
  "sub": "1234567890",
  "name": "Jesse",
  "iat": 1516239022
}
```

If I want to get the claims of the payload with just javascript, I can use the function below.

```javascript
const decrypt = (jwt) => {
  const [header, payload, signature] = jwt.split(".");
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "===".slice(0, (4 - (base64.length % 4)) % 4);
  const decoded = atob(base64 + padding);
  return JSON.parse(decoded);
};
```

To start, I'll go through the function line by line, then I'll explain how we can improve the functionality beyond decryption of the claims.

The first line splits the token into each of its sections.

```javascript
const [header, payload, signature] = jwt.split(".");
[
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikplc3NlIiwiaWF0IjoxNTE2MjM5MDIyfQ",
  "_DlXUGrDP-vOcPb7fsHbDebLromT-D1mNR0p4Q6KFNI",
];
```

The next line replaces characters in the payload with sanitized versions

```javascript
const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
```

After that, ensure the total length of the base64 payload is divisible by four by adding padding.

```javascript
const padding = "===".slice(0, (4 - (base64.length % 4)) % 4);
```

With the base64 correctly formatted, we can parse it to JSON.

```javascript
const decoded = atob(base64 + padding);
```

Finally, return the parsed token.

```javascript
return JSON.parse(decoded);
```

This version is quite simple but leaves a few opening for improvement. For example, there are places where a bad token can cause an error to get thrown. Also, adding TypeScript support can be useful if your application uses it.

## Error Handling

As the function stands, there are three error states to consider.

The first is the line where the given jwt is split into three variables.

```javascript
const [header, payload, signature] = jwt.split(".");
```

If the token string passed in does not have three dots separating three values, the rest of the function is going to break because the variables created will be `undefined`.

If I pass the value `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` into the decrypt function and console log the variables after the first line, the result is this:

```javascript
const [header, payload, signature] = jwt.split(".");
console.log(header, payload, signature);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 undefined undefined
```

If the function is allowed to proceed, the application crashed with the following error:

```txt
const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
                           ^
TypeError: Cannot read properties of undefined (reading 'replace')
```

The second is the possibility of `atob` throwing an error if a malformed token is passed to it. If I change my token to ``, the split check passes, but atob will throw an error:

```txt
DOMException [InvalidCharacterError]: Invalid character
    at new DOMException (node:internal/per_context/domexception:53:5)
    at __node_internal_ (node:internal/util:695:10)
    at atob (node:buffer:1327:15)
```

The third is the possibility of `JSON.parse` throwing an error if a malformed JSON string is passed to it. If I pass the value `ey.eyK._D` to the decrypt function, the split check passes, the atob function accepts it, but an error will be thrown by `JSON.parse`.

```txt
undefined:1
{"

SyntaxError: Unterminated string in JSON at position 2
    at JSON.parse (<anonymous>)
```

To make sure we can trace back to these errors, we can wrap the function in a try catch block.

```javascript
const decrypt = (jwt) => {
  try {
    const [header, payload, signature] = jwt.split(".");
    if (!header || !payload || !signature)
      throw new Error("invalid jwt format");

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "===".slice(0, (4 - (base64.length % 4)) % 4);
    const decoded = atob(base64 + padding);
    const parsed = JSON.parse(decoded);

    return parsed;
  } catch (error) {
    console.error(`jwt decryption failed: ${error.message}`);
  }
};
```

Now if an error is thrown within the function, the error received will have the prefix: `"jwt decryption failed"`. Anyone debugging the issue should be able to locate the source much faster.

## Expiration Handling

The most common check made on JWTs in client side applications is if the token has expired. If its appropriate, adding checks to the function can be done as follows.

```javascript
const decrypt = (jwt) => {
  try {
    const [header, payload, signature] = jwt.split(".");
    if (!header || !payload || !signature)
      throw new Error("invalid jwt format");

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "===".slice(0, (4 - (base64.length % 4)) % 4);
    const parsed = JSON.parse(decoded);
    const decoded = atob(base64 + padding);

    // new checks
    if (!parsed.hasOwnProperty("exp"))
      throw new Error("no exp field found in claims");
    if (parsed.exp < Date.now()) throw new Error("token expired");

    return parsed;
  } catch (error) {
    console.error(`jwt decryption failed: ${error.message}`);
  }
};
```

The first check makes sure the exp field is present in the JWT claims. Without it, a specific error should be returned.

```javascript
if (!parsed.hasOwnProperty("exp"))
  throw new Error("no exp field found in claims");
```

The second check returns an error if the token has expired.

```javascript
if (parsed.exp < Date.now()) throw new Error("token expired");
```

### [Github Repo](https://github.com/JWLangford/decrypting-jwts-without-a-library)
