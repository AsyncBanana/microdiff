import { test } from "uvu";
import * as assert from "uvu/assert";
import diff from "../dist/index.js";

test("new raw value", () => {
	assert.equal(diff({ test: true }, { test: true, test2: true }), [
		{
			type: "CREATE",
			path: ["test2"],
			value: true,
		},
	]);
});
test("change raw value", () => {
	assert.equal(diff({ test: true }, { test: false }), [
		{
			type: "CHANGE",
			path: ["test"],
			value: false,
		},
	]);
});
test("remove raw value", () => {
	assert.equal(diff({ test: true, test2: true }, { test: true }), [
		{
			type: "REMOVE",
			path: ["test2"],
		},
	]);
});

test("replace object with null", () => {
	assert.equal(diff({ object: { test: true } }, { object: null }), [
		{
			type: "CHANGE",
			path: ["object"],
			value: null,
		},
	]);
});

test("replace object with other value", () => {
	assert.equal(diff({ object: { test: true } }, { object: "string" }), [
		{
			type: "CHANGE",
			path: ["object"],
			value: "string",
		},
	]);
});

test.run();
