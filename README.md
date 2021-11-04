<div align="center">

![Microdiff Logo](https://raw.githubusercontent.com/AsyncBanana/microdiff/master/Logo.svg)

Microdiff is a tiny (currently <1kb), fast, zero dependency object and array comparison library. It is significantly faster than most other deep comparison libraries, and has full TypeScript support.

![Minizipped Size (from Bundlephobia)](https://img.shields.io/bundlephobia/minzip/microdiff?style=flat-square) ![License](https://img.shields.io/npm/l/microdiff?style=flat-square) ![dependency Count](https://img.shields.io/badge/dependencies-0-green?style=flat-square)

</div>

# Get started

First, install Microdiff

```
npm i microdiff
```

If you are using Deno, you can import it from Deno.land with the link `https://deno.land/x/microdiff@VERSION/index.ts` (remember to change `@VERSION` to the version you want to use).

After you install it, simply import it and run it on two objects.

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

There are three different types of changes. `CREATE`, `REMOVE`, and `CHANGE`. The `path` property gives a path to the property in the new object (or the old object in the case of `REMOVE`). Each element in the array is a key to the next property a level deeper until you get to the property changed. The `value` property exists in types `CREATE` and `CHANGE`, and it contains the value of the property added/changed.

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
