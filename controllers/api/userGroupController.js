const db = require("../../models/index");

const UserGroup = db.userGroup;

module.exports = {
  create(req, res) {
    const { name } = req.body.userGroup;

    UserGroup.create({
      name
    })
      .then(() => {
        res.status(201).send("Ok");
      })
      .catch(error => {
        res.status(404).send("Invalid request" + error);
      });
  }
};
