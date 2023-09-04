const listPets = async (req, res) => {
  const {
    db: { Pet },
  } = req;
  try {
    const pets = await Pet.listPets();
    res.send(pets);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = listPets;
