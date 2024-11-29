import { generateRandomString } from "../_utils.js";

export const name = "Deeply Nested Object";
export const original = {};

let cur = original;
for (let i = 0; i < 300; i++) {
	const randomString = generateRandomString();
	cur[randomString] = Math.floor(Math.random() * 100);
	cur[randomString + "a"] = {};
	cur = cur[randomString + "a"];
}

export const changed = structuredClone(original);
cur = changed;
for (let i = 0; i < 300; i++) {
	if (Math.random() > 0.9) {
		const randomString = generateRandomString();
		if (!cur[randomString]) cur[randomString] = Math.floor(Math.random() * 100);
	}
	for (const key of Object.keys(cur)) {
		if (typeof cur[key] == "object") cur = cur[key];
	}
}
