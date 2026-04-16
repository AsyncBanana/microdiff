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
	_stack: Record<string, any>[] = [],
): Difference[] {
	let diffs: Difference[] = [];
	const isObjArray = Array.isArray(obj);

	for (const key in obj) {
		const value = obj[key];
		const path = isObjArray ? +key : key;
		if (!(key in newObj)) {
			diffs.push({
				type: "REMOVE",
				path: [path],
				oldValue: value,
			});
			continue;
		}
		const newValue = newObj[key];
		const areCompatibleObjects =
			typeof value === "object" &&
			typeof newValue === "object" &&
			Array.isArray(value) === Array.isArray(newValue);
		if (
			value &&
			newValue &&
			areCompatibleObjects &&
			!richTypes[Object.getPrototypeOf(value)?.constructor?.name] &&
			(!options.cyclesFix || !_stack.includes(value))
		) {
			diffs.push.apply(
				diffs,
				diff(
					value,
					newValue,
					options,
					options.cyclesFix ? _stack.concat([value]) : [],
				).map((difference) => {
					difference.path.unshift(path);
					return difference;
				}),
			);
		} else if (
			value !== newValue &&
			// treat NaN values as equivalent
			!(Number.isNaN(value) && Number.isNaN(newValue)) &&
			!(
				areCompatibleObjects &&
				(isNaN(value) ? value + "" === newValue + "" : +value === +newValue)
			)
		) {
			diffs.push({
				path: [path],
				type: "CHANGE",
				value: newValue,
				oldValue: value,
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
