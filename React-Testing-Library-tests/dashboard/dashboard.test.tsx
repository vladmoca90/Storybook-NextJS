import { fireEvent, render, screen } from "@testing-library/react";
import Dashboard from "@/app/dashboard/dashboard";

describe("dashboard project", () => {
  it("filters people by name", () => {
    // Render the dashboard and its people data with the default filters.
    render(<Dashboard />);

    // Enter a name fragment in the name filter to narrow the people list.
    fireEvent.change(screen.getByRole("textbox", { name: "Search by Name" }), {
      target: { value: "Emma" },
    });

    // Confirm only the matching person is shown and the result count is updated.
    expect(screen.getByRole("heading", { name: "Emma Johnson" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Liam O'Brien" })).not.toBeInTheDocument();
    expect(screen.getByText(/Showing/)).toHaveTextContent("Showing 1 of 5 people");
  });
});
