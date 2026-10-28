import { fireEvent, render, screen } from "@testing-library/react";
import QuickList from "@/app/quick-list/QuickList";

describe("quick-list project", () => {
  it("adds an item and clears it after marking it complete", () => {
    // Render the empty list and its item-entry form.
    render(<QuickList />);

    // Enter a task and submit the form to add it to the list.
    fireEvent.change(screen.getByRole("textbox", { name: "New list item" }), {
      target: { value: "Write tests" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    // Mark the new task complete, then clear completed tasks from the list.
    expect(screen.getByText("Write tests")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Mark Write tests as completed" }));
    fireEvent.click(screen.getByRole("button", { name: "Clear completed" }));

    // Verify the completed task is gone and the empty-list message is restored.
    expect(screen.queryByText("Write tests")).not.toBeInTheDocument();
    expect(screen.getByText("Your list is waiting")).toBeInTheDocument();
  });
});
