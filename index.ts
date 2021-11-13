interface Difference {
	type: "CREATE" | "REMOVE" | "CHANGE";
	path: (string | number)[];
	value?: any;
}
interface Options {
	cyclesFix: boolean;
}
const t = true;
const richTypes = { Date: t, RegExp: t, String: t, Number: t };
export function diff(
	obj: Record<string, any> | any[],
	newObj: Record<string, any> | any[],
	options: Partial<Options> = { cyclesFix: true },
	_stack: Record<string, any>[] = []
): Difference[] {
	let diffs: Difference[] = [];
	for (const key in obj) {
		const objKey = obj[key];
		const path = Array.isArray(obj) ? +key : key;
		if (!(key in newObj)) {
			diffs.push({
				type: "REMOVE",
				path: [path],
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
			(options.cyclesFix ? !_stack.includes(objKey) : true)
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
			});
		}
	}
	for (const key in newObj) {
		if (!(key in obj)) {
			diffs.push({
				type: "CREATE",
				path: [Array.isArray(newObj) ? +key : key],
				value: newObj[key],
			});
		}
	}
	return diffs;
}

export function patch(
    obj: Record<string, any> | any[],
    diffs: Difference[]
): Record<string, any> | any[] {
    var newObj = JSON.parse(JSON.stringify(obj)); // deep clone the source object

    for (const diff of diffs) {
        var currObj = newObj;
        var diffPathLength = diff.path.length;
        var lastPathElement = diff.path[diffPathLength - 1];
        for (var i = 0; i < diffPathLength - 1; i++) {
            currObj = currObj[diff.path[i]];
        }

        switch(diff.type) {
            case "CREATE": // fall-through - equal to: case "CREATE" || "CHANGE"
            case "CHANGE":
                currObj[lastPathElement] = diff.value;
                break;
            case "REMOVE":
                for (const path of diff.path) {
                    if (Array.isArray(currObj[lastPathElement])) {
                        currObj[lastPathElement] = currObj[lastPathElement].filter((e: any, i: number) => i !== path)
                    } else {
                        delete currObj[lastPathElement];
                    }
                }
                break;
        }
    }

    return newObj;
}
