import { fireEvent, render, screen, within } from "@testing-library/react";
import PharmacyFinder from "@/app/reading-pharmacies/components/PharmacyFinder";
import type { Pharmacy } from "@/app/reading-pharmacies/types";

// Keep the real search, list and details UI without loading Leaflet or map tiles.
jest.mock(
  "next/dynamic",
  () => () =>
    function MockPharmacyMap() {
      return null;
    },
);

const pharmacies: Pharmacy[] = [
  {
    id: "central",
    name: "Central Pharmacy",
    address: "10 Broad Street",
    postcode: "RG1 2AA",
    latitude: 51.455,
    longitude: -0.971,
    phone: "0118 123 4567",
    openingHours: "Mo-Fr 09:00-18:00",
    sourceUrl: "https://www.openstreetmap.org/node/1",
    distance: 0.2,
  },
  {
    id: "riverside",
    name: "Riverside Pharmacy",
    address: "20 Caversham Road",
    postcode: "RG4 8BB",
    latitude: 51.465,
    longitude: -0.975,
    phone: "",
    openingHours: "",
    sourceUrl: "https://www.openstreetmap.org/node/2",
    distance: 1.2,
  },
];

describe("reading pharmacies project", () => {
  it.each(["  CENTRAL  ", "broad street", "rg1 2aa"])(
    "filters pharmacies by name, street or postcode using %s and clears the search",
    (query) => {
      render(
        <PharmacyFinder pharmacies={pharmacies} updatedAt="12 Nov 2026" />,
      );
      const search = screen.getByRole("textbox", { name: "Search pharmacies" });

      fireEvent.change(search, { target: { value: query } });
      expect(screen.getByRole("status")).toHaveTextContent("1 of 2");
      expect(
        screen.getByRole("button", { name: /Central Pharmacy/ }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /Riverside Pharmacy/ }),
      ).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
      expect(search).toHaveValue("");
      expect(screen.getByRole("status")).toHaveTextContent("2 of 2");
      expect(
        screen.getByRole("button", { name: /Riverside Pharmacy/ }),
      ).toBeInTheDocument();
    },
  );

  it("shows an empty result and restores the list from its clear action", () => {
    render(
      <PharmacyFinder pharmacies={pharmacies} updatedAt="12 Nov 2026" />,
    );
    fireEvent.change(
      screen.getByRole("textbox", { name: "Search pharmacies" }),
      {
        target: { value: "no matching pharmacy" },
      },
    );
    expect(screen.getByRole("status")).toHaveTextContent("0 of 2");
    expect(screen.getByText("No pharmacies found")).toBeInTheDocument();

    const list = screen.getByRole("list", { name: "Pharmacies" });
    fireEvent.click(within(list).getByRole("button", { name: "Clear search" }));
    expect(screen.getByRole("status")).toHaveTextContent("2 of 2");
    expect(within(list).getAllByRole("button")).toHaveLength(2);
  });

  it("opens pharmacy details with contact and directions links and closes them", () => {
    render(
      <PharmacyFinder pharmacies={pharmacies} updatedAt="12 Nov 2026" />,
    );
    const pharmacy = screen.getByRole("button", { name: /Central Pharmacy/ });
    fireEvent.click(pharmacy);

    expect(pharmacy).toHaveAttribute("aria-pressed", "true");
    const details = within(
      screen.getByRole("region", { name: "Selected pharmacy" }),
    );
    expect(
      details.getByRole("heading", { name: "Central Pharmacy" }),
    ).toBeInTheDocument();
    expect(
      details.getByRole("link", { name: "0118 123 4567" }),
    ).toHaveAttribute("href", "tel:01181234567");
    expect(details.getByText("Listed hours: Mo-Fr 09:00-18:00")).toBeInTheDocument();
    expect(details.getByRole("link", { name: "Get directions" })).toHaveAttribute(
      "href",
      "https://www.google.com/maps/dir/?api=1&destination=51.455,-0.971",
    );

    fireEvent.click(details.getByRole("button", { name: "Close pharmacy details" }));
    expect(screen.queryByRole("region", { name: "Selected pharmacy" })).not.toBeInTheDocument();
    expect(pharmacy).toHaveAttribute("aria-pressed", "false");
  });

  it("clears the selection when searching and resets the search with Show all", () => {
    render(
      <PharmacyFinder pharmacies={pharmacies} updatedAt="12 Nov 2026" />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Central Pharmacy/ }));
    const search = screen.getByRole("textbox", { name: "Search pharmacies" });
    fireEvent.change(search, { target: { value: "Riverside" } });
    expect(screen.queryByRole("region", { name: "Selected pharmacy" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Riverside Pharmacy/ }));
    fireEvent.click(screen.getByRole("button", { name: "Show all" }));
    expect(search).toHaveValue("");
    expect(screen.getByRole("status")).toHaveTextContent("2 of 2");
    expect(screen.queryByRole("region", { name: "Selected pharmacy" })).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Riverside Pharmacy/ }),
    ).toHaveAttribute("aria-pressed", "false");
  });
});
