import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readDoc = (name: string) => readFileSync(resolve(process.cwd(), "../../docs", name), "utf8");
const readRepositoryReadme = () => readFileSync(resolve(process.cwd(), "../../README.md"), "utf8");

describe("design governance guidance", () => {
  it("anchors foundation guidance to the current token layer and primitives", () => {
    const foundation = readDoc("design-foundation.md");
    for (const value of ["--sf-*", "--sf-space-1", "--sf-space-4", "Button", "Text", "List", "Table", "Form", "Field", "Label", "Select", "Switch", "WCAG 2.2 AA", "New visual decisions"]) {
      expect(foundation).toContain(value);
    }
  });

  it("covers composition, component contracts, restraint, exceptions, and decision boundaries", () => {
    const composition = readDoc("ui-composition-rules.md");
    for (const value of ["page purpose", "primary `Button`", "Form`, `Field`, and `Label`", "loading, empty, error, and disabled", "Component Design Contract", "Purpose", "Anatomy", "Public API", "hover, active, focus, disabled, loading, and error", "keyboard, focus, accessible-name, and responsive", "Do and Don't", "decorative gradients", "glassmorphism", "neumorphism", "exception", "purpose", "user value", "hard-coded-style", "semantic HTML/ARIA", "human decision"]) {
      expect(composition).toContain(value);
    }
  });

  it("links both governance guides from the repository Read next index", () => {
    const readme = readRepositoryReadme();
    expect(readme).toContain("[Design foundation](docs/design-foundation.md)");
    expect(readme).toContain("[UI composition rules](docs/ui-composition-rules.md)");
  });
});
