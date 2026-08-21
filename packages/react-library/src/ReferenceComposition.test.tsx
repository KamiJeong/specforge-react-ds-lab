import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ReferenceComposition } from "./ReferenceComposition";

describe("ReferenceComposition", () => {
  it("composes named native controls, representative error and empty states, and a data table", () => {
    render(<ReferenceComposition />);
    expect(screen.getByRole("main", { name: "Configuration reference" })).toBeInTheDocument();
    expect(screen.getByRole("form", { name: "Reference preferences" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Region" })).toHaveValue("kr");
    expect(screen.getByRole("combobox", { name: "Update frequency" })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Choose an update frequency.");
    expect(screen.getByRole("switch", { name: "Enable notifications" })).toBeChecked();
    expect(screen.getByRole("table", { name: "Recent configuration activity" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("No additional activity is available.");
  });

  it("keeps represented controls keyboard-operable", async () => {
    const user = userEvent.setup();
    render(<ReferenceComposition />);
    const notifications = screen.getByRole("switch", { name: "Enable notifications" });
    await user.tab();
    await user.tab();
    await user.tab();
    await user.tab();
    expect(notifications).toHaveFocus();
    await user.keyboard(" ");
    expect(notifications).not.toBeChecked();
  });
});
