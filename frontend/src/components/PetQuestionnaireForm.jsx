import React, { useState } from 'react';

const PetQuestionnaireForm = ({ onSubmit }) => {
  const initialFormData = {
    pet_name: '',
    species: 'Dog',
  };

  const [formData, setFormData] = useState(initialFormData);

  const petImages = {
    Dog: 'https://png.pngtree.com/png-clipart/20230308/ourmid/pngtree-cartoon-dog-puppy-sticker-cute-png-image_6629416.png',
    Cat: 'https://static.vecteezy.com/system/resources/previews/013/078/569/original/illustration-of-cute-colored-cat-cartoon-cat-image-in-format-suitable-for-children-s-book-design-elements-introduction-of-cats-to-children-books-or-posters-about-animal-free-png.png',
    Bunny: 'https://i.pinimg.com/originals/bd/2e/e9/bd2ee9e08816a9a0801f056597230fac.png',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData); // Pass the form data to the parent component (HomePage)
    setFormData(initialFormData);
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

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* Display all three pet images */}
          {Object.keys(petImages).map((species) => (
            <div key={species} style={{ margin: '10px' }}>
              <label>
                <input
                  type="radio"
                  name="species"
                  value={species}
                  checked={formData.species === species}
                  onChange={handleChange}
                />
                <img
                  src={petImages[species]}
                  alt={`${species} Image`}
                  style={{ width: '100px', height: '100px' }}
                />
                <br />
                {species}
              </label>
            </div>
          ))}
        </div>

        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PetQuestionnaireForm;




