interface Difference {
	type: "CREATE" | "REMOVE" | "CHANGE";
	path: string[];
	value?: any;
}

export default function diff(
	obj: Record<string, any> | any[],
	newObj: Record<string, any> | any[]
): Difference[] {
	let diffs: Difference[] = [];
	for (const key in obj) {
		if (!(key in newObj)) {
			diffs.push({
				type: "REMOVE",
				path: [key],
			});
		} else if (
			obj[key] &&
			typeof obj[key] === "object" &&
			!(obj[key] instanceof Date)
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
				obj[key] instanceof Date &&
				newObj[key] instanceof Date &&
				+obj[key] === +newObj[key]
			)
		) {
			diffs.push({
				path: [key],
				type: "CHANGE",
				value: newObj[key],
			});
		}
	}
	for (const key in newObj) {
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
