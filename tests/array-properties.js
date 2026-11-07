import test from "node:test";
import assert from "node:assert/strict";
import diff from "../dist/index.js";

for (const key of ["label", "01", "-1", "1.5", "4294967295"]) {
	test(`preserves the array property path ${key}`, () => {
		const oldValue = Object.assign([], { [key]: "before" });
		const value = Object.assign([], { [key]: "after" });
		assert.deepEqual(diff(oldValue, value), [
			{ type: "CHANGE", path: [key], oldValue: "before", value: "after" },
		]);
		assert.deepEqual(diff([], value), [
			{ type: "CREATE", path: [key], value: "after" },
		]);
		assert.deepEqual(diff(oldValue, []), [
			{ type: "REMOVE", path: [key], oldValue: "before" },
		]);
	});
}

test("retains numeric paths for array indices", () => {
	assert.deepEqual(diff(["before"], ["after"]), [
		{ type: "CHANGE", path: [0], oldValue: "before", value: "after" },
	]);
});
