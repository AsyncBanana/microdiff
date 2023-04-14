import test from "node:test";
import assert from "node:assert";
import diff from "../dist/index.js";

test("Handles equal regex", () => {
	assert.deepStrictEqual(diff({ regex: /a/ }, { regex: /a/ }), []);
});

test("Handles unequal regex", () => {
	assert.deepStrictEqual(diff({ regex: /a/ }, { regex: /b/ }), [
		{
			type: "CHANGE",
			path: ["regex"],
			value: /b/,
			oldValue: /a/,
		},
	]);
});
