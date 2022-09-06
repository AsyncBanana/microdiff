export interface DifferenceCreate {
	type: "CREATE";
	path: (string | number)[];
	value: any;
}

export interface DifferenceRemove {
	type: "REMOVE";
	path: (string | number)[];
	oldValue: any;
}

export interface DifferenceChange {
	type: "CHANGE";
	path: (string | number)[];
	value: any;
	oldValue: any;
}

export type Difference = DifferenceCreate | DifferenceRemove | DifferenceChange;

interface Options {
	cyclesFix: boolean;
}

const richTypes = { Date: true, RegExp: true, String: true, Number: true };

export default function diff(
	obj: Record<string, any> | any[],
	newObj: Record<string, any> | any[],
	options: Partial<Options> = { cyclesFix: true },
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
		const areObjects =
			typeof objKey === "object" && typeof newObjKey === "object";
		if (
			objKey &&
			newObjKey &&
			areObjects &&
			!richTypes[Object.getPrototypeOf(objKey).constructor.name] &&
			(!options.cyclesFix || !_stack.includes(objKey))
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
					difference.path.unshift(path);
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
