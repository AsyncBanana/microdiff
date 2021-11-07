interface Difference {
	type: "CREATE" | "REMOVE" | "CHANGE";
	path: string[];
	value?: any;
}
const t = true;
const richTypes = { Date: t, RegExp: t, String: t, Number: t };
export default function diff(
	obj: Record<string, any> | any[],
	newObj: Record<string, any> | any[]
): Difference[] {
	let diffs: Difference[] = [];
	const keys = Object.keys(obj);
	for(let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (!(key in newObj)) {
			diffs.push({
				type: "REMOVE",
				path: [key],
			});
		} else if (
			obj[key] &&
			typeof obj[key] === "object" &&
			!richTypes[Object.getPrototypeOf(obj[key]).constructor.name]
		) {
			const nestedDiffs = diff(obj[key], newObj[key]);
			diffs.push(
				...nestedDiffs.map((difference) => {
					difference.path.unshift(key);
					return difference;
				})
			);
		} else if (
			obj[key] !== newObj[key] &&
			!(
				typeof obj[key] === "object" &&
				typeof newObj[key] === "object" &&
				(isNaN(obj[key])
					? obj[key] + "" === newObj[key] + ""
					: +obj[key] === +newObj[key])
			)
		) {
			diffs.push({
				path: [key],
				type: "CHANGE",
				value: newObj[key],
			});
		}
	}
	const nkeys = Object.keys(newObj);
	for(let i = 0; i < nkeys.length; i++) {
		const key = nkeys[i];
		if (!(key in obj)) {
			diffs.push({
				type: "CREATE",
				path: [key],
				value: newObj[key],
			});
		}
	}
	return diffs;
}
