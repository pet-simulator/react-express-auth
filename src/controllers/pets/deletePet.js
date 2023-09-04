const deletePet = async (req, res) => {
  const {
    session,
    db: { Pet },
    params: { id },
  } = req;

  const pet = await Pet.getPet(id);
  
  if (!pet) {
    console.log("Pet not found");
    return res.sendStatus(404);
  }

  const isOwner = pet.owner_id === session.userId
  if (!isOwner) return res.sendStatus(401)
  
  // return res.send('hey')
  await pet.deletePet();
  res.sendStatus(204);
};

module.exports = deletePet;

