<div align="center">

![Microdiff Logo](https://raw.githubusercontent.com/AsyncBanana/microdiff/master/Logo.svg)

Microdiff is a tiny (currently <1kb), fast, zero dependency object and array comparison library. It is significantly faster than most other deep comparison libraries, and has full TypeScript support.


> 💡 I recommend reading this blog post:
>
> **[Building the fastest object and array differ](https://byteofdev.com/posts/microdiff/)** for an explanation of how Microdiff achieves its size and speed.

![Minizipped Size (from Bundlephobia)](https://img.shields.io/bundlephobia/minzip/microdiff?style=flat-square) ![License](https://img.shields.io/npm/l/microdiff?style=flat-square) ![dependency Count](https://img.shields.io/badge/dependencies-0-green?style=flat-square)

</div>

# Features

- 🚀 More than double the speed of other object diff libraries
- 📦 Extremely lightweight, <1kb minified
- 🌎 Supports Deno, Node, the web, and even service workers. Also comes with built-in Typescript types
- 🔰 Very easy to use, having just a single `diff()` function
- 📅 Full support for objects like `new Date()` and `new RegExp()`

# Get started

First, install Microdiff

```
npm i microdiff
```

If you are using Deno, you can import it from Deno.land with the link `https://deno.land/x/microdiff@VERSION/index.ts` (remember to change `@VERSION` to the version you want to use).

After you install it, import it and run it on two objects.

```js
import diff from "microdiff";

const obj1 = {
	originalProperty: true,
};
const obj2 = {
	originalProperty: true,
	newProperty: "new",
};

console.log(diff(obj1, obj2));
// [{type: "CREATE", path: ["newProperty"], value: "new"}]
```

If you are using CommonJS, you can import it like this:

```js
const diff = require("microdiff").default;
```

There are three different types of changes: `CREATE`, `REMOVE`, and `CHANGE`.
The `path` property gives a path to the property in the new object (or the old object in the case of `REMOVE`).
Each element in the paths is a key to the next property a level deeper until you get to the property changed, and it is a string or a number, depending on whether the object is an Array or Object (Objects with number keys will still be strings).
The `value` property exists in types `CREATE` and `CHANGE`, and it contains the value of the property added/changed/deleted.
The `oldValue` property exists in the type `CHANGE` and `REMOVE`, and it contains the old value of the property.

# Cycles support

By default, Microdiff supports cyclical references, but if you are sure that the object has no cycles like parsed JSON, you can disable cycles using the `cyclesFix` option.

```js
diff(obj1, obj2, { cyclesFix: false });
```

# Benchmarks

```
Benchmarks: Small object
deep-diff: 17929ns - 409% slower
deep-object-diff: 10763ns - 206% slower
jsdiff: 79700ns - 2164% slower
microdiff: 3520ns - Fastest

Benchmarks: Large Object
deep-diff: 272887ns - 259% slower
deep-object-diff: 160019ns - 111% slower
jsdiff: 1688294ns - 2123% slower
microdiff: 75934ns - Fastest
```

These benchmarks are currently only for one small object and a very large object, so they might not be accurate. I will be working on creating benchmarks with more varying types.

# Contributing
				 
Thanks for helping the project out! Contributing is pretty simple. Fork the repository (if you need more information on how to do this, check out [this GitHub guide](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)), clone it to your computer, and start programming! To compile the program, run `npm run build` (replace `npm` with `pnpm` or `yarn` if you are using one of those). This will create CommonJS and ESM modules in `/dist`. 

To benchmark microdiff, you can run `npm run bench`. This will automatically build Microdiff and run a benchmarking program comparing microdiff to other common diffing libraries. 

Finally, Microdiff has an extensive test suite which you should take advantage of. To make sure everything is working correctly, you can run `npm run test`. `npm run test` builds the project and then runs the entire test suite on the new version. If you are fixing a bug, be sure to add a test for that.
Also, make sure you read the [Code of Conduct](https://github.com/AsyncBanana/microdiff/blob/master/CODE_OF_CONDUCT.md) before contributing.
