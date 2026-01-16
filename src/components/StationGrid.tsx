import React from 'react';
import { useAppSelector } from '../app/store';
import { selectFilteredAndSortedStations } from '../reducer/stations';
import StationCard from './StationCard';

const StationsGrid: React.FC = () => {
  const stations = useAppSelector(selectFilteredAndSortedStations);

  if (stations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          Aucune station ne correspond aux filtres sélectionnés
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stations.map((station) => (
        <StationCard key={station.id} station={station} />
      ))}
    </div>
  );
};

export default StationsGrid;