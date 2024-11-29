import { detailedDiff } from "deep-object-diff";
import { run, bench } from "mitata";
import microdiff from "./dist/index.js";
import { diffJson } from "diff";
import deepDiff from "deep-diff";
import colors from "picocolors";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { argv } from "node:process";
const benchmarkType = argv.includes("--theoretical")
	? "theoretical"
	: "applied";
const avgs = [];
const benchmarks = readdirSync(resolve("./benchmarks", benchmarkType)).filter(
	(file) => !file.startsWith("_"),
);
console.log(`Running ${benchmarks.length} ${benchmarkType} benchmarks`);
for (const file of benchmarks) {
	const benchmark = await import(resolve("benchmarks", benchmarkType, file));
	const obj = benchmark.original;
	const newObj = benchmark.changed;

	bench("microdiff (no cycles)", () =>
		microdiff(obj, newObj, { cyclesFix: false }),
	);
	bench("microdiff", () => microdiff(obj, newObj));
	bench("deep-diff", () => deepDiff.diff(obj, newObj));
	bench("deep-object-diff", () => detailedDiff(obj, newObj));
	bench("jsDiff", () => diffJson(obj, newObj));

	console.log(colors.green(colors.bold(benchmark.name)));
	const res = await run();
	const baselineAvg = res.benchmarks.find(
		(subres) => subres.alias == "microdiff (no cycles)",
	).runs[0].stats.avg;
	avgs.push(
		res.benchmarks.map((subres) => ({
			alias: subres.alias,
			avg: subres.runs[0].stats.avg / baselineAvg,
		})),
	);
}
const mean = {};
for (const ben of avgs) {
	for (const algo of ben) {
		if (!mean[algo.alias]) {
			mean[algo.alias] = algo.avg;
		} else mean[algo.alias] *= algo.avg;
	}
}
console.log(
	colors.bold(
		colors.green(
			"Geometric mean of time per operation relative to Microdiff (no cycles) (100%==equal time, lower is better)",
		),
	),
);
for (const algo in mean) {
	console.log(
		`${algo}: ${Math.round(Math.pow(mean[algo], 1 / benchmarks.length) * 100)}%`,
	);
}
