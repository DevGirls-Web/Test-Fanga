import React from 'react';
import { useAppDispatch } from '../app/store';
import { setSelectedStation } from '../reducer/stations';
import type { Station } from '../types/interface';
import StatusBadge from './StatusBadge';
import { Battery, RotateCw, Eye, Edit2 } from 'lucide-react';

interface StationCardProps {
  station: Station;
}

const StationCard: React.FC<StationCardProps> = ({ station }) => {
  const dispatch = useAppDispatch();
  const batteryPercentage = Math.min(100, (station.available_batteries / 20) * 100);

  const handleViewDetails = () => {
    dispatch(setSelectedStation(station.id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Header avec statut */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {station.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{station.id}</p>
          </div>
          <StatusBadge status={station.status} />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="p-6 space-y-4">
        {/* Batteries disponibles */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Battery className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Batteries disponibles
              </span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {station.available_batteries}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${batteryPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Capacité max: 20 batteries
          </p>
        </div>

        {/* Swaps aujourd'hui */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <RotateCw className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              Swaps aujourd'hui
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {station.total_swaps_today}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            échanges effectués
          </p>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Taux d'utilisation</p>
            <p className="text-lg font-bold text-blue-600">
              {batteryPercentage.toFixed(0)}%
            </p>
          </div>
          <div className={`rounded-lg p-3 ${
            station.status === 'active' 
              ? 'bg-green-50' 
              : station.status === 'maintenance'
              ? 'bg-yellow-50'
              : 'bg-red-50'
          }`}>
            <p className="text-xs text-gray-600 mb-1">État</p>
            <p className={`text-lg font-bold ${
              station.status === 'active'
                ? 'text-green-600'
                : station.status === 'maintenance'
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}>
              {station.status === 'active' 
                ? 'Actif' 
                : station.status === 'maintenance'
                ? 'Maintenance'
                : 'Inactif'}
            </p>
          </div>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
        <button 
          onClick={handleViewDetails}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
        >
          <Eye className="w-4 h-4" />
          Détails
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
          <Edit2 className="w-4 h-4" />
          Éditer
        </button>
      </div>
    </div>
  );
};

export default StationCard;