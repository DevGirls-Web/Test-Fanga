import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { selectFilteredAndSortedStations, setSelectedStation } from '../reducer/stations';
import StatusBadge from '../components/StatusBadge';

const StationsTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const stations = useAppSelector(selectFilteredAndSortedStations);

  const handleViewDetails = (stationId: string) => {
    dispatch(setSelectedStation(stationId));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom de la station
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Batteries disponibles
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Swaps aujourd'hui
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stations.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                Aucune station ne correspond aux filtres sélectionnés
              </td>
            </tr>
          ) : (
            stations.map((station) => (
              <tr key={station.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {station.name}
                    </div>
                    <div className="text-sm text-gray-500">{station.id}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={station.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {station.available_batteries}
                    </div>
                    <div className="ml-2 w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, (station.available_batteries / 20) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {station.total_swaps_today}
                  </div>
                  <div className="text-xs text-gray-500">
                    swaps aujourd'hui
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleViewDetails(station.id)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Détails
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Éditer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StationsTable;