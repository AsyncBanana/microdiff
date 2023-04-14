import test, { describe } from "node:test";
import assert from "node:assert";
import diff from "../dist/index.js";
test("Handles equal dates", () => {
	assert.deepStrictEqual(
		diff({ date: new Date(1) }, { date: new Date(1) }),
		[]
	);
});
test("Handles unequal dates", () => {
	assert.deepStrictEqual(diff({ date: new Date(1) }, { date: new Date(2) }), [
		{
			path: ["date"],
			type: "CHANGE",
			value: new Date(2),
			oldValue: new Date(1),
		},
	]);
});
test("Handles value being a date and the other not", () => {
	assert.deepStrictEqual(diff({ date: new Date(1) }, { date: "not date" }), [
		{
			path: ["date"],
			type: "CHANGE",
			value: "not date",
			oldValue: new Date(1),
		},
	]);
	assert.deepStrictEqual(diff({ date: "not date" }, { date: new Date(1) }), [
		{
			path: ["date"],
			type: "CHANGE",
			value: new Date(1),
			oldValue: "not date",
		},
	]);
});
