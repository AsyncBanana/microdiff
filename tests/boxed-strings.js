import test from "node:test";
import assert from "node:assert/strict";
import diff from "../dist/index.js";

for (const [before, after] of [
	["01", "1"],
	["", "0"],
	[" ", ""],
	["1e2", "100"],
]) {
	test(`distinguishes boxed strings ${JSON.stringify(before)} and ${JSON.stringify(after)}`, () => {
		const oldValue = new String(before);
		const value = new String(after);
		assert.deepEqual(diff({ item: oldValue }, { item: value }), [
			{ type: "CHANGE", path: ["item"], oldValue, value },
		]);
	});
}

test("matches equal boxed numeric strings", () => {
	assert.deepEqual(
		diff({ item: new String("01") }, { item: new String("01") }),
		[],
	);
});
