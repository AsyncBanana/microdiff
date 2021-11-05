import { test } from "uvu";
import * as assert from "uvu/assert";
import diff from "../dist/index.js";

test("Handles equal regex", () => {
	assert.equal(diff({ regex: /a/ }, { regex: /a/ }), []);
});

test("Handles unequal regex", () => {
	assert.equal(diff({ regex: /a/ }, { regex: /b/ }), [
		{
			type: "CHANGE",
			path: ["regex"],
			value: /b/,
		},
	]);
});

test.run();
