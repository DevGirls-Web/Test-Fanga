import React, { useState } from 'react';
import StationsTable from '../components/StationTable';
import StationFilters from '../components/StationFilters';
import StationSort from '../components/StationTri';
// import StatsOverview from '';

const StationsDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Stations</h1>
        <p className="text-gray-600 mt-2">
          Gestion des stations de swap de batteries électriques
        </p>
      </div>

      {/* Statistiques rapides */}
      {/* <StatsOverview /> */}

      {/* Contrôles */}
      <div className="mb-6 bg-white rounded-xl shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
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
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-sm ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Tableau
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 text-sm ${viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Cartes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Affichage des stations */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {viewMode === 'table' ? (
          <StationsTable />
        ) : (
          <div className="p-4">
            <p className="text-gray-500 text-center py-8">
              Version cartes - À implémenter
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-6 text-sm text-gray-500">
        <p>
          <span className="font-medium">{viewMode === 'table' ? '3 stations' : '3 cartes'}</span> affichées
        </p>
      </div>
    </div>
  );
};

export default StationsDashboard;