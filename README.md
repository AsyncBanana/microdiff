# Microdiff

![Minizipped Size (from Bundlephobia)](https://img.shields.io/bundlephobia/minzip/microdiff?style=flat-square) ![License](https://img.shields.io/npm/l/microdiff?style=flat-square) ![dependency Count](https://img.shields.io/badge/dependencies-0-green?style=flat-square)

Microdiff is a tiny (currently <1kb), fast, zero dependency object and array comparison library. It is significantly faster than most other deep comparison libraries, and has full TypeScript support.

## Get started

First, install Microdiff

```
npm i microdiff
```

Then, simply import it and run it on two objects.

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
