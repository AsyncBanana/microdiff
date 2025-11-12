import diff from "../dist/index.js";
import { original, editado } from "./data/data.js";

console.log("=== Comparación SHALLOW del objeto principal (solo primitivos) ===");
const shallowDiffPrincipal = diff(original, editado, { shallow: true });
console.log(shallowDiffPrincipal);

console.log("\n=== Comparación PROFUNDA del objeto principal ===");
const deepDiffPrincipal = diff(original, editado);
console.log(deepDiffPrincipal);

console.log("\n\n=== Comparación SHALLOW de DatosAuto[0] (solo primitivos) ===");
const shallowDiffDatos = diff(original.DatosAuto[0], editado.DatosAuto[0], {
	shallow: true,
});
console.log(shallowDiffDatos);

console.log("\n=== Comparación PROFUNDA de DatosAuto[0] ===");
const deepDiffDatos = diff(original.DatosAuto[0], editado.DatosAuto[0]);
console.log(deepDiffDatos);
