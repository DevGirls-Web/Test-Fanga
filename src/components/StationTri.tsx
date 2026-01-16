import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { setSortBy } from '../reducer/stations';

const StationSort: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector((state) => state.stations.sortBy);

  const sortOptions = [
    { value: 'default', label: 'Par défaut' },
    { value: 'batteries_desc', label: 'Batteries ▼' },
    { value: 'batteries_asc', label: 'Batteries ▲' },
    { value: 'swaps_desc', label: 'Swaps ▼' },
    { value: 'swaps_asc', label: 'Swaps ▲' },
  ] as const;

  return (
    <select
      value={currentSort}
      onChange={(e) => dispatch(setSortBy(e.target.value as any))}
      className="block w-full md:w-auto px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default StationSort;
