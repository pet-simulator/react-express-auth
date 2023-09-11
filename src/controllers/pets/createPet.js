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
  } catch (error) {
    console.error("Error creating pet:", error);
    res.status(500).json({ success: false, message: "Failed to create the pet." });
  }
};

module.exports = createPet;

