const db = require('../../models/index');

const UserGroup = db.userGroup;
const User = db.user;

module.exports = {
  createSuperUser(req, res) {
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
        res.status(404).send('Invalid request ' + error);
      });
  },
  createSuperUserGroup(req, res) {
    const { name } = req.body.userGroup;
    console.log(req.body.userGroup);
    UserGroup.create({
      name
    })
      .then(() => {
        res.status(201).send('Ok');
      })
      .catch(error => {
        res.status(404).send('Invalid request' + error);
      });
  }
};
