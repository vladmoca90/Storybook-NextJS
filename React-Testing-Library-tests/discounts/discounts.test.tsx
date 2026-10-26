import { fireEvent, render, screen } from "@testing-library/react";
import DiscountShop from "@/app/discounts/DiscountShop";

describe("discounts project", () => {
  it("filters products by category", () => {
    render(<DiscountShop />);

    fireEvent.click(screen.getByRole("button", { name: "Audio" }));

    expect(screen.getByRole("heading", { name: "Cloud Headphones" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pebble Speaker" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Halo Table Lamp" })).not.toBeInTheDocument();
  });
});
