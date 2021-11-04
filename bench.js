import deepDiff from "deep-diff";
import deepObjectDiff from "deep-object-diff";
import { diffJson } from "diff";
import microdiff from "./dist/index.js";
import { hrtime } from "node:process";
import colors from "picocolors";
const characters = "abcdefghijklmnopqrstuvwxyz1234567890".split("");

async function benchmark(name, obj, newObj, exclude = []) {
	const benchmarks = {
		"deep-diff": () => deepDiff.diff(obj, newObj),
		"deep-object-diff": () => deepObjectDiff.detailedDiff(obj, newObj),
		jsdiff: () => diffJson(obj, newObj),
		microdiff: () => microdiff(obj, newObj),
	};
	let times = {};
	for (let benchmark in benchmarks) {
		if (exclude.includes(benchmark)) {
			continue;
		}
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
	console.log(
		colors.bold(colors.green(`Benchmarks: ${name}\n`)) + output.join("\n")
	);
}

benchmark(
	"Small object (baseline)",
	{
		name: "Testing",
		propertyTwo: "Still testing...",
	},
	{
		name: "TestingChanged",
		propertyThree: "Still testing...",
	}
);
let largeObj = {};
let i = 0;
while (i < 300) {
	let randomString = "";
	for (let characterCount = 0; characterCount < 5; characterCount++) {
		randomString += characters[Math.round(Math.random() * characters.length)];
	}
	if (!largeObj[randomString]) {
		largeObj[randomString] = Math.random() * 100;
		i++;
	}
}
let newLargeObj = {};
for (let randomProperty in largeObj) {
	if (Math.random() > 0.95) {
		newLargeObj[randomProperty] = Math.random() * 100;
	} else if (!Math.random() < 0.975) {
		newLargeObj[randomProperty] = largeObj[randomProperty];
	}
}
benchmark("Large Object (300 properties)", largeObj, newLargeObj);
