const db = require("../../models/index");

const UserGroup = db.userGroup;

module.exports = {
  get(req, res) {
    UserGroup.findAll()
      .then(userGruops => {
        res.status(200).json(userGruops);
      })
      .catch(error => {
        res.status(404).send("Invalid request" + error);
      });
  },

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
