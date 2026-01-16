import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { setFilter } from '../reducer/stations';

const StationFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector((state) => state.stations.filter);

  const filters = [
    { value: 'all', label: 'Toutes', color: 'gray' },
    { value: 'active', label: 'Actives', color: 'green' },
    { value: 'maintenance', label: 'Maintenance', color: 'orange' },
  ] as const;

  return (
    <div className="flex space-x-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => dispatch(setFilter(filter.value))}
          className={`px-3 py-1 text-sm rounded-full border transition-colors ${currentFilter === filter.value
              ? `bg-${filter.color}-100 text-${filter.color}-800 border-${filter.color}-300 font-medium`
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default StationFilters;