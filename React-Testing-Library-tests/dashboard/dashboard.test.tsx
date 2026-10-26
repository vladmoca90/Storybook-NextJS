import { fireEvent, render, screen } from "@testing-library/react";
import Dashboard from "@/app/dashboard/dashboard";

describe("dashboard project", () => {
  it("filters people by name", () => {
    render(<Dashboard />);

    fireEvent.change(screen.getByRole("textbox", { name: "Search by Name" }), {
      target: { value: "Emma" },
    });

    expect(screen.getByRole("heading", { name: "Emma Johnson" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Liam O'Brien" })).not.toBeInTheDocument();
    expect(screen.getByText(/Showing/)).toHaveTextContent("Showing 1 of 5 people");
  });
});
