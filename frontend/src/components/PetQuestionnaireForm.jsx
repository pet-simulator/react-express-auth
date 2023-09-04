import React, { useState } from 'react';

const PetQuestionnaireForm = ({ handleSubmit, currentUser }) => {
  const [formData, setFormData] = useState({
    pet_name: '',
    species: 'Dog',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (currentUser && currentUser.id) {
      handleSubmit({ ...formData, owner_id: currentUser.id });
    } else {
      console.error('Current user is undefined or does not have an ID.');
      // You can log the value of currentUser for debugging
      console.log(currentUser);
    }
  };
  

  return (
    <div>
      <h2>Pet Questionnaire</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="pet_name">Pet Name:</label>
        <input
          type="text"
          id="pet_name"
          name="pet_name"
          value={formData.pet_name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label htmlFor="species">Select Species:</label>
        <select
          id="species"
          name="species"
          value={formData.species}
          onChange={handleChange}
        >
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bunny">Bunny</option>
        </select>
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PetQuestionnaireForm;






