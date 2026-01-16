import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Station, StationsState } from '../types/interface';

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
  selectedStation: null,
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
    
    // Action pour sélectionner une station
    setSelectedStation: (state, action: PayloadAction<string | null>) => {
      if (action.payload === null) {
        state.selectedStation = null;
      } else {
        const found = state.stations.find(s => s.id === action.payload);
        if (found) {
          state.selectedStation = found;
        }
      }
    },
    
    // Action pour basculer la maintenance
    toggleMaintenance: (state, action: PayloadAction<string>) => {
      const station = state.stations.find(s => s.id === action.payload);
      if (station) {
        station.status = station.status === 'active' ? 'maintenance' : 'active';
        // Mettre à jour selectedStation aussi
        if (state.selectedStation?.id === action.payload) {
          state.selectedStation = { ...station };
        }
      }
    },
    
    // Action pour mettre à jour les métriques
    updateStationMetrics: (state, action: PayloadAction<{ id: string; batteries?: number; swaps?: number }>) => {
      const station = state.stations.find(s => s.id === action.payload.id);
      if (station) {
        if (action.payload.batteries !== undefined) {
          station.available_batteries = action.payload.batteries;
        }
        if (action.payload.swaps !== undefined) {
          station.total_swaps_today = action.payload.swaps;
        }
        // Mettre à jour selectedStation aussi
        if (state.selectedStation?.id === action.payload.id) {
          state.selectedStation = { ...station };
        }
      }
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

// Selector pour récupérer les stations filtrées et triées
export const selectFilteredAndSortedStations = createSelector(
  [
    (state: { stations: StationsState }) => state.stations.stations,
    (state: { stations: StationsState }) => state.stations.filter,
    (state: { stations: StationsState }) => state.stations.sortBy,
  ],
  (stations, filter, sortBy) => {
    let filteredStations = stations;
    if (filter !== 'all') {
      filteredStations = stations.filter(station => station.status === filter);
    }
    
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

// Selector pour récupérer la station sélectionnée
export const selectSelectedStation = (state: { stations: StationsState }) => state.stations.selectedStation;

// Export des actions
export const { 
  setFilter, 
  setSortBy, 
  updateStation,
  setSelectedStation,
  toggleMaintenance,
  updateStationMetrics,
} = stations.actions;

// Export du reducer
export default stations.reducer;