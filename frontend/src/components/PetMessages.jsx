import React from 'react';

const PetMessages = ({ messages }) => {
  return (
    <div className="pet-messages">
      {messages.map((message, index) => (
        <div className="pet-message" key={index}>
          {message}
        </div>
      ))}
    </div>
  );
};

export default PetMessages;
