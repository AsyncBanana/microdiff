import { test } from "uvu";
import * as assert from "uvu/assert";
import diff from "../dist/index.js";

test("Handles recursive references", () => {
	const obj1 = {};
	obj1.a = obj1;
	assert.equal(diff(obj1, obj1), []);
});

test("Handles recursive references more than 1 level up", () => {
	const obj1 = { a: {} };
	obj1.a.b = obj1;
	assert.equal(diff(obj1, obj1), []);
});

test.run();
