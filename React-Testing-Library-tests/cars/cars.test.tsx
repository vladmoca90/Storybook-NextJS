import { fireEvent, render, screen } from "@testing-library/react";
import CarsPage from "@/app/cars/page";

describe("cars project", () => {
  it("filters cars by search query", () => {
    // Render the showroom so its search field and full car list are available.
    render(<CarsPage />);

    // Search by the car's location; the page filters results as the value changes.
    fireEvent.change(screen.getByLabelText("Search"), {
      target: { value: "Manchester" },
    });

    // The matching BMW remains visible while the non-matching Audi is removed.
    expect(screen.getByRole("heading", { name: "BMW 3 Series" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Audi A3 Sportback" })).not.toBeInTheDocument();
  });
});
