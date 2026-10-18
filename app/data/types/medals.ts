export type MedalType = "Gold" | "Silver" | "Bronze";
export type CountryMedals = { country: string } & Record<MedalType, number>;
