import { test } from "uvu";
import * as assert from "uvu/assert";
import diff from "../dist/index.js";

test("top level array & array diff", () => {
	assert.equal(diff(["test", "testing"], ["test"]), [
		{
			type: "REMOVE",
			path: ["1"],
		},
	]);
});

test("nested array", () => {
	assert.equal(diff(["test", ["test"]], ["test", ["test", "test2"]]), [
		{
			type: "CREATE",
			path: ["1", "1"],
			value: "test2",
		},
	]);
});

test.run();
