const bcrypt = require("bcrypt");
const db = require("../../models/index");
const token = require("../../utils/token");

const User = db.user;
const UserGroup = db.userGroup;

module.exports = {
  salt: bcrypt.genSaltSync(10),

  get(req, res) {
    User.findAll({
      include: [
        {
          model: UserGroup
        }
      ]
    })
      .then(users => {
        return users;
      })
      .then(users => {
        res.status(200).json(users);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });
  },

  create(req, res) {
    const {
      first_name,
      last_name,
      login,
      email,
      group_id,
      password,
      status
    } = req.body.payload;

    const passwordToSave = bcrypt.hashSync(password, this.salt);

    User.create({
      first_name,
      last_name,
      login,
      email,
      group_id,
      password: passwordToSave,
      status
    })
      .then(() => {
        res.status(201).send("Ok");
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });
  },

  update(req, res) {
    const {
      user_id,
      first_name,
      last_name,
      login,
      email,
      group_id,
      status
    } = req.body.payload;
    User.update(
      {
        first_name,
        last_name,
        login,
        email,
        group_id,
        status
      },
      {
        where: { user_id }
      }
    )
      .then(() => {
        res.status(201).send("Ok");
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });
  },

  delete(req, res) {
    User.destroy({
      where: {
        user_id: req.body.payload
      }
    })
      .then(() => {
        res.status(200).send("Ok");
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });
  }
};
