import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import GothicShop from '@/app/gothic/GothicShop';
const meta = { title: 'Projects/Nocturne Gothic Shop', component: GothicShop, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof GothicShop>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
