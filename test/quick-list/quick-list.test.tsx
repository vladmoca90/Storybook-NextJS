import { fireEvent, render, screen } from "@testing-library/react";
import QuickList from "@/app/quick-list/QuickList";

describe("quick-list project", () => {
  it("adds an item and clears it after marking it complete", () => {
    render(<QuickList />);

    fireEvent.change(screen.getByRole("textbox", { name: "New list item" }), {
      target: { value: "Write tests" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("Write tests")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Mark Write tests as completed" }));
    fireEvent.click(screen.getByRole("button", { name: "Clear completed" }));

    expect(screen.queryByText("Write tests")).not.toBeInTheDocument();
    expect(screen.getByText("Your list is waiting")).toBeInTheDocument();
  });
});
