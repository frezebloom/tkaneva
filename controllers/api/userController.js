const bcrypt = require("bcrypt");
const db = require("../../models/index");

const User = db.user;

module.exports = {
  salt: bcrypt.genSaltSync(10),

  get(req, res) {
    User.findAll()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(error => {
        res.status(404).send("Invalid request");
      });
  },

  create(req, res) {
    const {
      firstname,
      lastname,
      login,
      email,
      group,
      password
    } = req.body.user;

    const passwordToSave = bcrypt.hashSync(password, this.salt);

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

  update(req, res) {
    const {
      id,
      firstname,
      lastname,
      login,
      email,
      group,
      password
    } = req.body.user;

    const passwordToSave = bcrypt.hashSync(password, this.salt);

    User.update(
      {
        firstname,
        lastname,
        login,
        email,
        group,
        password: passwordToSave
      },
      {
        where: { id }
      }
    ).then(() => {
      res.status(200).send("updated successfully a customer with id = " + id);
    });
  }
};
