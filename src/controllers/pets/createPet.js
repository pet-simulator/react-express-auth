const createPet = async (req, res) => {
  try {
    const {
      session,
      db: { Pet },
      body: { pet_name, species, owner_id },
    } = req;

    const newPet = await Pet.createPet({
      pet_name,
      species,
      owner_id,
    });

    res.status(201).json(newPet);
  } catch (error) {
    console.error("Error creating pet:", error);
    res.status(500).send("An error occurred while creating the pet.");
  }
};

module.exports = createPet;
