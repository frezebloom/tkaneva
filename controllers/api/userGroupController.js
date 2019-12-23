const db = require("../../models/index");

const UserGroup = db.userGroup;
const User = db.user;

module.exports = {
  get(req, res) {
    UserGroup.findAll()
      .then(userGruops => {
        return userGruops;
      })
      .then(userGruops => {
        res.status(200).json(userGruops);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request" + error);
      });
  },

  create(req, res) {
    const { name, status } = req.body.payload;
    UserGroup.create({
      name,
      status
    })
      .then(() => {
        res.status(201).send("Ok");
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request" + error);
      });
  },

  update(req, res) {
    const { group_id, name, status } = req.body.payload;
    UserGroup.update(
      {
        name,
        status
      },
      {
        where: { group_id }
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
    User.update(
      {
        group_id: 1
      },
      {
        where: { group_id: req.body.payload }
      }
    )
      .then(() => {
        return destroy(req.body.payload);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });

    function destroy(userGroup) {
      return UserGroup.destroy({
        where: {
          group_id: userGroup
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
  }
};
