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

function isObject(value: any): value is object {
	return value !== null && typeof value === "object";
}

function isArray(value: any): value is any[] {
	return Array.isArray(value);
}

function isRichType(value: any): boolean {
	return richTypes[Object.getPrototypeOf(value)?.constructor?.name] ?? false;
}

export default function diff(
	obj: Record<string, any> | any[],
	newObj: Record<string, any> | any[],
	options: Partial<Options> = { cyclesFix: true },
	_stack: Record<string, any>[] = [],
): Difference[] {
	let diffs: Difference[] = [];
	const isObjArray = isArray(obj);

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
		const areCompatibleObjects =
			isObject(objKey) &&
			isObject(newObjKey) &&
			isArray(objKey) === isArray(newObjKey);
		if (
			objKey &&
			newObjKey &&
			areCompatibleObjects &&
			!isRichType(objKey) &&
			(!options.cyclesFix || !_stack.includes(objKey))
		) {
			const nestedDiffs = diff(
				objKey,
				newObjKey,
				options,
				options.cyclesFix ? _stack.concat([objKey]) : [],
			);
			diffs.push.apply(
				diffs,
				nestedDiffs.map((difference) => {
					difference.path = [path, ...difference.path];
					return difference;
				}),
			);
		} else if (
			objKey !== newObjKey &&
			// treat NaN values as equivalent
			!(Number.isNaN(objKey) && Number.isNaN(newObjKey)) &&
			!(
				areCompatibleObjects &&
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

	const isNewObjArray = isArray(newObj);
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
