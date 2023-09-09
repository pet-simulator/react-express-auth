import { fetchHandler, getPostOptions, getPatchOptions, deleteOptions } from "../utils";

const petBaseUrl = '/api/pets';

export const createPet = async ({ pet_name, species, owner_id }) => {
  // Set default levels to 50
  const defaultLevels = {
    happy_level: 50,
    clean_level: 50,
    hunger_level: 50,
    energy_level: 50,
  };

  const petData = { pet_name, species, owner_id, ...defaultLevels };

  return fetchHandler(petBaseUrl, getPostOptions(petData));
};


export const getAllPets = async () => {
  const [pets] = await fetchHandler(petBaseUrl);
  return pets || [];
};

export const getPet = async (id) => fetchHandler(`${petBaseUrl}/${id}`);

export const updatePet = async ({  id, pet_name, species,happy_level,
  clean_level,
  hunger_level,
  energy_level, }) => (
  fetchHandler(`${petBaseUrl}/${id}`, getPatchOptions({id, pet_name, species, happy_level,
    clean_level,
    hunger_level,
    energy_level, }))
);

export const deletePet = async (id) => {
  const response = await fetch(`${petBaseUrl}/${id}`, deleteOptions);

  if (response.status === 204) {
    return true;
  } else if (response.status === 404) {
    return false;
  }
};

export const listPetsByOwnerId = async (owner_id) => {
  const response = await fetch(`${petBaseUrl}?ownerId=${owner_id}`);
  return response.json();
};

