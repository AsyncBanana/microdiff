import test from "node:test";
import assert from "node:assert/strict";
import diff from "../dist/index.js";

test("independently allocated equal cycles have no changes", () => {
	const before = { value: 1 };
	before.self = before;
	const after = { value: 1 };
	after.self = after;
	assert.deepEqual(diff(before, after), []);
});

test("reports a changed leaf once when both roots are cyclic", () => {
	const before = { value: 1 };
	before.self = before;
	const after = { value: 2 };
	after.self = after;
	assert.deepEqual(diff(before, after), [
		{ type: "CHANGE", path: ["value"], oldValue: 1, value: 2 },
	]);
});

test("continues comparing a repeated old object against a different new object", () => {
	const before = {};
	before.self = before;
	const after = { self: { self: { extra: true } } };
	assert.deepEqual(diff(before, after), [
		{ type: "REMOVE", path: ["self", "self", "self"], oldValue: before },
		{ type: "CREATE", path: ["self", "self", "extra"], value: true },
	]);
});

test("compares shared objects separately outside their ancestor path", () => {
	const child = { value: 1 };
	assert.deepEqual(
		diff({ a: child, b: child }, { a: { value: 2 }, b: { value: 3 } }),
		[
			{ type: "CHANGE", path: ["a", "value"], oldValue: 1, value: 2 },
			{ type: "CHANGE", path: ["b", "value"], oldValue: 1, value: 3 },
		],
	);
});
