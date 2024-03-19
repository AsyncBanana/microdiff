import test from "node:test";
import assert from "node:assert";
import diff from "../dist/index.js";

test("top level array & array diff", () => {
	assert.deepStrictEqual(diff(["test", "testing"], ["test"]), [
		{
			type: "REMOVE",
			path: [1],
			oldValue: "testing",
		},
	]);
});

test("nested array", () => {
	assert.deepStrictEqual(
		diff(["test", ["test"]], ["test", ["test", "test2"]]),
		[
			{
				type: "CREATE",
				path: [1, 1],
				value: "test2",
			},
		],
	);
});

test("object in array in object", () => {
	assert.deepStrictEqual(
		diff(
			{ test: ["test", { test: true }] },
			{ test: ["test", { test: false }] },
		),
		[
			{
				type: "CHANGE",
				path: ["test", 1, "test"],
				value: false,
				oldValue: true,
			},
		],
	);
});

test("array to object", () => {
	assert.deepStrictEqual(diff({ data: [] }, { data: { val: "test" } }), [
		{ type: "CHANGE", path: ["data"], value: { val: "test" }, oldValue: [] },
	]);
});
