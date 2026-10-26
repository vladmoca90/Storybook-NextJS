import { fireEvent, render, screen } from "@testing-library/react";
import DeparturesBoard from "@/app/departures/DeparturesBoard";

describe("departures project", () => {
  it("filters flights by destination and clears the search", () => {
    render(<DeparturesBoard />);

    fireEvent.change(screen.getByRole("textbox", { name: "Search flights" }), {
      target: { value: "Paris" },
    });
    expect(screen.getByText("Showing 1 of 10 flights")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(screen.getByText("Showing 10 of 10 flights")).toBeInTheDocument();
  });
});
