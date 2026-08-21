import { copyFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = resolve(packageRoot, "dist");

// Component declarations retain relative stylesheet imports, so ship the bundle
// under each component stylesheet name.
copyFileSync(resolve(distDirectory, "index.css"), resolve(distDirectory, "button.css"));
copyFileSync(resolve(distDirectory, "index.css"), resolve(distDirectory, "primitives.css"));

const cssModuleDeclaration = "declare const css: string;\nexport default css;\n";
writeFileSync(resolve(distDirectory, "button.d.css.ts"), cssModuleDeclaration);
writeFileSync(resolve(distDirectory, "primitives.d.css.ts"), cssModuleDeclaration);
writeFileSync(resolve(distDirectory, "index.d.css.ts"), cssModuleDeclaration);
