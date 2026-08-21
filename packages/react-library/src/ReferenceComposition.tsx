import { Button } from "./Button";
import { Field } from "./Field";
import { Form } from "./Form";
import { Select } from "./Select";
import { Switch } from "./Switch";
import { Table } from "./Table";
import { Text } from "./Text";
import "./reference-composition.css";

/** Product-neutral Storybook reference for composing existing primitives. */
export function ReferenceComposition() {
  return <main className="sf-reference-composition" aria-labelledby="reference-composition-title">
    <header className="sf-reference-composition__header">
      <div>
        <Text as="h1" id="reference-composition-title" size="lg" weight="bold">Configuration reference</Text>
        <Text tone="muted">A medium-density baseline for settings and data views.</Text>
      </div>
      <Button type="button">Save changes</Button>
    </header>

    <section aria-labelledby="reference-settings-title">
      <Text as="h2" id="reference-settings-title" weight="bold">Preferences</Text>
      <Form aria-label="Reference preferences">
        <Field helpText="Used to format dates and times." id="reference-region" label="Region">
          <Select defaultValue="kr" options={[{ label: "Korea", value: "kr" }, { label: "Japan", value: "jp" }]} />
        </Field>
        <Field error="Choose an update frequency." id="reference-frequency" label="Update frequency">
          <Select defaultValue="" options={[{ label: "Select a frequency", value: "" }, { label: "Daily", value: "daily" }, { label: "Weekly", value: "weekly" }]} />
        </Field>
        <Switch defaultChecked label="Enable notifications" name="reference-notifications" />
      </Form>
    </section>

    <section aria-labelledby="reference-data-title">
      <Text as="h2" id="reference-data-title" weight="bold">Recent activity</Text>
      <Table caption="Recent configuration activity">
        <thead><tr><th scope="col">Change</th><th scope="col">Status</th></tr></thead>
        <tbody><tr><td>Notification preference</td><td>Ready</td></tr></tbody>
      </Table>
      <Text className="sf-reference-composition__empty" role="status" tone="muted">No additional activity is available.</Text>
    </section>
  </main>;
}
