import React from 'react';

const PetStatusBars = ({ happy, clean, energy, hunger }) => {
  const getColorClass = (value) => {
    if (value <= 40) {
      return 'low-status';
    } else if (value <= 65) {
      return 'medium-status';
    } else {
      return 'high-status';
    }
  };

  return (
    <div className="status-bars-container">
      <div className={`status-bar ${getColorClass(happy)}`}>
        <p className="status-label">Happiness Level</p>
        <div className="status-fill" style={{ width: `${happy}%` }}></div>
        <p className="status-value">{happy}</p>
      </div>

      <div className={`status-bar ${getColorClass(clean)}`}>
        <p className="status-label">Cleanliness Level</p>
        <div className="status-fill" style={{ width: `${clean}%` }}></div>
        <p className="status-value">{clean}</p>
      </div>

      <div className={`status-bar ${getColorClass(energy)}`}>
        <p className="status-label">Energy Level</p>
        <div className="status-fill" style={{ width: `${energy}%` }}></div>
        <p className="status-value">{energy}</p>
      </div>

      <div className={`status-bar ${getColorClass(hunger)}`}>
        <p className="status-label">Hunger Level</p>
        <div className="status-fill" style={{ width: `${hunger}%` }}></div>
        <p className="status-value">{hunger}</p>
      </div>
    </div>
  );
};

export default PetStatusBars;





