import type { Meta, StoryObj } from "@storybook/react";
import DeparturesBoard from "./DeparturesBoard";
const meta = { title: "Projects/Airport Departures", component: DeparturesBoard, parameters: { layout: "fullscreen" } } satisfies Meta<typeof DeparturesBoard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
