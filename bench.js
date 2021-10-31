import deepDiff from "deep-diff";
import deepObjectDiff from "deep-object-diff";
import microdiff from "./dist/index.js";
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
console.time("deep-diff");
deepDiff.diff(obj, newObj);
console.timeEnd("deep-diff");
console.time("deep-object-diff");
deepObjectDiff.detailedDiff(obj, newObj);
console.timeEnd("deep-object-diff");
console.time("microdiff");
microdiff(obj, newObj);
console.timeEnd("microdiff");
