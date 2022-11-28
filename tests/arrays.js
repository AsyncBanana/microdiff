import { test } from "uvu";
import * as assert from "uvu/assert";
import diff from "../dist/index.js";

test("top level array & array diff", () => {
	assert.equal(diff(["test", "testing"], ["test"]), [
		{
			type: "REMOVE",
			path: [1],
			oldValue: "testing",
		},
	]);
});

test("nested array", () => {
	assert.equal(diff(["test", ["test"]], ["test", ["test", "test2"]]), [
		{
			type: "CREATE",
			path: [1, 1],
			value: "test2",
		},
	]);
});

test("object in array in object", () => {
	assert.equal(
		diff(
			{ test: ["test", { test: true }] },
			{ test: ["test", { test: false }] }
		),
		[
			{
				type: "CHANGE",
				path: ["test", 1, "test"],
				value: false,
				oldValue: true,
			},
		]
	);
});

test("plain object in array in object", () => {
	const src = Object.create(null)
	const dist = Object.create({ a: 1 })
	assert.equal(
		diff([src], [dist]),
		[
			{
				type: "CREATE",
				path: [0, "a"],
				value: 1,
			},
		]
	);
});

test.run();
