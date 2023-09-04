const listPetsByOwnerId = async (req, res) => {
    try {
      const { Pet } = req.db;
      const { owner_id } = req.params;
  
      // Fetch pets by owner_id
      const pets = await Pet.listPetsByOwnerId(owner_id);
  
      if (!pets || pets.length === 0) {
        // No pets found for the owner
        return res.status(404).json({ message: 'No pets found for this owner.' });
      }
  
      // Return the list of pets
      res.status(200).json(pets);
    } catch (error) {
      // Handle internal server errors
      console.error('Error getting pets by owner_id:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = listPetsByOwnerId;
  
  
  
  
  