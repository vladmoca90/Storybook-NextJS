export type FlightStatus = "Boarding" | "Gate open" | "On time" | "Delayed";

export interface Airline {
  airline: string;
  country: string;
  flag: string;
  code: string;
  flight: string;
  time: string;
  destination: string;
  airport: string;
  terminal: string;
  gate: string;
  status: FlightStatus;
  color: string;
}
