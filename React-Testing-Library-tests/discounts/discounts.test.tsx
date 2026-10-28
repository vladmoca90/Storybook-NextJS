import { fireEvent, render, screen } from "@testing-library/react";
import DiscountShop from "@/app/discounts/DiscountShop";

describe("discounts project", () => {
  it("filters products by category", () => {
    // Render the shop with its default collection of products.
    render(<DiscountShop />);

    // Select the Audio category to filter the displayed product cards.
    fireEvent.click(screen.getByRole("button", { name: "Audio" }));

    // Audio products remain visible, while a product from another category is hidden.
    expect(screen.getByRole("heading", { name: "Cloud Headphones" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pebble Speaker" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Halo Table Lamp" })).not.toBeInTheDocument();
  });
});
