export interface PollingLocation {
  id: string,
  address: {
    locationName?: string,
    line1: string,
    line2?: string,
    line3?: string,
    city: string,
    state: string,
    zip: string
  },
  notes?: string,
  pollingHours?: string,
  name?: string,
  voterServices?: string,
  startDate?: string,
  endDate?: string,
  sources?: [
    {
      name: string,
      official: boolean
    }
  ]
}
