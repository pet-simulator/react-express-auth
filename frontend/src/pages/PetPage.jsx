import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPet } from '../adapters/pet-adapter'; // You'll need to create this function

 export default  function PetPage(){
  const { petId } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const petData = await getPet(petId); // Implement this function to fetch pet details
        setPet(petData);
      } catch (error) {
        // Handle error fetching the pet
      }
    };

    fetchPet();
  }, [petId]);

  if (!pet) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pet-page">
      <h2>{pet.pet_name}</h2>
      {/* Display other pet details here */}
    </div>
  );
};



