interface Difference {
	type: "CREATE" | "REMOVE" | "CHANGE";
	path: (string | number)[];
	value?: any;
	oldValue?: any;
}
interface Options {
	cyclesFix: boolean;
}

const richTypes = { Date: 1, RegExp: 1, String: 1, Number: 1 };
const o = "object";
export default function diff(
	obj: Record<string, any> | any[],
	newObj: Record<string, any> | any[],
	opts: Partial<Options> = { cyclesFix: true },
	_stack: Record<string, any>[] = []
): Difference[] {
	let diffs: Difference[] = [];
	const isObjArray = Array.isArray(obj);

	for (const key in obj) {
		const objKey = obj[key];
		const path = isObjArray ? +key : key;
		if (!(key in newObj)) {
			diffs.push({
				type: "REMOVE",
				path: [path],
				oldValue: obj[key],
			});
			continue;
		}
		const newObjKey = newObj[key];
		const areObjects = typeof objKey === o && typeof newObjKey === o;
		if (
			objKey &&
			newObjKey &&
			areObjects &&
			!richTypes[Object.getPrototypeOf(objKey).constructor.name] &&
			(!opts.cyclesFix || !_stack.includes(objKey))
		) {
			const nestedDiffs = diff(
				objKey,
				newObjKey,
				opts,
				opts.cyclesFix ? _stack.concat([objKey]) : []
			);
			diffs.push.apply(
				diffs,
				nestedDiffs.map((difference) => (difference.path.unshift(path), difference))
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
				path: [path],
				type: "CHANGE",
				value: newObjKey,
				oldValue: objKey,
			});
		}
	}

	const isNewObjArray = Array.isArray(newObj);
	for (const key in newObj) {
		if (!(key in obj)) {
			diffs.push({
				type: "CREATE",
				path: [isNewObjArray ? +key : key],
				value: newObj[key],
			});
		}
	}
	return diffs;
}
