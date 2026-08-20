import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it.each(["primary", "secondary", "ghost"] as const)("renders every %s variant at every size", (variant) => {
    for (const size of ["sm", "md", "lg"] as const) {
      const { unmount } = render(<Button size={size} variant={variant}>Save</Button>);
      expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("data-variant", variant);
      expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("data-size", size);
      unmount();
    }
  });

  it("uses native button defaults and forwards the ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Save</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toHaveAttribute("type", "button");
    expect(ref.current).toHaveAttribute("data-variant", "primary");
    expect(ref.current).toHaveAttribute("data-size", "md");
    expect(ref.current).not.toHaveAttribute("variant");
    expect(ref.current).not.toHaveAttribute("size");
  });

  it("delivers enabled clicks once and suppresses disabled or loading activation", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Save</Button>);
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(<Button disabled onClick={onClick}>Save</Button>);
    await user.click(screen.getByRole("button", { name: "Save" }));
    rerender(<Button loading onClick={onClick}>Save</Button>);
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("aria-busy", "true");
  });

  it("uses native keyboard activation for enabled controls and keeps disabled controls out of tab order", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<><Button onClick={onClick}>Save</Button><Button disabled>Disabled</Button><Button loading>Loading</Button></>);
    await user.tab();
    expect(screen.getByRole("button", { name: "Save" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Loading" })).toBeDisabled();
  });

  it("requires an explicit name for icon-only content and keeps decorative icons hidden", () => {
    const Icon = () => <svg aria-hidden="true" data-testid="icon" />;
    expect(() => render(<Button><Icon /></Button>)).toThrow(/requires aria-label/i);
    render(<Button aria-label="Add item"><Icon /></Button>);
    expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("preserves standard native attributes", () => {
    render(<Button data-testid="save" name="intent" type="submit">Save</Button>);
    const button = screen.getByTestId("save");
    fireEvent.click(button);
    expect(button).toHaveAttribute("name", "intent");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("provides a system-color focus fallback when forced colors are active", () => {
    const styles = readFileSync(resolve(process.cwd(), "src/button.css"), "utf8");
    expect(styles).toMatch(/@media\s*\(forced-colors:\s*active\)/);
    expect(styles).toMatch(/outline:\s*var\(--sf-focus-ring-width\)\s+solid\s+CanvasText/);
  });
});
