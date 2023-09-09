import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPet, updatePet } from '../adapters/pet-adapter';
import PetStatusBars from '../components/statusBar';

const PetPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // Define state variables for the pet's attributes
  const [happy, setHappy] = useState(0);
  const [clean, setClean] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [hunger, setHunger] = useState(0);

  // Initialize attributes from local storage or use default values
  useEffect(() => {
    const petDataFromLocalStorage = localStorage.getItem(`pet_${id}`);
    if (petDataFromLocalStorage) {
      const petData = JSON.parse(petDataFromLocalStorage);
      setHappy(petData.happy);
      setClean(petData.clean);
      setEnergy(petData.energy);
      setHunger(petData.hunger);
    } else {
      // If no data is found in local storage, set default values of 50
      setHappy(50);
      setClean(50);
      setEnergy(50);
      setHunger(50);
    }
  }, [id]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPet(id);
        if (data && data.length > 0) {
          const petData = data[0];
          setPet(petData);
          setIsLoading(false);
        } else {
          setError('Pet data is missing or null');
          setIsLoading(false);
        }
      } catch (error) {
        setError('Error fetching pet: ' + error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    // Decrease a random attribute over time using a timer
    const attributeDecreaseInterval = setInterval(() => {
      // Randomly select an attribute to decrease
      const attributes = ['happy', 'clean', 'energy', 'hunger'];
      const randomAttribute = attributes[Math.floor(Math.random() * attributes.length)];
  
      // Decrease the selected attribute by a certain amount (adjust these values as needed)
      const decreaseAmount = Math.floor(Math.random() * 5) + 5;
  
      switch (randomAttribute) {
        case 'happy':
          setHappy((prevHappy) => Math.max(prevHappy - decreaseAmount, 0));
          break;
        case 'clean':
          setClean((prevClean) => Math.max(prevClean - decreaseAmount, 0));
          break;
        case 'energy':
          setEnergy((prevEnergy) => Math.max(prevEnergy - decreaseAmount, 0));
          break;
        case 'hunger':
          setHunger((prevHunger) => Math.max(prevHunger - decreaseAmount, 0));
          break;
        default:
          break;
      }
  
      // Update local storage with the new attribute values
      localStorage.setItem(`pet_${id}`, JSON.stringify({ happy, clean, energy, hunger }));
    }, 3000); // Decrease a random attribute every 10 seconds (adjust the interval as needed)
  
    // Clean up the interval when the component unmounts
    return () => clearInterval(attributeDecreaseInterval);
  }, [id, happy, clean, energy, hunger]);
  

  const handleAction = async (action) => {
    try {
      // Calculate updated attribute levels
      let newHappy = happy;
      let newClean = clean;
      let newEnergy = energy;
      let newHunger = hunger;

      switch (action) {
        case 'eat':
          newHappy = Math.min(newHappy + 10, 100);
          newEnergy = Math.min(newEnergy + 15, 100);
          newHunger = Math.max(newHunger + 25, 0);
          newClean = Math.max(newClean - 15, 0);
          break;
        case 'sleep':
          newEnergy = Math.min(newEnergy + 25, 100);
          newHunger = Math.max(newHunger - 10, 0);
          break;
        case 'bathe':
          newHappy = Math.max(newHappy - 10, 0);
          newClean = Math.min(newClean + 25, 100);
          break;
        case 'play':
          newHappy = Math.min(newHappy + 25, 100);
          newEnergy = Math.max(newEnergy - 15, 0);
          newHunger = Math.max(newHunger - 10, 0);
          newClean = Math.max(newClean - 15, 0);
          break;
        default:
          break;
      }

      // Update the state variables while ensuring they are within the range [0, 100]
      setHappy(Math.min(Math.max(newHappy, 0), 100));
      setClean(Math.min(Math.max(newClean, 0), 100));
      setEnergy(Math.min(Math.max(newEnergy, 0), 100));
      setHunger(Math.min(Math.max(newHunger, 0), 100));

      // Send the updated levels to the server
      await updatePet({
        id,
        happy_level: newHappy,
        clean_level: newClean,
        energy_level: newEnergy,
        hunger_level: newHunger,
      });

      // Update local storage with the new attribute values
      localStorage.setItem(`pet_${id}`, JSON.stringify({ happy: newHappy, clean: newClean, energy: newEnergy, hunger: newHunger }));
    } catch (error) {
      // Handle error
      console.error('Error updating pet:', error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!pet) {
    return <div className="no-data">No pet data available.</div>;
  }

  const { species, pet_name } = pet;

  // Determine pet image source based on species
  const petImgSrc = determinePetImage(species);

  function determinePetImage(species) {
    switch (species) {
      case 'Dog':
        return 'https://png.pngtree.com/png-clipart/20230308/ourmid/pngtree-cartoon-dog-puppy-sticker-cute-png-image_6629416.png';
      case 'Cat':
        return 'https://static.vecteezy.com/system/resources/previews/013/078/569/original/illustration-of-cute-colored-cat-cartoon-cat-image-in-format-suitable-for-children-s-book-design-elements-introduction-of-cats-to-children-books-or-posters-about-animal-free-png.png';
      case 'Bunny':
        return 'https://i.pinimg.com/originals/bd/2e/e9/bd2ee9e08816a9a0801f056597230fac.png';
      default:
        console.error('Unknown species:', species);
        return 'unknown_image_url.jpg'; // Default image for unknown species
    }
  }

  const threshold = 20; // Threshold for all attributes

  // Determine which messages to display based on the attributes that are below the threshold
  const warningMessages = [];

  if (happy < threshold) {
    warningMessages.push(`${pet_name} is not very happy. Cheer them up!`);
  }

  if (clean < threshold) {
    warningMessages.push(`${pet_name} could use a bath. Time to get clean!`);
  }

  if (energy < threshold) {
    warningMessages.push(`${pet_name} is low on energy. Let them rest!`);
  }

  if (hunger < threshold) {
    warningMessages.push(`${pet_name} is hungry. Feed them!`);
  }

  // Determine if any warning message should be displayed
  const showWarningMessage = warningMessages.length > 0;

  const gameOverThreshold = 0; // Define the threshold for game over (e.g., any attribute reaching 0)

  // Check for game over condition
  const isGameOver =
    happy <= gameOverThreshold &&
    clean <= gameOverThreshold &&
    energy <= gameOverThreshold &&
    hunger <= gameOverThreshold;

      if (isGameOver) {
        return (
          <div className="pet-page-background">
            <div className="game-over">
              <h2>Game Over</h2>
              <p>{pet_name} couldn't survive. Try again!</p>
              <div className="button-container">
                <button className="action-button" disabled>
                  Eat
                </button>
                <button className="action-button" disabled>
                  Sleep
                </button>
                <button className="action-button" disabled>
                  Bathe
                </button>
                <button className="action-button" disabled>
                  Play
                </button>
              </div>
            </div>
          </div>
        );
      }
    
      // Content when the game is not over
      return (
        <div className="pet-page-background">
          <div>
            <h2 className="pet-page-title">{pet_name}'s Page</h2>
          </div>
          {showWarningMessage && (
            <div className="cute-warnings">
              {warningMessages.map((message, index) => (
                <div className="cute-warning" key={index}>
                  {message}
                </div>
              ))}
            </div>
          )}
          <img
            className="pet-image"
            src={petImgSrc}
            alt={pet_name}
            style={{ width: '300px', height: '400px' }}
          />
          <PetStatusBars happy={happy} clean={clean} energy={energy} hunger={hunger} />
          <div className="button-container">
            <button className="action-button" onClick={() => handleAction('eat')} disabled={isGameOver}>
              Eat
            </button>
            <button className="action-button" onClick={() => handleAction('sleep')} disabled={isGameOver}>
              Sleep
            </button>
            <button className="action-button" onClick={() => handleAction('bathe')} disabled={isGameOver}>
              Bathe
            </button>
            <button className="action-button" onClick={() => handleAction('play')} disabled={isGameOver}>
              Play
            </button>
          </div>
        </div>
      );
    }; 
export default PetPage; 