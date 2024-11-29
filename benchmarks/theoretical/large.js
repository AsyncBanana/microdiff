import { generateRandomString } from "../_utils.js";

export const name = "Large Object (300 Properties)";
export const original = {};
export const changed = {};

let i = 0;
while (i < 300) {
	const randomString = generateRandomString();
	if (!original[randomString]) {
		original[randomString] = Math.random() * 100;
		//nestedObj[(i - (i % 100)) / 100][((i % 100) - (i % 10)) / 10][i % 10];
		i++;
	}
}

for (let randomProperty in original) {
	if (Math.random() > 0.95) {
		changed[randomProperty] = Math.round(Math.random() * 100);
	} else if (!Math.random() < 0.975) {
		changed[randomProperty] = original[randomProperty];
	}
}
