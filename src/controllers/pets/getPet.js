const getPetById = async (req, res) => {
  const {
    db: { Pet },
    params: { id },
  } = req;
  console.log(req.db);

  const pets = await Pet.getPet(id);
  if (!pets) return res.sendStatus(404);

  res.send(pets);
};

module.exports = getPetById;
