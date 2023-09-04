const createPet = require("./createPet");
const getPet = require("./getPet");
const updatePet = require("./updatePet");
const deletePet = require("./deletePet");
const listPets = require("./listPets");
const listPetsByOwnerId = require("./listPetsByOwnerId")

module.exports = {
  createPet,
  getPet,
  listPets,
  updatePet,
  deletePet,
  listPetsByOwnerId,
};
