import { fireEvent, render, screen, within } from "@testing-library/react";
import WineShop from "@/app/wines/WineShop";

describe("wines project", () => {
  // jsdom does not implement native dialog opening and closing.
  const showModal = Object.getOwnPropertyDescriptor(
    HTMLDialogElement.prototype,
    "showModal",
  );
  const close = Object.getOwnPropertyDescriptor(
    HTMLDialogElement.prototype,
    "close",
  );

  beforeAll(() => {
    Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
      configurable: true,
      value: function (this: HTMLDialogElement) {
        this.setAttribute("open", "");
      },
    });
    Object.defineProperty(HTMLDialogElement.prototype, "close", {
      configurable: true,
      value: function (this: HTMLDialogElement) {
        this.removeAttribute("open");
      },
    });
  });

  afterAll(() => {
    for (const [name, descriptor] of [
      ["showModal", showModal],
      ["close", close],
    ] as const) {
      if (descriptor)
        Object.defineProperty(HTMLDialogElement.prototype, name, descriptor);
      else Reflect.deleteProperty(HTMLDialogElement.prototype, name);
    }
  });

  it("filters wines by category and restores the full collection", () => {
    render(<WineShop />);
    expect(screen.getAllByRole("article")).toHaveLength(7);

    fireEvent.click(screen.getByRole("button", { name: "Red" }));
    expect(screen.getByRole("button", { name: "Red" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(
      screen.getByRole("heading", { name: "Italian Red Wine" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Pinot Noir Romania" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Chilean Dry White" }),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "All wines" }));
    expect(screen.getAllByRole("article")).toHaveLength(7);
  });

  it("searches wine names without case or surrounding whitespace sensitivity", () => {
    render(<WineShop />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Search wines" }), {
      target: { value: "  CHILEAN  " },
    });
    expect(screen.getByText("1 wines found")).toHaveAttribute("role", "status");
    expect(
      screen.getByRole("heading", { name: "Chilean Dry White" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(1);
  });

  it("combines search with category and clears both filters from empty results", () => {
    render(<WineShop />);
    fireEvent.click(screen.getByRole("button", { name: "Red" }));
    const search = screen.getByRole("searchbox", { name: "Search wines" });
    fireEvent.change(search, { target: { value: "Chilean" } });
    expect(
      screen.getByRole("heading", { name: "No wines found" }),
    ).toBeInTheDocument();
    expect(screen.queryAllByRole("article")).toHaveLength(0);

    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(search).toHaveValue("");
    expect(screen.getByRole("button", { name: "All wines" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getAllByRole("article")).toHaveLength(7);
  });

  it("adds wine to the bag, changes quantity and removes the selection", () => {
    render(<WineShop />);
    fireEvent.click(
      screen.getByRole("button", { name: "Add Italian Red Wine to bag" }),
    );
    expect(screen.getByText("Italian Red Wine added to bag.")).toHaveAttribute(
      "role",
      "status",
    );
    fireEvent.click(screen.getByRole("button", { name: "Bag (1)" }));
    const bag = within(screen.getByRole("dialog", { name: "Your bag (1)" }));
    expect(
      bag.getByRole("heading", { name: "Italian Red Wine" }),
    ).toBeInTheDocument();

    fireEvent.click(
      bag.getByRole("button", { name: "Increase Italian Red Wine quantity" }),
    );
    expect(
      bag.getByRole("status", { name: "Italian Red Wine quantity" }),
    ).toHaveTextContent("2");
    expect(screen.getByRole("button", { name: "Bag (2)" })).toBeInTheDocument();
    fireEvent.click(
      bag.getByRole("button", { name: "Decrease Italian Red Wine quantity" }),
    );
    expect(
      bag.getByRole("status", { name: "Italian Red Wine quantity" }),
    ).toHaveTextContent("1");

    fireEvent.click(
      bag.getByRole("button", { name: "Remove Italian Red Wine" }),
    );
    expect(
      bag.getByText(
        "Your bag is empty. Find a new favourite in the collection.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Bag (0)" })).toBeInTheDocument();
  });

  it("removes a wine when its quantity reaches zero", () => {
    render(<WineShop />);
    fireEvent.click(
      screen.getByRole("button", { name: "Add Italian Red Wine to bag" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Bag (1)" }));
    const bag = within(screen.getByRole("dialog"));
    fireEvent.click(
      bag.getByRole("button", { name: "Decrease Italian Red Wine quantity" }),
    );
    expect(
      bag.queryByRole("heading", { name: "Italian Red Wine" }),
    ).not.toBeInTheDocument();
    expect(
      bag.getByText(
        "Your bag is empty. Find a new favourite in the collection.",
      ),
    ).toBeInTheDocument();
  });

  it.each(["Close bag", "Continue exploring"])(
    "closes the bag with %s",
    (button) => {
      render(<WineShop />);
      fireEvent.click(screen.getByRole("button", { name: "Bag (0)" }));
      expect(
        screen.getByRole("dialog", { name: "Your bag (0)" }),
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: button }));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    },
  );
});
