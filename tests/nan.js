import test from "node:test";
import assert from "node:assert";
import diff from "../dist/index.js";

test("new NaN value in object", () => {
	assert.deepStrictEqual(diff({}, { testNaN: NaN }), [
		{
			type: "CREATE",
			path: ["testNaN"],
			value: NaN,
		},
	]);
});
test("change NaN value in object", () => {
	assert.deepStrictEqual(diff({ testNaN: NaN }, { testNaN: 0 }), [
		{
			type: "CHANGE",
			path: ["testNaN"],
			value: 0,
			oldValue: NaN,
		},
	]);
});
test("do not change NaN value in object", () => {
	assert.deepStrictEqual(diff({ testNaN: NaN }, { testNaN: NaN }), []);
});
test("remove NaN value in object", () => {
	assert.deepStrictEqual(diff({ testNaN: NaN }, {}), [
		{
			type: "REMOVE",
			path: ["testNaN"],
			oldValue: NaN,
		},
	]);
});
test("new NaN value in array", () => {
	assert.deepStrictEqual(diff([], [NaN]), [
		{
			type: "CREATE",
			path: [0],
			value: NaN,
		},
	]);
});
test("change NaN value in object", () => {
	assert.deepStrictEqual(diff([NaN], [0]), [
		{
			type: "CHANGE",
			path: [0],
			value: 0,
			oldValue: NaN,
		},
	]);
});
test("do not change NaN value in array", () => {
	assert.deepStrictEqual(diff([NaN], [NaN]), []);
});
