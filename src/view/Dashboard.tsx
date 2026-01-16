import React, { useState } from 'react';
import { LayoutList, LayoutGrid } from 'lucide-react';
import StationsTable from '../components/StationTable';
import StationCard from '../components/StationCard';
import StationFilters from '../components/StationFilters';
import StationSort from '../components/StationTri';
import { useAppSelector } from '../app/store';
import { selectFilteredAndSortedStations } from '../reducer/stations';
import StationDetailModal from '../components/StationDetails';

const StationsDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  // Récupère les stations filtrées et triées
  const stations = useAppSelector(selectFilteredAndSortedStations);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Stations</h1>
        <p className="text-gray-600 mt-2">
          Gestion des stations de swap de batteries électriques
        </p>
      </div>

      <StationDetailModal />

      {/* Contrôles */}
      <div className="mb-6 bg-white rounded-xl shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Filtres */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filtrer par statut
              </label>
              <StationFilters />
            </div>

            {/* Tris */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trier par
              </label>
              <StationSort />
            </div>
          </div>

          {/* Mode d'affichage */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Affichage :</span>
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                  viewMode === 'table'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LayoutList className="w-4 h-4" />
                Tableau
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                  viewMode === 'cards'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Cartes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Affichage des stations */}
      <div className="rounded-xl shadow overflow-hidden">
        {viewMode === 'table' ? (
          <div className="bg-white">
            <StationsTable />
          </div>
        ) : (
          <div className="p-6">
            {stations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Aucune station ne correspond aux filtres sélectionnés
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stations.map((station) => (
                  <StationCard key={station.id} station={station} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-6 text-sm text-gray-500">
        <p>
          <span className="font-medium">{stations.length} station{stations.length > 1 ? 's' : ''}</span> affichée{stations.length > 1 ? 's' : ''}
          {viewMode === 'cards' && ' en mode cartes'}
          {viewMode === 'table' && ' en mode tableau'}
        </p>
      </div>
    </div>
  );
};

export default StationsDashboard;