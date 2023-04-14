import test from "node:test";
import assert from "node:assert";
import diff from "../dist/index.js";

test("new raw value", () => {
	assert.deepStrictEqual(diff({ test: true }, { test: true, test2: true }), [
		{
			type: "CREATE",
			path: ["test2"],
			value: true,
		},
	]);
});
test("change raw value", () => {
	assert.deepStrictEqual(diff({ test: true }, { test: false }), [
		{
			type: "CHANGE",
			path: ["test"],
			value: false,
			oldValue: true,
		},
	]);
});
test("remove raw value", () => {
	assert.deepStrictEqual(diff({ test: true, test2: true }, { test: true }), [
		{
			type: "REMOVE",
			path: ["test2"],
			oldValue: true,
		},
	]);
});

test("replace object with null", () => {
	assert.deepStrictEqual(diff({ object: { test: true } }, { object: null }), [
		{
			type: "CHANGE",
			path: ["object"],
			value: null,
			oldValue: { test: true },
		},
	]);
});

test("replace object with other value", () => {
	assert.deepStrictEqual(
		diff({ object: { test: true } }, { object: "string" }),
		[
			{
				type: "CHANGE",
				path: ["object"],
				value: "string",
				oldValue: { test: true },
			},
		]
	);
});

test("equal null protype objects", () => {
	assert.deepStrictEqual(diff(Object.create(null), Object.create(null)), []);
});

test("unequal null protype objects", () => {
	const obj1 = Object.create(null);
	const obj2 = Object.create(null);
	obj2.test = true;
	assert.deepStrictEqual(diff(obj1, obj2), [
		{
			type: "CREATE",
			path: ["test"],
			value: true,
		},
	]);
});
