import { fireEvent, render, screen } from "@testing-library/react";
import CountriesExplorer from "@/app/countries/components/CountriesExplorer";

describe("countries project", () => {
  it("searches countries by capital", () => {
    // Render the explorer with the complete country directory.
    render(<CountriesExplorer />);

    // Enter a capital city in the accessible search field to filter the directory.
    fireEvent.change(screen.getByRole("searchbox", { name: "Search by country or capital" }), {
      target: { value: "Bern" },
    });

    // Switzerland matches Bern; an unrelated country such as Germany is excluded.
    expect(screen.getByRole("row", { name: /Switzerland/ })).toBeInTheDocument();
    expect(screen.queryByRole("row", { name: /Germany/ })).not.toBeInTheDocument();
  });
});
