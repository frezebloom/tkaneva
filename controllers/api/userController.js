const db = require("../../models/index");
const User = db.user;

module.exports = {
  create(req, res) {
    const { firstname, lastname, email, group, password } = req.body.user;
    User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      group: group,
      password: password
    }).then(user => {
      res.send(user);
    });
  }
};
