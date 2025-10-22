import React from 'react';

interface StatusFilterProps {
  currentFilter: string | null;
  onFilterChange: (status: string | null) => void;
}

const statuses = ['PAYÉE', 'EN COURS', 'À VENIR'];

const StatusFilter: React.FC<StatusFilterProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 print:hidden">
      <button
        onClick={() => onFilterChange(null)}
        className={`px-4 py-2 text-sm rounded-full transition-colors border ${
          currentFilter === null
            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
      >
        Tous
      </button>
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onFilterChange(status)}
          className={`px-4 py-2 text-sm rounded-full transition-colors border ${
            currentFilter === status
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;