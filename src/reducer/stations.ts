import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// Types
export interface Station {
  id: string;
  name: string;
  status: 'active' | 'maintenance';
  available_batteries: number;
  total_swaps_today: number;
}

interface StationsState {
  stations: Station[];
  filter: 'all' | 'active' | 'maintenance';
  sortBy: 'default' | 'batteries_asc' | 'batteries_desc' | 'swaps_asc' | 'swaps_desc';
}

// Données initiales (vos données mockées)
const initialState: StationsState = {
  stations: [
    {
      id: 'ST-001',
      name: 'Station Plateau',
      status: 'active',
      available_batteries: 12,
      total_swaps_today: 34,
    },
    {
      id: 'ST-002',
      name: 'Station Cocody',
      status: 'maintenance',
      available_batteries: 0,
      total_swaps_today: 0,
    },
    {
      id: 'ST-003',
      name: 'Station Yopougon',
      status: 'active',
      available_batteries: 5,
      total_swaps_today: 21,
    },
  ],
  filter: 'all',
  sortBy: 'default',
};

const stations = createSlice({
  name: 'stations',
  initialState,
  reducers: {
    // Actions pour les filtres
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'maintenance'>) => {
      state.filter = action.payload;
    },
    
    // Actions pour les tris
    setSortBy: (state, action: PayloadAction<'default' | 'batteries_asc' | 'batteries_desc' | 'swaps_asc' | 'swaps_desc'>) => {
      state.sortBy = action.payload;
    },
    
    // Action pour ajouter/mettre à jour une station 
    updateStation: (state, action: PayloadAction<Station>) => {
      const index = state.stations.findIndex(station => station.id === action.payload.id);
      if (index !== -1) {
        state.stations[index] = action.payload;
      } else {
        state.stations.push(action.payload);
      }
    },
  },
});

// Selectors pour récupérer les stations filtrées et triées
export const selectFilteredAndSortedStations = createSelector(
  [
    (state: { stations: StationsState }) => state.stations.stations,
    (state: { stations: StationsState }) => state.stations.filter,
    (state: { stations: StationsState }) => state.stations.sortBy,
  ],
  (stations, filter, sortBy) => {
    // Filtrage
    let filteredStations = stations;
    if (filter !== 'all') {
      filteredStations = stations.filter(station => station.status === filter);
    }
    
    // Tri
    const sortedStations = [...filteredStations];
    switch (sortBy) {
      case 'batteries_asc':
        return sortedStations.sort((a, b) => a.available_batteries - b.available_batteries);
      case 'batteries_desc':
        return sortedStations.sort((a, b) => b.available_batteries - a.available_batteries);
      case 'swaps_asc':
        return sortedStations.sort((a, b) => a.total_swaps_today - b.total_swaps_today);
      case 'swaps_desc':
        return sortedStations.sort((a, b) => b.total_swaps_today - a.total_swaps_today);
      case 'default':
      default:
        return sortedStations.sort((a, b) => a.id.localeCompare(b.id));
    }
  }
);

// Export des actions
export const { setFilter, setSortBy, updateStation } = stations.actions;

// Export du reducer
export default stations.reducer;