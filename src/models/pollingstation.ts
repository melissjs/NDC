export interface Pollingstation {
  _id: string;
  locationName: string;
  precinctNumber: string;
  streetAddress: string;
  line1?: string;
  line2?: string;
  line3?: string;
  city: string;
  state: string;
  zip: number;
  pollingHours: string;
  notes: string
}
