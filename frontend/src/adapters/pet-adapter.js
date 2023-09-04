// Import statements
import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";
const petBaseUrl = "/api/pets";

// Create a new pet
export const createPet = async ({ pet_name, species }) => {
  try {
    const response = await fetchHandler(
      petBaseUrl,
      getPostOptions({ pet_name, species })
    );

    if (response.status === 201) {
      const newPetData = await response.json();
      return newPetData;
    } else {
      throw new Error("Failed to create pet");
    }
  } catch (error) {
    console.error("Error creating pet:", error);
    throw error;
  }
};

// Get pet by ID
export const getPet = async (id) => {
  try {
    const response = await fetchHandler(`${petBaseUrl}/${id}`);

    if (response.status === 200) {
      const petData = await response.json();
      return petData;
    } else if (response.status === 404) {
      return null;
    } else {
      throw new Error("Failed to get pet");
    }
  } catch (error) {
    console.error("Error getting pet:", error);
    throw error;
  }
};

// Update pet's levels
export const updatePetLevels = async ({
  id,
  happy_level,
  clean_level,
  energy_level,
  hunger_level,
}) => {
  try {
    const response = await fetchHandler(
      `${petBaseUrl}/${id}`,
      getPatchOptions({
        id,
        happy_level,
        clean_level,
        energy_level,
        hunger_level,
      })
    );

    if (response.status === 200) {
      const updatedPetData = await response.json();
      return updatedPetData;
    } else if (response.status === 404) {
      return null;
    } else {
      throw new Error("Failed to update pet levels");
    }
  } catch (error) {
    console.error("Error updating pet levels:", error);
    throw error;
  }
};

// Delete pet by ID
export const deletePet = async (id) => {
  try {
    const response = await fetch(`${petBaseUrl}/${id}`, {
      method: "DELETE",
    });

    if (response.status === 204) {
      return true;
    } else if (response.status === 404) {
      return false;
    } else {
      throw new Error("Failed to delete pet");
    }
  } catch (error) {
    console.error("Error deleting pet:", error);
    throw error;
  }
};

// List all pets
export const listPets = async () => {
  try {
    const response = await fetch(`${petBaseUrl}`);

    if (response.status === 200) {
      const petsData = await response.json();
      return petsData;
    } else {
      throw new Error("Failed to list pets");
    }
  } catch (error) {
    console.error("Error listing pets:", error);
    throw error;
  }
};

// List pets by owner ID
export const listPetsByOwnerId = async (owner_id) => {
  try {
    const response = await fetch(`${petBaseUrl}?owner_id=${owner_id}`);

    if (response.status === 200) {
      const petsData = await response.json();
      return petsData;
    } else {
      throw new Error("Failed to list pets by owner ID");
    }
  } catch (error) {
    console.error("Error listing pets by owner ID:", error);
    throw error;
  }
};
