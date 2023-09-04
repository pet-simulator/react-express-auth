const User = require("../db/models/user");
const Pet = require("../db/models/pets");

const addModelsToRequest = (req, res, next) => {
  req.db = {
    User,
    Pet,
  };
  next();
};

module.exports = addModelsToRequest;
