import React from 'react';
import type { Station } from '../reducer/stations';

interface StatusBadgeProps {
  status: Station['status'];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    active: {
      label: 'Actif',
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      dotColor: 'bg-green-500',
    },
    maintenance: {
      label: 'Maintenance',
      color: 'orange',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      dotColor: 'bg-orange-500',
    },
  };

  const { label, bgColor, textColor, dotColor } = config[status];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      <span className={`w-2 h-2 rounded-full ${dotColor} mr-2`}></span>
      {label}
    </span>
  );
};

export default StatusBadge;