import React, { useState, useEffect, useContext } from 'react';
import PetQuestionnaireForm from '../components/PetQuestionnaireForm';
import { listPetsByOwnerId, createPet, deletePet } from '../adapters/pet-adapter';
import CurrentUserContext from '../contexts/current-user-context';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userPets, setUserPets] = useState([]);
  const [newPetName, setNewPetName] = useState(''); // State to capture the new pet name
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const listUserPets = async () => {
      try {
        if (currentUser) {
          const timestamp = Date.now();
          const petsData = await listPetsByOwnerId(currentUser.id, timestamp);
          setUserPets(petsData);
        }
      } catch (error) {
        console.error('Error fetching user pets:', error);
      }
    };
  
    listUserPets();
  }, [currentUser]);
  

  const toggleForm = () => {
    if (currentUser) {
      setIsFormVisible(!isFormVisible);
    }
  };

  const handleDeletePet = async (id) => {
    try {
      const deleted = await deletePet(id);
      if (deleted) {
        setUserPets((prevUserPets) => prevUserPets.filter((pet) => pet.id !== id));
      } else {
        console.error('Failed to delete pet');
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (currentUser) {
        const newPetData = { ...formData, owner_id: currentUser.id };
        const [newPet,error] = await createPet(newPetData);

        
        // Update the userPets state with the new pet
        setUserPets((prevUserPets) => [...prevUserPets, newPet]);
        console.log(newPet)
        // Clear the form and hide it
        setIsFormVisible(false);
        setNewPetName(''); // Clear the pet name input
      }
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };

  return (
    <div className="home-page-wrapper">
      <button className="adopt-button" onClick={toggleForm}>
        {currentUser ? (
          isFormVisible ? 'Close Questionnaire' : 'Adopt a New Pet'
        ) : (
          <Link to="/login">Sign In to Access Questionnaire</Link>
        )}
      </button>

      {isFormVisible && currentUser && (
        <div className="pet-form-container">
          <PetQuestionnaireForm onSubmit={handleSubmit} />
        </div>
      )}

      <h2 className="home-page-title">Your Pets</h2>
      {userPets.length > 0 ? (
        <ul className="home-page-pet-list">
          {userPets.map((pet) => (
            <li key={pet.id} className="home-page-pet-item">
              <Link to={`/pets/${pet.id}`} className="home-page-pet-link">{pet.pet_name}</Link>
              <button className="home-page-delete-button" onClick={() => handleDeletePet(pet.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="home-page-no-pets">You have no pets.</p>
      )}
    </div>
  );
};

export default HomePage;
