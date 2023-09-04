const express = require("express");
const userController = require("./controllers/user/index");
const petsController = require("./controllers/pets/index");
const addModelsToRequest = require("./middleware/add-models-to-request");
const checkAuthentication = require("./middleware/check-authentication");

const Router = express.Router();
Router.use(addModelsToRequest);

// /api/resources - Create, Read All
// /api/resources/:id - Get One, Update, Delete

Router.get("/users", userController.list);
Router.post("/users", userController.create);
Router.get("/users/:id", userController.show);
Router.patch("/users/:id", checkAuthentication, userController.update);

Router.post("/login", userController.login);
Router.delete("/logout", userController.logout);
Router.get("/me", userController.showMe);

Router.post("/pets", petsController.createPet);
Router.delete("/pets/:id", petsController.deletePet);
Router.get("/pets/:id", petsController.getPet);
Router.get("/pets", petsController.listPets);
Router.put('/pets/:id', petsController.updatePet);
Router.get('/pets/owner/:owner_id', petsController.listPetsByOwnerId);

// These actions require authentication (only valid logged in users can do these things)
// The checkAuthentication middleware will only run for these specified routes.
Router.get("/logged-in-secret", checkAuthentication, (req, res) => {
  res.send({ msg: "The secret is: there is no secret." });
});

module.exports = Router;
