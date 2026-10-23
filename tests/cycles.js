import test from "node:test";
import assert from "node:assert";
import diff from "../dist/index.js";

for (const [name, options] of [
	["omitted options", undefined],
	["empty options", {}],
	["undefined cyclesFix", { cyclesFix: undefined }],
	["enabled cyclesFix", { cyclesFix: true }],
]) {
	test(`Handles recursive references (${name})`, () => {
		const obj1 = {};
		obj1.a = obj1;
		assert.deepStrictEqual(diff(obj1, obj1, options), []);
	});

	test(`Handles recursive references more than 1 level up (${name})`, () => {
		const obj1 = { a: {} };
		obj1.a.b = obj1;
		assert.deepStrictEqual(diff(obj1, obj1, options), []);
	});
}
test("Can disable cycle protection for non-cyclic objects", () => {
	assert.deepStrictEqual(
		diff({ a: { b: 1 } }, { a: { b: 2 } }, { cyclesFix: false }),
		[{ type: "CHANGE", path: ["a", "b"], oldValue: 1, value: 2 }],
	);
});
