import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { 
  selectSelectedStation, 
  setSelectedStation,
  toggleMaintenance,
  updateStationMetrics 
} from '../reducer/stations';
import { X } from 'lucide-react';

const StationDetailModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const station = useAppSelector(selectSelectedStation);

  if (!station) return null;

  const handleClose = () => {
    dispatch(setSelectedStation(null));
  };

  const handleToggleMaintenance = () => {
    dispatch(toggleMaintenance(station.id));
  };


  const handleAddSwap = () => {
    dispatch(updateStationMetrics({
      id: station.id,
      swaps: station.total_swaps_today + 1
    }));
  };

  // Calculs pour l'affichage
  const batteryPercentage = Math.min(100, (station.available_batteries / 20) * 100);
  const isActive = station.status === 'active';

  return (
    <>
      {/* Overlay semi-transparent */}
      <div 
        className="fixed inset-0 bg-opacity-30 z-40 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal centré */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className={`p-6 ${isActive ? 'bg-green-50' : 'bg-orange-50'} border-b flex-shrink-0`}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{station.name}</h2>
                <p className="text-gray-600 mt-1">{station.id}</p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Badge de statut */}
            <div className="mt-4">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                <span className={`w-3 h-3 rounded-full mr-2 ${
                  isActive ? 'bg-green-500' : 'bg-orange-500'
                }`} />
                {isActive ? 'Actif' : 'En maintenance'}
              </span>
            </div>
          </div>

          {/* Contenu scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Section Métriques */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Métriques en temps réel
              </h3>
              
              {/* Batteries */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Batteries disponibles</span>
                  <span className="font-bold">{station.available_batteries}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      station.available_batteries > 10 ? 'bg-green-500' :
                      station.available_batteries > 5 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${batteryPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>0</span>
                  <span>Capacité max: 20</span>
                </div>
              </div>
              
              {/* Swaps */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Swaps aujourd'hui</span>
                  <div className="flex items-center">
                    <span className="font-bold text-xl mr-2">{station.total_swaps_today}</span>
                    <span className="text-sm text-green-600 font-medium">12%</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddSwap}
                    className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition"
                  >
                    +1 Swap
                  </button>
                </div>
              </div>
            </div>

            {/* Section Détails */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Détails de la station
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Emplacement</span>
                  <span className="font-medium">{station.name.split(' ')[1] || 'Centre-ville'}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Mise en service</span>
                  <span className="font-medium">15/01/2024</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Dernière maintenance</span>
                  <span className="font-medium">20/02/2024</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Température</span>
                  <span className="font-medium">24°C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer avec actions */}
          <div className="p-6 border-t bg-gray-50 flex-shrink-0 space-y-3">
            <button
              onClick={handleToggleMaintenance}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {isActive ? ' Mettre en maintenance' : 'Remettre en service'}
            </button>
            
            <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Éditer les informations
            </button>
            
            <p className="text-center text-xs text-gray-500 pt-2">
              Dernière mise à jour : Aujourd'hui, 14:30
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StationDetailModal;