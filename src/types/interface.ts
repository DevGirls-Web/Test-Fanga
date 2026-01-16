export type StationStatus = 'active' | 'maintenance';

export interface Station {
  id: string;
  name: string;
  status: StationStatus;
  available_batteries: number;
  total_swaps_today: number;
}