const knex = require("../knex");

class Pet {
  constructor({ id, pet_name, species, owner_id, happy_level, clean_level, energy_level, hunger_level }) {
    this.id = id;
    this.pet_name = pet_name;
    this.species = species;
    this.owner_id = owner_id;
    this.happy_level = happy_level || 50; // Set default value for happy_level
    this.clean_level = clean_level || 50; // Set default value for clean_level
    this.energy_level = energy_level || 50; // Set default value for energy_level
    this.hunger_level = hunger_level || 50; // Set default value for hunger_level
  }

  static async listPets() {
    const query = "SELECT * FROM pets";
    const pets = await knex.raw(query);
    return pets.rows.map((pet) => new Pet(pet));
  }

static async getPet(id) {
  const query = "SELECT id, pet_name, species, owner_id, happy_level, clean_level, energy_level, hunger_level FROM pets WHERE id = ?";
  const {
    rows: [pet],
  } = await knex.raw(query, [id]);
  return pet ? new Pet(pet) : null;
}


  static async createPet({ pet_name, species, owner_id }) {
    // Set default values for the levels
    const defaultLevels = {
      happy_level: 50,
      clean_level: 50,
      energy_level: 50,
      hunger_level: 50,
    };

    // Merge default levels with provided data
    const petData = {
      pet_name,
      species,
      owner_id,
      ...defaultLevels,
    };

    const query = `INSERT INTO pets (pet_name, species, owner_id, happy_level, clean_level, energy_level, hunger_level)
      VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *`;

    const {
      rows: [pet],
    } = await knex.raw(query, [
      petData.pet_name,
      petData.species,
      petData.owner_id,
      petData.happy_level,
      petData.clean_level,
      petData.energy_level,
      petData.hunger_level,
    ]);

    return new Pet(pet);
  }

  async updatePet({ happy_level, clean_level, energy_level, hunger_level }) {
    const updatedLevels = {};

    if (happy_level !== undefined) {
      updatedLevels.happy_level = happy_level;
    }
    if (clean_level !== undefined) {
      updatedLevels.clean_level = clean_level;
    }
    if (energy_level !== undefined) {
      updatedLevels.energy_level = energy_level;
    }
    if (hunger_level !== undefined) {
      updatedLevels.hunger_level = hunger_level;
    }

    if (Object.keys(updatedLevels).length > 0) {
      const [updatedPet] = await knex("pets")
        .where({ id: this.id })
        .update(updatedLevels)
        .returning("*");

      if (updatedPet) {
        Object.assign(this, updatedLevels);
      }

      return updatedPet ? new Pet(updatedPet) : null;
    } else {
      return null;
    }
  }

  async deletePet() {
    await knex("pets").where({ id: this.id }).del();
  }

  static async listPetsByOwnerId(owner_id) {
    const query = "SELECT * FROM pets WHERE owner_id = ?";
    const pets = await knex.raw(query, [owner_id]);
    return pets.rows.map((pet) => new Pet(pet));
  }
}

module.exports = Pet;


