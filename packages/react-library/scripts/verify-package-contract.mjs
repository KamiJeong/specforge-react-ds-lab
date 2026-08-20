import { cpSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const consumerRoot = mkdtempSync(resolve(tmpdir(), "specforge-react-library-consumer-"));
const require = createRequire(import.meta.url);
const reactTypesRoot = dirname(require.resolve("@types/react/package.json"));

try {
  const installedPackage = resolve(consumerRoot, "node_modules/@specforge/react-library");
  mkdirSync(installedPackage, { recursive: true });
  cpSync(resolve(packageRoot, "dist"), resolve(installedPackage, "dist"), { recursive: true });
  writeFileSync(resolve(installedPackage, "package.json"), readFileSync(resolve(packageRoot, "package.json")));
  cpSync(dirname(require.resolve("react/package.json")), resolve(consumerRoot, "node_modules/react"), { dereference: true, recursive: true });
  cpSync(reactTypesRoot, resolve(consumerRoot, "node_modules/@types/react"), { dereference: true, recursive: true });
  cpSync(resolve(reactTypesRoot, "../../csstype"), resolve(consumerRoot, "node_modules/csstype"), { dereference: true, recursive: true });
  writeFileSync(resolve(consumerRoot, "index.ts"), [
    'import { Button, type ButtonProps } from "@specforge/react-library";',
    'import "@specforge/react-library/tokens.css";',
    "const button: typeof Button = Button;",
    'const props: ButtonProps = { children: "Save", variant: "primary" };',
    "void button;",
    "void props;",
  ].join("\n"));
  writeFileSync(resolve(consumerRoot, "tsconfig.json"), JSON.stringify({
    compilerOptions: {
      module: "ESNext",
      moduleResolution: "Bundler",
      strict: true,
      noEmit: true,
      noUncheckedSideEffectImports: true,
      target: "ES2022",
    },
    include: ["index.ts"],
  }));
  execFileSync(process.execPath, [resolve(packageRoot, "node_modules/typescript/bin/tsc"), "-p", resolve(consumerRoot, "tsconfig.json")], { stdio: "inherit" });
} finally {
  rmSync(consumerRoot, { force: true, recursive: true });
}
