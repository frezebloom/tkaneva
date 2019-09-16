const bcrypt = require('bcrypt');
const db = require('../../models/index');

const UserGroup = db.userGroup;
const User = db.user;

module.exports = {
  salt: bcrypt.genSaltSync(10),

  createSuperUser(req, res) {
    const {
      first_name,
      last_name,
      login,
      email,
      group_id,
      password,
      status
    } = req.body.user;

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
      .then(user => {
        res.status(201).send(user.dataValues);
      })
      .catch(error => {
        res.status(404).send('Invalid request ' + error);
      });
  },
  createSuperUserGroup(req, res) {
    const { name, status } = req.body.userGroup;
    UserGroup.create({
      name,
      status
    })
      .then(() => {
        res.status(201).send('Ok');
      })
      .catch(error => {
        res.status(404).send('Invalid request' + error);
      });
  }
};
