import type { Meta, StoryObj } from "@storybook/react";
import MedalChart from "./MedalChart";

const meta = {
  title: "Components/MedalChart",
  component: MedalChart,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MedalChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};