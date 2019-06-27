const bcrypt = require("bcrypt");
const db = require("../../models/index");

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
        res.status(200).json(users);
      })
      .catch(error => {
        res.status(404).send("Invalid request" + error);
      });
  },

  create(req, res) {
    const {
      first_name,
      last_name,
      login,
      email,
      group_id,
      password
    } = req.body.user;

    const passwordToSave = bcrypt.hashSync(password, this.salt);

    User.create({
      first_name,
      last_name,
      login,
      email,
      group_id,
      password: passwordToSave
    })
      .then(user => {
        res.status(201).send(user.dataValues);
      })
      .catch(error => {
        res.status(404).send("Invalid request" + error);
      });
  },

  update(req, res) {
    const {
      user_id,
      first_name,
      last_name,
      login,
      email,
      group,
      password
    } = req.body.user;
    const passwordToSave = bcrypt.hashSync(password, this.salt);
    User.update(
      {
        first_name,
        last_name,
        login,
        email,
        group,
        password: passwordToSave
      },
      {
        where: { user_id }
      }
    )
      .then(() => {
        res.status(201).send("Ok");
      })
      .catch((error) => {
        res.status(404).send("Invalid request" + error);
      });
  },

  delete(req, res) {
    const { id } = req.body.user;
    User.destroy({
      where: {
        user_id: id
      }
    })
      .then((users) => {
        console.log(users);
        res.status(200).json(users);
      })
      .catch(error => {
        res.status(404).send("Invalid request" + error);
      });
  }
};
