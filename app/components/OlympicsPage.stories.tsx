import type { Meta, StoryObj } from "@storybook/react";
import OlympicsPage from "./OlympicsPage";

const meta = {
  title: "Pages/Olympics",
  component: OlympicsPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof OlympicsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};