import { fireEvent, render, screen, within } from "@testing-library/react";
import GothicShop from "@/app/gothic/GothicShop";

describe("gothic project", () => {
  // jsdom does not implement scrolling or the native dialog lifecycle.
  const browserMethods = [
    [HTMLElement.prototype, "scrollIntoView"],
    [HTMLDialogElement.prototype, "showModal"],
    [HTMLDialogElement.prototype, "close"],
  ] as const;
  const originalDescriptors = browserMethods.map(([prototype, name]) =>
    Object.getOwnPropertyDescriptor(prototype, name),
  );

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: jest.fn(),
    });
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
    browserMethods.forEach(([prototype, name], index) => {
      const descriptor = originalDescriptors[index];
      if (descriptor) Object.defineProperty(prototype, name, descriptor);
      else Reflect.deleteProperty(prototype, name);
    });
  });

  it("navigates the carousel and filters the Halloween collection", () => {
    render(<GothicShop />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /For your\s*darker side\./,
    );
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /A night to\s*be someone else\./,
    );
    fireEvent.click(screen.getByRole("button", { name: "Discover Halloween" }));

    expect(
      screen.getByRole("heading", { level: 3, name: "The Vampire Coat" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Ravenlace Corset Dress" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Costumes" }),
    ).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: "Go to slide 1" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /The devil is\s*in the details\./,
    );
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(
      screen.getByRole("button", { name: "Go to slide 1" }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("filters accessories and restores all products", () => {
    render(<GothicShop />);
    const filters = within(screen.getByLabelText("Product categories"));

    fireEvent.click(filters.getByRole("button", { name: "Accessories" }));
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
    expect(
      screen.getByRole("heading", { name: "Nocturne Witch Hat" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Eclipse Platform Boots" }),
    ).toBeInTheDocument();

    fireEvent.click(filters.getByRole("button", { name: "All" }));
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
  });

  it("searches products and recovers from an empty result", () => {
    render(<GothicShop />);
    fireEvent.click(screen.getByRole("button", { name: "Search collection" }));
    const search = screen.getByRole("textbox", { name: "Search products" });

    fireEvent.change(search, { target: { value: "vAmPiRe" } });
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: "The Vampire Coat" }),
    ).toBeInTheDocument();

    fireEvent.change(search, { target: { value: "nonexistent item" } });
    expect(screen.getByText("No matches in the shadows.")).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Show the full collection" }),
    );
    expect(search).toHaveValue("");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
  });

  it("adds a selected size to the bag, updates its total, and removes the item", () => {
    render(<GothicShop />);
    fireEvent.click(
      screen.getByRole("button", { name: /The Vampire Coat.*£189\.00/ }),
    );
    const preview = within(
      screen.getByRole("dialog", { name: "The Vampire Coat" }),
    );
    fireEvent.click(preview.getByRole("button", { name: "M" }));
    fireEvent.click(preview.getByRole("button", { name: "Add to bag" }));

    const bag = within(screen.getByRole("dialog", { name: "Shopping bag" }));
    expect(bag.getByText("M · £189.00")).toBeInTheDocument();
    expect(bag.getByText("£189.00", { exact: true })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "The Vampire Coat added to your bag.",
    );

    fireEvent.click(
      bag.getByRole("button", { name: "Add one The Vampire Coat" }),
    );
    expect(bag.getByText("£378.00", { exact: true })).toBeInTheDocument();
    fireEvent.click(
      bag.getByRole("button", { name: "Remove one The Vampire Coat" }),
    );
    expect(bag.getByText("£189.00", { exact: true })).toBeInTheDocument();
    fireEvent.click(
      bag.getByRole("button", { name: "Remove one The Vampire Coat" }),
    );
    expect(
      bag.getByText("Your bag is waiting for something wicked."),
    ).toBeInTheDocument();

    fireEvent.click(bag.getByRole("button", { name: "Continue exploring" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Shopping bag, 0 items" }),
    ).toBeInTheDocument();
  });
});
