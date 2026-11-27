import { ApiBoundary } from '@/lib/api-client';
import { waitFor, render, screen } from "@testing-library/react";
import MedalLegend from "@/app/medal-chart/components/MedalLegend";
import { colors } from "@/app/data/medals";

describe("medal-chart project", () => {
  it("renders each medal type in the chart legend", async () => {
    // Render the legend using the chart's configured medal colors.
    render(<ApiBoundary name="medals" url="http://localhost:3000/api/medals"><MedalLegend colors={colors} /></ApiBoundary>);
    await waitFor(() => expect(screen.queryByText(/^Loading .*…$/)).not.toBeInTheDocument());

    // Check that all three medal types are shown in the accessible legend.
    expect(screen.getByLabelText("Medal types")).toHaveTextContent("Gold");
    expect(screen.getByLabelText("Medal types")).toHaveTextContent("Silver");
    expect(screen.getByLabelText("Medal types")).toHaveTextContent("Bronze");
  });
});
