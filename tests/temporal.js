import test from "node:test";
import assert from "node:assert";
import diff from "../dist/index.js";

test("Handles equal Temporal.PlainDate", () => {
	assert.deepStrictEqual(
		diff(
			{ date: Temporal.PlainDate.from("2024-01-15") },
			{ date: Temporal.PlainDate.from("2024-01-15") },
		),
		[],
	);
});
test("Handles unequal Temporal.PlainDate", () => {
	assert.deepStrictEqual(
		diff(
			{ date: Temporal.PlainDate.from("2024-01-15") },
			{ date: Temporal.PlainDate.from("2024-06-01") },
		),
		[
			{
				path: ["date"],
				type: "CHANGE",
				value: Temporal.PlainDate.from("2024-06-01"),
				oldValue: Temporal.PlainDate.from("2024-01-15"),
			},
		],
	);
});
test("Handles equal Temporal.Instant", () => {
	assert.deepStrictEqual(
		diff(
			{ ts: Temporal.Instant.from("2024-01-01T00:00:00Z") },
			{ ts: Temporal.Instant.from("2024-01-01T00:00:00Z") },
		),
		[],
	);
});
test("Handles unequal Temporal.Instant", () => {
	assert.deepStrictEqual(
		diff(
			{ ts: Temporal.Instant.from("2024-01-01T00:00:00Z") },
			{ ts: Temporal.Instant.from("2024-06-01T12:00:00Z") },
		),
		[
			{
				path: ["ts"],
				type: "CHANGE",
				value: Temporal.Instant.from("2024-06-01T12:00:00Z"),
				oldValue: Temporal.Instant.from("2024-01-01T00:00:00Z"),
			},
		],
	);
});
test("Handles equal Temporal.PlainDateTime", () => {
	assert.deepStrictEqual(
		diff(
			{ dt: Temporal.PlainDateTime.from("2024-01-15T10:30:00") },
			{ dt: Temporal.PlainDateTime.from("2024-01-15T10:30:00") },
		),
		[],
	);
});
test("Handles unequal Temporal.PlainDateTime", () => {
	assert.deepStrictEqual(
		diff(
			{ dt: Temporal.PlainDateTime.from("2024-01-15T10:30:00") },
			{ dt: Temporal.PlainDateTime.from("2024-01-15T11:00:00") },
		),
		[
			{
				path: ["dt"],
				type: "CHANGE",
				value: Temporal.PlainDateTime.from("2024-01-15T11:00:00"),
				oldValue: Temporal.PlainDateTime.from("2024-01-15T10:30:00"),
			},
		],
	);
});
test("Handles equal Temporal.ZonedDateTime", () => {
	assert.deepStrictEqual(
		diff(
			{ zdt: Temporal.ZonedDateTime.from("2024-01-15T10:30:00[UTC]") },
			{ zdt: Temporal.ZonedDateTime.from("2024-01-15T10:30:00[UTC]") },
		),
		[],
	);
});
test("Handles equal Temporal.PlainTime", () => {
	assert.deepStrictEqual(
		diff(
			{ time: Temporal.PlainTime.from("10:30:00") },
			{ time: Temporal.PlainTime.from("10:30:00") },
		),
		[],
	);
});
test("Handles equal Temporal.Duration", () => {
	assert.deepStrictEqual(
		diff(
			{ dur: Temporal.Duration.from({ hours: 1, minutes: 30 }) },
			{ dur: Temporal.Duration.from({ hours: 1, minutes: 30 }) },
		),
		[],
	);
});
test("Handles unequal Temporal.Duration", () => {
	assert.deepStrictEqual(
		diff(
			{ dur: Temporal.Duration.from({ hours: 1 }) },
			{ dur: Temporal.Duration.from({ hours: 2 }) },
		),
		[
			{
				path: ["dur"],
				type: "CHANGE",
				value: Temporal.Duration.from({ hours: 2 }),
				oldValue: Temporal.Duration.from({ hours: 1 }),
			},
		],
	);
});
test("Handles Temporal value replaced with non-Temporal", () => {
	assert.deepStrictEqual(
		diff(
			{ date: Temporal.PlainDate.from("2024-01-15") },
			{ date: "2024-01-15" },
		),
		[
			{
				path: ["date"],
				type: "CHANGE",
				value: "2024-01-15",
				oldValue: Temporal.PlainDate.from("2024-01-15"),
			},
		],
	);
});
test("Handles equal Temporal.PlainYearMonth", () => {
	assert.deepStrictEqual(
		diff(
			{ ym: Temporal.PlainYearMonth.from("2024-01") },
			{ ym: Temporal.PlainYearMonth.from("2024-01") },
		),
		[],
	);
});
test("Handles unequal Temporal.PlainYearMonth", () => {
	assert.deepStrictEqual(
		diff(
			{ ym: Temporal.PlainYearMonth.from("2024-01") },
			{ ym: Temporal.PlainYearMonth.from("2024-06") },
		),
		[
			{
				path: ["ym"],
				type: "CHANGE",
				value: Temporal.PlainYearMonth.from("2024-06"),
				oldValue: Temporal.PlainYearMonth.from("2024-01"),
			},
		],
	);
});
test("Handles equal Temporal.PlainMonthDay", () => {
	assert.deepStrictEqual(
		diff(
			{ md: Temporal.PlainMonthDay.from("01-15") },
			{ md: Temporal.PlainMonthDay.from("01-15") },
		),
		[],
	);
});
test("Handles unequal Temporal.PlainMonthDay", () => {
	assert.deepStrictEqual(
		diff(
			{ md: Temporal.PlainMonthDay.from("01-15") },
			{ md: Temporal.PlainMonthDay.from("06-01") },
		),
		[
			{
				path: ["md"],
				type: "CHANGE",
				value: Temporal.PlainMonthDay.from("06-01"),
				oldValue: Temporal.PlainMonthDay.from("01-15"),
			},
		],
	);
});
test("Handles non-Temporal value replaced with Temporal", () => {
	assert.deepStrictEqual(
		diff(
			{ date: "2024-01-15" },
			{ date: Temporal.PlainDate.from("2024-01-15") },
		),
		[
			{
				path: ["date"],
				type: "CHANGE",
				value: Temporal.PlainDate.from("2024-01-15"),
				oldValue: "2024-01-15",
			},
		],
	);
});
