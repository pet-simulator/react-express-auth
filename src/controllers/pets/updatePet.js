const { isAuthorized } = require('../../utils/auth-utils');

const updatePet = async (req, res) => {
  try {
    const {
      session,
      db: { Pet },
      body: { pet_name, species, happy_level, clean_level, energy_level, hunger_level },
      params: { id },
    } = req;

    console.log("Request received with pet_id:", id);
    console.log("Session:", session);

    // Uncomment the following lines to check authorization
    // if (!isAuthorized(id, session)) {
    //   console.log("Unauthorized access attempted.");
    //   return res.sendStatus(403);
    // }

    const pet = await Pet.getPet(id);
    if (!pet) {
      console.log("Pet not found with ID:", id);
      return res.sendStatus(404);
    }

    console.log("Updating pet:", pet);

    await pet.updatePet({
      happy_level,        
      clean_level,
      energy_level,
      hunger_level,
    });

    console.log("Pet updated successfully.");

    res.send(pet);
  } catch (error) {
    console.error("An error occurred:", error);
    res.sendStatus(500);
  }
};

module.exports = updatePet;


