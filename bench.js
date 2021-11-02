import deepDiff from "deep-diff";
import deepObjectDiff from "deep-object-diff";
import { diffJson } from "diff";
import microdiff from "./dist/index.js";
import { hrtime } from "node:process";
import colors from "picocolors";

const obj = {
	test: "test",
	testing: true,
	bananas: "awesome",
	bestFruits: ["bananas", "kiwi", "blueberries"],
};
const newObj = {
	test: "new test",
	testing: true,
	bananas: "awesome",
	bestFruits: ["bananas", "kiwi", "blueberries", "blackberries"],
};
const benchmarks = {
	"deep-diff": () => deepDiff.diff(obj, newObj),
	"deep-object-diff": () => deepObjectDiff.detailedDiff(obj, newObj),
	jsdiff: () => diffJson(obj, newObj),
	microdiff: () => microdiff(obj, newObj),
};
let times = {};
for (let benchmark in benchmarks) {
	times[benchmark] = [];
	for (let i = 1; i < 100; i++) {
		let time = hrtime();
		benchmarks[benchmark]();
		times[benchmark].push(hrtime(time)[1]);
	}
	times[benchmark] =
		times[benchmark].reduce((pv, nv) => pv + nv) / times[benchmark].length;
}
let output = [];
let fastest = "";
for (let time in times) {
	if (!fastest || times[time] < times[fastest]) {
		fastest = time;
	}
}
for (let time in times) {
	output.push(
		`${time}: ${Math.round(times[time])}ns - ${
			fastest === time
				? colors.bold(colors.green("Fastest"))
				: `${Math.round((times[time] / times[fastest] - 1) * 100)}% slower`
		}`
	);
}
console.log(colors.bold(colors.green("Benchmarks\n")) + output.join("\n"));
