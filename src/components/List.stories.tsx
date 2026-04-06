import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import List from "./List";
import { items } from "../lib/utils";

const meta = {
  component: List,
  args: {
    items,
  },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ItemSelected: Story = {
  play: async ({ canvas, userEvent }) => {
    let item = canvas.getByTestId(`item-${items[0].name}`);
    await expect(item).not.toHaveClass("selected");
    await userEvent.click(item);
    item = canvas.getByTestId(`item-${items[0].name}`);
    await expect(item).toHaveClass("selected");
  },
};

export const MultipleItemsSelcted: Story = {
  play: async ({ canvas, userEvent }) => {
    let item = canvas.getByTestId(`item-${items[0].name}`);
    await expect(item).not.toHaveClass("selected");
    let item2 = canvas.getByTestId(`item-${items[1].name}`);
    await expect(item2).not.toHaveClass("selected");

    await userEvent.click(item);
    await userEvent.click(item2);
    item = canvas.getByTestId(`item-${items[0].name}`);
    await expect(item).toHaveClass("selected");
    item2 = canvas.getByTestId(`item-${items[1].name}`);
    await expect(item2).toHaveClass("selected");
  },
};

export const NamesOfSelectedAppear: Story = {
  play: async ({ canvas, userEvent }) => {
    const selectedNames = canvas.getByTestId("selected-names");
    await expect(selectedNames).toHaveTextContent("");
    const item = canvas.getByTestId(`item-${items[0].name}`);
    await userEvent.click(item);
    const item2 = canvas.getByTestId(`item-${items[1].name}`);
    await userEvent.click(item2);
    await expect(selectedNames).toHaveTextContent(items[0].name);
    await expect(selectedNames).toHaveTextContent(items[1].name);
    await expect(selectedNames).not.toHaveTextContent(items[2].name);
  },
};
