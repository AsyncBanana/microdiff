import { test } from "uvu";
import * as assert from "uvu/assert";
import diff from "../dist/index.js";

test("Handles equal dates", () => {
	assert.equal(diff({ date: new Date(1) }, { date: new Date(1) }), []);
});
test("Handles unequal dates", () => {
	assert.equal(diff({ date: new Date(1) }, { date: new Date(2) }), [
		{
			path: ["date"],
			type: "CHANGE",
			value: new Date(2),
			oldValue: new Date(1),
		},
	]);
});
test("Handles value being a date and the other not", () => {
	assert.equal(diff({ date: new Date(1) }, { date: "not date" }), [
		{
			path: ["date"],
			type: "CHANGE",
			value: "not date",
			oldValue: new Date(1),
		},
	]);
	assert.equal(diff({ date: "not date" }, { date: new Date(1) }), [
		{
			path: ["date"],
			type: "CHANGE",
			value: new Date(1),
			oldValue: "not date",
		},
	]);
});

test.run();
