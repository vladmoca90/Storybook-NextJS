import { fireEvent, render, screen } from "@testing-library/react";
import CountriesExplorer from "@/app/countries/components/CountriesExplorer";

describe("countries project", () => {
  it("searches countries by capital", () => {
    render(<CountriesExplorer />);

    fireEvent.change(screen.getByRole("searchbox", { name: "Search by country or capital" }), {
      target: { value: "Bern" },
    });

    expect(screen.getByRole("row", { name: /Switzerland/ })).toBeInTheDocument();
    expect(screen.queryByRole("row", { name: /Germany/ })).not.toBeInTheDocument();
  });
});
