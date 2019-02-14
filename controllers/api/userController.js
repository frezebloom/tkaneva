var bcrypt = require("bcrypt");
const db = require("../../models/index");
const User = db.user;

module.exports = {
  create(req, res) {
    const { firstname, lastname, email, group, password } = req.body.user;

    const salt = bcrypt.genSaltSync(10);
    const passwordToSave = bcrypt.hashSync(password, salt);

    User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      group: group,
      password: passwordToSave
    }).then(user => {
      res.send(user);
    });
  }
};
