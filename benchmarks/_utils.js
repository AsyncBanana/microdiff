const characters = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
export function generateRandomString(len = 5) {
	let randomString = "";
	for (let characterCount = 0; characterCount < len; characterCount++) {
		randomString += characters[Math.round(Math.random() * characters.length)];
	}
	return randomString;
}
