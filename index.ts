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

const richTypes = ['Date', 'RegExp', 'String', 'Number'];

const temporalTypes = Object.getOwnPropertyNames(globalThis.Temporal||{});

export default function diff(
	obj: Record<string, any> | any[],
	newObj: Record<string, any> | any[],
	options: Partial<Options> = { cyclesFix: true },
	_stack: Set<Record<string, any>> = new Set(),
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

		// Only compute for non-null objects — primitives and null skip this
		// entirely since Object.getPrototypeOf is expensive to call on every key
		const objConstructor =
			areCompatibleObjects && value
				? Object.getPrototypeOf(value)?.constructor?.name
				: undefined;

		if (
			value &&
			newValue &&
			areCompatibleObjects &&
			!richTypes.includes(objConstructor) &&
			!temporalTypes.includes(objConstructor) &&
			(!options.cyclesFix || !_stack.has(value))
		) {
			// Recurse into objects and arrays
			if (options.cyclesFix) {
				_stack.add(value);
			}

			const subDiffs = diff(value, newValue, options, _stack);

			if (options.cyclesFix) {
				_stack.delete(value);
			}

			for (const subDiff of subDiffs) {
				subDiff.path.unshift(path);
				diffs.push(subDiff);
			}
		} else if (
			!(
				Object.is(value, newValue) /* treat nulls as equivalent */ ||
				(areCompatibleObjects &&
					temporalTypes.includes(objConstructor) &&
					String(value) === String(newValue)) ||
				(areCompatibleObjects &&
					richTypes.includes(objConstructor) &&
					(isNaN(value) ? value + "" === newValue + "" : +value === +newValue))
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
