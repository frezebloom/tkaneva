const db = require('../../models/index');
const tokenController = require('../tokenController');

const UserGroup = db.userGroup;

module.exports = {
  get(req, res) {
    const { id, accesstoken } = req.headers;
    const tokenCheck = tokenController.checkToken(id, accesstoken);
    if (!tokenCheck) {
      res.status(404).send('invalid token');
      throw new Error('invalid token');
    }

    UserGroup.findAll()
      .then(userGruops => {
        tokenController.checkToken(id, accesstoken);
        return userGruops;
      })
      .then(userGruops => {
        res.status(200).json(userGruops);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send('Invalid request' + error);
      });
  },

  create(req, res) {
    const { id, accesstoken } = req.headers;
    const tokenCheck = tokenController.checkToken(id, accesstoken);
    if (!tokenCheck) {
      res.status(404).send('invalid token');
      throw new Error('invalid token');
    }

    const { name, status } = req.body.userGroup;

    UserGroup.create({
      name,
      status
    })
      .then(() => {
        res.status(201).send('Ok');
      })
      .catch(error => {
        console.log(error);
        res.status(404).send('Invalid request' + error);
      });
  },

  update(req, res) {
    const { group_id, name, status } = req.body.userGroup;

    const { id, accesstoken } = req.headers;
    const tokenCheck = tokenController.checkToken(id, accesstoken);
    if (!tokenCheck) {
      res.status(404).send('invalid token');
      throw new Error('invalid token');
    }

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
        res.status(201).send('Ok');
      })
      .catch(error => {
        console.log(error);
        res.status(404).send('Invalid request ' + error);
      });
  },

  delete(req, res) {
    const { id, accesstoken } = req.headers;
    const tokenCheck = tokenController.checkToken(id, accesstoken);
    if (!tokenCheck) {
      res.status(404).send('invalid token');
      throw new Error('invalid token');
    }

    const { group_id } = req.body.userGroup;

    UserGroup.destroy({
      where: {
        group_id: group_id
      }
    })
      .then(() => {
        res.status(200).send('Ok');
      })
      .catch(error => {
        console.log(error);
        res.status(404).send('Invalid request ' + error);
      });
  }
};
