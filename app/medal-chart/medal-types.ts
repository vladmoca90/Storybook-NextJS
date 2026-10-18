export const medalTypes = ["Gold", "Silver", "Bronze"] as const;
export type MedalType = (typeof medalTypes)[number];
export type CountryMedals = { country: string } & Record<MedalType, number>;
