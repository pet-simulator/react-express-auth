const knex = require("../knex");

class Pet {
  constructor({ id, pet_name, species, owner_id }) {
    this.id = id;
    this.pet_name = pet_name;
    this.species = species;
    this.owner_id = owner_id;
    this.happy_level = 50;
    this.clean_level = 50;
    this.energy_level = 50;
    this.hunger_level = 50;
  }

  static async listPets() {
    const query = "SELECT * FROM pets";
    const pets = await knex.raw(query);
    return pets.rows.map((pet) => new Pet(pet));
  }

  static async getPet(id) {
    const query = "SELECT * FROM pets WHERE id = ?";
    const {
      rows: [pet],
    } = await knex.raw(query, [id]);
    return pet ? new Pet(pet) : null;
  }

  static async createPet({ pet_name, species, owner_id }) {
    const query = `INSERT INTO pets (pet_name, species, owner_id)
      VALUES (?, ?, ?) RETURNING *`;
    const {
      rows: [pet],
    } = await knex.raw(query, [pet_name, species, owner_id]);
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

