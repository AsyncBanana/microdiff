import test from "node:test";
import assert from "node:assert/strict";
import diff from "../dist/index.js";

for (const richValue of [
	new Date(1),
	/test/,
	new String("test"),
	new Number(1),
]) {
	test(`detects changes between objects and ${richValue.constructor.name}`, () => {
		for (const object of [{}, Object.create(null)]) {
			for (const [oldValue, value] of [
				[object, richValue],
				[richValue, object],
			]) {
				assert.deepStrictEqual(diff({ item: oldValue }, { item: value }), [
					{ type: "CHANGE", path: ["item"], oldValue, value },
				]);
			}
		}
	});
}

test("detects changes between rich types with the same primitive representation", () => {
	for (const [first, second] of [
		[new Date(1), new Number(1)],
		[/test/, new String("/test/")],
	]) {
		for (const [oldValue, value] of [
			[first, second],
			[second, first],
		]) {
			assert.deepStrictEqual(diff({ item: oldValue }, { item: value }), [
				{ type: "CHANGE", path: ["item"], oldValue, value },
			]);
		}
	}
});
