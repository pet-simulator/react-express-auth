import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPet, updatePet } from '../adapters/pet-adapter';
import PetStatusBars from '../components/statusBar';
import { Link } from 'react-router-dom';
import backgroundMusic from '/assets/ background-music.mp3'

const PetPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [happy, setHappy] = useState(0);
  const [clean, setClean] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [hunger, setHunger] = useState(0);
  const [encouragement, setEncouragement] = useState('Welcome');
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    const encouragementInterval = setInterval(updateEncouragementMessage, 6000); 
    return () => clearInterval(encouragementInterval);
  }, []);
  const toggleMusic = () => {

    setIsPlaying(!isPlaying);
  };
  const encouragingMessages = [
    "You're the best pet owner!",
    "I love spending time with you!",
    "Thanks for taking care of me!",
    "You make me so happy!",
    "I'm lucky to have you as my owner!",
    "Your love and care mean the world to me!",
    "I cherish every moment we share together.",
    "Your kindness brightens my day!",
    "You're the reason for my wagging tail!",
    "Your presence makes everything better.",
    "I appreciate all the treats and belly rubs!",
    "You're the purr-fect companion!",
    "I'm grateful for our adventures together.",
    "Your hugs are my favorite!",
    "You're the sunshine in my life!",
    "Your smile warms my heart.",
    "I'm so lucky to be loved by you!",
    "Your cuddles are the best cuddles!",
    "You're the most pawsome friend!",
    "I'm feline great with you by my side!",
    "Your laughter is music to my ears!",
    "You light up my world with your kindness.",
    "Every day with you is a tail-wagging day!",
    "Your friendship is my greatest treasure.",
    "I woof you more than words can express!",
    "You're the peanut butter to my jelly!",
    "Your care keeps me healthy and happy.",
    "With you, every day is a treat!",
    "Your presence is a gift I cherish.",
    "You fill my world with joy and love!",
    "You're the key to my happiness!",
  ];
  const updateEncouragementMessage = () => {
    const randomIndex = Math.floor(Math.random() * encouragingMessages.length);
    const randomMessage = encouragingMessages[randomIndex];
    setEncouragement(randomMessage);
  };


  useEffect(() => {
    const audioElement = new Audio(backgroundMusic);

    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    return () => {
      audioElement.pause();
    };
  }, [isPlaying]);

  

  useEffect(() => {
    const petDataFromLocalStorage = localStorage.getItem(`pet_${id}`);
    if (petDataFromLocalStorage) {
      const petData = JSON.parse(petDataFromLocalStorage);
      setHappy(petData.happy);
      setClean(petData.clean);
      setEnergy(petData.energy);
      setHunger(petData.hunger);
    } else {
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
    const attributeDecreaseInterval = setInterval(() => {
      const attributes = ['happy', 'clean', 'energy', 'hunger'];
      const randomAttribute = attributes[Math.floor(Math.random() * attributes.length)];
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

      localStorage.setItem(`pet_${id}`, JSON.stringify({ happy, clean, energy, hunger }));
    }, 3000);

    return () => clearInterval(attributeDecreaseInterval);
  }, [id, happy, clean, energy, hunger]);

  const handleAction = async (action) => {
    try {
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
          newEnergy = Math.max(newEnergy +25, 0);
          newHunger = Math.max(newHunger - 10, 0);
          newClean = Math.max(newClean - 15, 0);
          break;
        default:
          break;
      }

      setHappy(Math.min(Math.max(newHappy, 0), 100));
      setClean(Math.min(Math.max(newClean, 0), 100));
      setEnergy(Math.min(Math.max(newEnergy, 0), 100));
      setHunger(Math.min(Math.max(newHunger, 0), 100));

      await updatePet({
        id,
        happy_level: newHappy,
        clean_level: newClean,
        energy_level: newEnergy,
        hunger_level: newHunger,
      });

      localStorage.setItem(`pet_${id}`, JSON.stringify({ happy: newHappy, clean: newClean, energy: newEnergy, hunger: newHunger }));
    } catch (error) {
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
        return 'unknown_image_url.jpg';
    }
  }

  const threshold = 20;
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

  const showWarningMessage = warningMessages.length > 0;
  const gameOverThreshold = 0;
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
          <p><Link to='/'>Return Home</Link></p>
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
  
  return (
    <div className="pet-page-background">
      <div>
        <h2 className="pet-page-title">{pet_name}'s Page</h2>
      </div>
      <button className='music-Button' onClick={toggleMusic}>
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
      {showWarningMessage && (
        <div className="cute-warnings">
          {warningMessages.map((message, index) => (
            <div className="cute-warning" key={index}>
              {message}
            </div>
          ))}
        </div>
      )} 
      <div className="encouragement">
        <p className="encouragement-text">
          {pet_name} says: "{encouragement}"
        </p>
      </div>
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
