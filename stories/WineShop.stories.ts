import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import WineShop from "@/app/wines/WineShop";

const meta = {
  title: "Projects/Wine Shop",
  component: WineShop,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof WineShop>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
