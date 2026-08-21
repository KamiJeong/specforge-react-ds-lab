import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Field, Form, Label, List, Select, Switch, Table, Text } from "./index";

describe("content primitives", () => {
  it("renders Text with the selected native element without leaking design props", () => {
    render(<Text as="h2" size="lg" tone="muted" weight="bold" title="Heading">Heading</Text>);
    const heading = screen.getByRole("heading", { level: 2, name: "Heading" });
    expect(heading).toHaveAttribute("title", "Heading");
    expect(heading).toHaveAttribute("data-size", "lg");
    expect(heading).not.toHaveAttribute("size");
    expect(heading).not.toHaveAttribute("tone");
    expect(heading).not.toHaveAttribute("weight");
  });

  it("renders semantic ordered and unordered lists", () => {
    const { rerender } = render(<List><li>One</li></List>);
    expect(screen.getByRole("list")).toBeInstanceOf(HTMLUListElement);
    rerender(<List ordered><li>One</li></List>);
    expect(screen.getByRole("list")).toBeInstanceOf(HTMLOListElement);
  });

  it("renders a native table with a caption and caller-provided column headers", () => {
    render(<Table caption="Team members"><thead><tr><th scope="col">Name</th></tr></thead><tbody><tr><td>Ada</td></tr></tbody></Table>);
    expect(screen.getByRole("table", { name: "Team members" })).toBeInstanceOf(HTMLTableElement);
    expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute("scope", "col");
  });
});

describe("field primitives", () => {
  it("associates labels, help text, and errors with the native control", () => {
    render(<Field error="Choose a role" helpText="Used for permissions" id="role" label="Role"><Select><option>Engineer</option></Select></Field>);
    const select = screen.getByLabelText("Role");
    expect(select).toHaveAttribute("id", "role");
    expect(select).toHaveAttribute("aria-describedby", "role-help role-error");
    expect(select).toHaveAttribute("aria-errormessage", "role-error");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Choose a role");
  });

  it("uses a caller-supplied child control id for label and descriptions", () => {
    render(<Field error="Enter an email" helpText="We'll only use this for your account" id="generated-by-field" label="Email"><input id="email" /></Field>);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("id", "email");
    expect(input).toHaveAttribute("aria-describedby", "email-help email-error");
    expect(input).toHaveAttribute("aria-errormessage", "email-error");
    expect(screen.getByRole("alert")).toHaveAttribute("id", "email-error");
  });

  it("keeps Label usable as a standalone native label", () => {
    render(<><Label htmlFor="email">Email</Label><input id="email" /></>);
    expect(screen.getByLabelText("Email")).toBeInstanceOf(HTMLInputElement);
  });

  it("forwards select refs, uses native options, and retains disabled keyboard behavior", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLSelectElement>();
    render(<><label htmlFor="region">Region</label><Select id="region" options={[{ label: "Korea", value: "kr" }, { label: "Japan", value: "jp" }]} ref={ref} /><Select aria-label="Disabled region" disabled><option>None</option></Select></>);
    const select = screen.getByRole("combobox", { name: "Region" });
    expect(ref.current).toBe(select);
    await user.selectOptions(select, "jp");
    expect(select).toHaveValue("jp");
    expect(screen.getByRole("combobox", { name: "Disabled region" })).toBeDisabled();
  });

  it("preserves native numeric size semantics while retaining token-led presentation sizes", () => {
    const { rerender } = render(<Select aria-label="Visible regions" size={4} options={[{ label: "Korea", value: "kr" }, { label: "Japan", value: "jp" }]} />);
    const select = screen.getByLabelText("Visible regions");
    expect(select).toHaveAttribute("size", "4");
    expect(select).toHaveAttribute("data-size", "md");

    rerender(<Select aria-label="Visible regions" size="lg"><option>Korea</option></Select>);
    expect(select).not.toHaveAttribute("size");
    expect(select).toHaveAttribute("data-size", "lg");
  });
});

describe("Form", () => {
  it("exports a ref-forwarding native form without imposing submission behavior", () => {
    const ref = createRef<HTMLFormElement>();
    render(<Form action="/profile" method="post" aria-label="Profile settings" ref={ref}><input name="email" /></Form>);
    const form = screen.getByRole("form", { name: "Profile settings" });
    expect(form).toBeInstanceOf(HTMLFormElement);
    expect(ref.current).toBe(form);
    expect(form).toHaveAttribute("action", "/profile");
    expect(form).toHaveAttribute("method", "post");
  });
});

describe("Switch", () => {
  it("supports uncontrolled, controlled, named, and ref-backed native checkbox behavior", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    const ref = createRef<HTMLInputElement>();
    const { unmount } = render(<Switch defaultChecked label="Email notifications" name="notifications" onCheckedChange={onCheckedChange} ref={ref} />);
    const control = screen.getByRole("switch", { name: "Email notifications" });
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(control).toHaveAttribute("name", "notifications");
    expect(control).toBeChecked();
    await user.tab();
    expect(control).toHaveFocus();
    await user.keyboard(" ");
    expect(control).not.toBeChecked();
    expect(onCheckedChange).toHaveBeenLastCalledWith(false);
    unmount();
    render(<Switch checked label="Email notifications" onCheckedChange={onCheckedChange} />);
    expect(screen.getByRole("switch", { name: "Email notifications" })).toBeChecked();
  });

  it("does not toggle a disabled switch", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch disabled label="Disabled notifications" onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole("switch", { name: "Disabled notifications" });
    await user.click(control);
    expect(control).toBeDisabled();
    expect(control).not.toBeChecked();
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
