import { test } from "uvu";
import * as assert from "uvu/assert";
import diff from "../dist/index.js";

test("Handles equal string classes", () => {
	assert.equal(
		diff({ string: new String("hi") }, { string: new String("hi") }),
		[]
	);
});

test("Handles equal number classes", () => {
	assert.equal(diff({ number: new Number(1) }, { number: new Number(1) }), []);
});

test("Handles unequal number classes", () => {
	assert.equal(diff({ number: new Number(1) }, { number: new Number(2) }), [
		{
			type: "CHANGE",
			path: ["number"],
			value: 2,
			oldValue: 1,
		},
	]);
});

test.run();
