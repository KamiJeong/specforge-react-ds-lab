import { readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const packageRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const staticRoot = resolve(packageRoot, "storybook-static");
const expectedStories = [
  "components-button--primary",
  "components-button--secondary",
  "components-button--ghost",
  "components-button--small",
  "components-button--medium",
  "components-button--large",
  "components-button--disabled",
  "components-button--loading",
  "components-button--focus-visible",
  "components-button--icon-only-named",
  "components-text--default",
  "components-list--unordered",
  "components-table--default",
  "components-form--default",
  "components-field--with-help",
  "components-label--default",
  "components-select--default",
  "components-select--disabled",
  "components-select--error",
  "components-select--focus-visible",
  "components-switch--unchecked",
  "components-switch--checked",
  "components-switch--disabled",
  "components-switch--focus-visible",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function contentType(path) {
  return ({ ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml" })[extname(path)] ?? "text/html";
}

function fileForRequest(requestUrl) {
  const pathname = new URL(requestUrl, "http://127.0.0.1").pathname;
  const candidate = normalize(resolve(staticRoot, `.${pathname === "/" ? "/index.html" : pathname}`));
  assert(candidate.startsWith(`${staticRoot}/`), "Refused a path outside the Storybook build.");
  try {
    return statSync(candidate).isDirectory() ? resolve(candidate, "index.html") : candidate;
  } catch {
    return resolve(staticRoot, "index.html");
  }
}

const index = JSON.parse(readFileSync(resolve(staticRoot, "index.json"), "utf8"));
for (const storyId of expectedStories) assert(index.entries[storyId], `Missing required Storybook story: ${storyId}`);

const server = createServer((request, response) => {
  try {
    const file = fileForRequest(request.url ?? "/");
    response.writeHead(200, { "content-type": contentType(file) });
    response.end(readFileSync(file));
  } catch (error) {
    response.writeHead(500, { "content-type": "text/plain" });
    response.end(error instanceof Error ? error.message : "Unable to serve Storybook.");
  }
});

await new Promise((resolveServer) => server.listen(0, "127.0.0.1", resolveServer));
const address = server.address();
assert(address && typeof address !== "string", "Unable to start the Storybook verification server.");
const baseUrl = `http://127.0.0.1:${address.port}`;

try {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(`${baseUrl}/index.html?path=/docs/components-button--docs`, { waitUntil: "networkidle" });
    assert((await page.locator("body").innerText()).includes("Button"), "Button documentation did not render.");
    await page.goto(`${baseUrl}/index.html?path=/docs/components-switch--docs`, { waitUntil: "networkidle" });
    assert((await page.locator("body").innerText()).includes("Switch"), "Switch documentation did not render.");
    await page.goto(`${baseUrl}/index.html?path=/docs/components-form--docs`, { waitUntil: "networkidle" });
    assert((await page.locator("body").innerText()).includes("Form"), "Form documentation did not render.");

    await page.goto(`${baseUrl}/iframe.html?id=components-button--focus-visible`, { waitUntil: "networkidle" });
    const button = page.getByRole("button", { name: "Continue" });
    await button.focus();
    const normalFocus = await button.evaluate((element) => getComputedStyle(element).boxShadow);
    assert(normalFocus !== "none", "Normal focus-visible treatment is not rendered.");

    await page.emulateMedia({ forcedColors: "active" });
    await button.focus();
    const forcedColors = await button.evaluate((element) => {
      const styles = getComputedStyle(element);
      return { active: matchMedia("(forced-colors: active)").matches, outlineStyle: styles.outlineStyle, outlineWidth: styles.outlineWidth };
    });
    assert(forcedColors.active && forcedColors.outlineStyle === "solid" && forcedColors.outlineWidth !== "0px", "Forced-colors focus fallback is not rendered.");

    await page.emulateMedia({ forcedColors: "none" });
    await page.goto(`${baseUrl}/iframe.html?id=components-switch--unchecked`, { waitUntil: "networkidle" });
    const switchControl = page.getByRole("switch", { name: "Email notifications" });
    await switchControl.focus();
    await page.keyboard.press("Space");
    assert(await switchControl.isChecked(), "Switch does not toggle with Space.");

    await page.goto(`${baseUrl}/iframe.html?id=components-switch--focus-visible`, { waitUntil: "networkidle" });
    const switchFocusControl = page.locator(".sf-switch--focus-visible-story .sf-switch__control");
    const switchFocus = await switchFocusControl.evaluate((element) => getComputedStyle(element).boxShadow);
    assert(switchFocus !== "none", "Switch focus-visible story does not render visible focus treatment.");

    await page.goto(`${baseUrl}/iframe.html?id=components-select--disabled`, { waitUntil: "networkidle" });
    assert(await page.getByRole("combobox", { name: "Region" }).isDisabled(), "Disabled select story is interactive.");
  } finally {
    await browser.close();
  }
} finally {
  await new Promise((resolveServer) => server.close(resolveServer));
}
