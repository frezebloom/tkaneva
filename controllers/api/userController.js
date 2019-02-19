const bcrypt = require("bcrypt");
const db = require("../../models/index");

const User = db.user;

module.exports = {
  create(req, res) {
    const {
      firstname,
      lastname,
      login,
      email,
      group,
      password
    } = req.body.user;

    const salt = bcrypt.genSaltSync(10);
    const passwordToSave = bcrypt.hashSync(password, salt);

    User.create({
      firstname: firstname,
      lastname: lastname,
      login: login,
      email: email,
      group: group,
      password: passwordToSave
    })
      .then(user => {
        res.status(201).send("Ok");
      })
      .catch(error => {
        res.status(404).send("Invalid request");
      });
  },

  get(req, res) {
    User.findAll()
      .then(users => {
        res.status(200).json("Ok");
      })
      .catch(error => {
        res.status(404).send("Invalid request");
      });
  }
};
