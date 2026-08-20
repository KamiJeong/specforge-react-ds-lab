import { copyFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = resolve(packageRoot, "dist");

// Button.d.ts retains this side-effect import, so ship its relative stylesheet.
copyFileSync(resolve(distDirectory, "index.css"), resolve(distDirectory, "button.css"));

const cssModuleDeclaration = "declare const css: string;\nexport default css;\n";
writeFileSync(resolve(distDirectory, "button.d.css.ts"), cssModuleDeclaration);
writeFileSync(resolve(distDirectory, "index.d.css.ts"), cssModuleDeclaration);
