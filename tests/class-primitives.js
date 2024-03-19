import test from "node:test";
import assert from "node:assert";
import diff from "../dist/index.js";

test("Handles equal string classes", () => {
	assert.deepStrictEqual(
		diff({ string: new String("hi") }, { string: new String("hi") }),
		[]
	);
});

test("Handles equal number classes", () => {
	assert.deepStrictEqual(
		diff({ number: new Number(1) }, { number: new Number(1) }),
		[]
	);
});

test("Handles unequal number classes", () => {
	assert.deepStrictEqual(
		diff({ number: new Number(1) }, { number: new Number(2) }),
		[
			{
				type: "CHANGE",
				path: ["number"],
				value: new Number(2),
				oldValue: new Number(1),
			},
		]
	);
});
