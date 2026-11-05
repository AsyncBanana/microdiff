import test from "node:test";
import assert from "node:assert/strict";
import diff from "../dist/index.js";

for (const key of ["toString", "constructor", "hasOwnProperty", "__proto__"]) {
	test(`detects creating and removing an own ${key} property`, () => {
		const value = { [key]: "own value" };
		assert.deepEqual(diff({}, value), [
			{ type: "CREATE", path: [key], value: "own value" },
		]);
		assert.deepEqual(diff(value, {}), [
			{ type: "REMOVE", path: [key], oldValue: "own value" },
		]);
	});
}

test("ignores inherited enumerable properties", () => {
	const before = Object.assign(Object.create({ inherited: 1 }), { value: 1 });
	const after = Object.assign(Object.create({ inherited: 2, added: 3 }), {
		value: 2,
	});
	assert.deepEqual(diff(before, after), [
		{ type: "CHANGE", path: ["value"], oldValue: 1, value: 2 },
	]);
});

test("handles a shadowed hasOwnProperty on null-prototype objects", () => {
	const before = Object.assign(Object.create(null), { hasOwnProperty: 1 });
	const after = Object.assign(Object.create(null), { hasOwnProperty: 2 });
	assert.deepEqual(diff(before, after), [
		{ type: "CHANGE", path: ["hasOwnProperty"], oldValue: 1, value: 2 },
	]);
});
