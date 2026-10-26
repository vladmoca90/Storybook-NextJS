import { fireEvent, render, screen } from "@testing-library/react";
import CarsPage from "@/app/cars/page";

describe("cars project", () => {
  it("filters cars by search query", () => {
    render(<CarsPage />);

    fireEvent.change(screen.getByLabelText("Search"), {
      target: { value: "Manchester" },
    });

    expect(screen.getByRole("heading", { name: "BMW 3 Series" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Audi A3 Sportback" })).not.toBeInTheDocument();
  });
});
