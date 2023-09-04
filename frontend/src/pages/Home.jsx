import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PetQuestionnaireForm from '../components/PetQuestionnaireForm';
import CurrentUserContext from '../contexts/current-user-context';
import { listPetsByOwnerId, createPet, deletePet } from '../adapters/pet-adapter'; // Import the necessary API functions

const HomePage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userPets, setUserPets] = useState([]); // State to store the user's pets
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    // Fetch the user's pets when the component mounts or when currentUser changes
    if (currentUser) {
      listUserPets(currentUser.id);
    }
  }, [currentUser]);

  const listUserPets = async (owner_id) => {
    try {
      const petsData = await listPetsByOwnerId(owner_id);
      setUserPets(petsData);
    } catch (error) {
      console.error('Error fetching user pets:', error);
    }
  };

  const toggleForm = () => {
    if (currentUser) {
      setIsFormVisible(!isFormVisible);
    }
  };

  const handleDeletePet = async (id) => {
    try {
      const deleted = await deletePet(id);
      if (deleted) {
        // Remove the deleted pet from the userPets list
        setUserPets((prevUserPets) => prevUserPets.filter((pet) => pet.id !== pet));
      } else {
        console.error('Failed to delete pet');
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  const handleSubmit = async (formData) => {
    // Create a new pet and add it to the userPets list
    try {
      const [newPet, error] = await createPet(formData);
      if (error) {
        console.error('Failed to create pet:', error);
      } else {
        // Add the new pet to the userPets list
        setUserPets((prevUserPets) => [...prevUserPets, newPet]);
      }
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };

  return (
    <div className="home-page-wrapper">
      <button className="adopt-button" onClick={toggleForm}>
        {currentUser ? (isFormVisible ? 'Close Questionnaire' : 'Adopt a New Pet') : (
          <Link to="/login">Sign In to Access Questionnaire</Link>
        )}
      </button>

      {isFormVisible && currentUser && (
        <PetQuestionnaireForm handleSubmit={handleSubmit} />
      )}

      {userPets.length > 0 && (
        <div>
          <h2>Your Pets</h2>
          <ul>
            {userPets.map((pet) => (
              <li key={pet.id}>
                <Link to={`/pets/${pet.id}`}>{pet.name}</Link>
                <button onClick={() => handleDeletePet(pet.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;








