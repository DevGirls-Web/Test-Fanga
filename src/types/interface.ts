export type StationStatus = 'active' | 'maintenance';

export interface Station {
  id: string;
  name: string;
  status: StationStatus;
  available_batteries: number;
  total_swaps_today: number;
}

export interface StationsState {
  stations: Station[];
  filter: 'all' | 'active' | 'maintenance';
  sortBy: 'default' | 'batteries_asc' | 'batteries_desc' | 'swaps_asc' | 'swaps_desc';
  selectedStation: Station | null; // ← NOUVEAU
}