import { render, screen } from "@testing-library/react";
import MedalLegend from "@/app/medal-chart/components/MedalLegend";
import { colors } from "@/app/data/medals";

describe("medal-chart project", () => {
  it("renders each medal type in the chart legend", () => {
    render(<MedalLegend colors={colors} />);

    expect(screen.getByLabelText("Medal types")).toHaveTextContent("Gold");
    expect(screen.getByLabelText("Medal types")).toHaveTextContent("Silver");
    expect(screen.getByLabelText("Medal types")).toHaveTextContent("Bronze");
  });
});
