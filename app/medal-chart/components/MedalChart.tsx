"use client";
import { apiBaseUrl } from '@/lib/api';
import { useApiData, withApiData } from '@/lib/api-client';

import MedalLegend from "./MedalLegend";
import MedalPlot from "./MedalPlot";

const medalsUrl = `${apiBaseUrl}/api/medals`;

function MedalChart() {
  const { colors, data } = useApiData('medals');
  return (
    <div className={`w-[100%]`}>
      <MedalLegend colors={colors} />
      <MedalPlot data={data} colors={colors} />
    </div>
  );
}

export default withApiData(MedalChart, 'medals', medalsUrl);
