interface Difference {
	type: "CREATE" | "REMOVE" | "CHANGE";
	path: string[];
	value?: any;
}
interface Options {
	cyclesFix: boolean;
}
const t = true;
const richTypes = { Date: t, RegExp: t, String: t, Number: t };
export default function diff(
	obj: Record<string, any> | any[],
	newObj: Record<string, any> | any[],
	options: Partial<Options> = { cyclesFix: true },
	_stack: Record<string, any>[] = []
): Difference[] {
	let diffs: Difference[] = [];
	for (const key in obj) {
		if (!(key in newObj)) {
			diffs.push({
				type: "REMOVE",
				path: [key],
			});
			continue;
		}
		const objKey = obj[key];
		const newObjKey = newObj[key];
		const areObjects =
			typeof objKey === "object" && typeof newObjKey === "object";
		if (
			objKey &&
			newObjKey &&
			areObjects &&
			!richTypes[Object.getPrototypeOf(objKey).constructor.name] &&
			(options.cyclesFix ? !_stack.includes(obj[key]) : true)
		) {
			const nestedDiffs = diff(
				objKey,
				newObjKey,
				options,
				options.cyclesFix ? _stack.concat([objKey]) : []
			);
			diffs.push.apply(
				diffs,
				nestedDiffs.map((difference) => {
					difference.path.unshift(key);
					return difference;
				})
			);
		} else if (
			objKey !== newObjKey &&
			!(
				areObjects &&
				(isNaN(objKey)
					? objKey + "" === newObjKey + ""
					: +objKey === +newObjKey)
			)
		) {
			diffs.push({
				path: [key],
				type: "CHANGE",
				value: newObjKey,
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
