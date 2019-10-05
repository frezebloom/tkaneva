const bcrypt = require('bcrypt');
const db = require('../../models/index');
const tokenController = require('../tokenController');

const User = db.user;
const UserGroup = db.userGroup;

module.exports = {
  salt: bcrypt.genSaltSync(10),

  async get(req, res) {
    const { id, accesstoken } = req.headers;
    const tokenCheck = await tokenController.checkToken(id, accesstoken);
    if (!tokenCheck) {
      res.status(404).send('invalid token');
      throw new Error('invalid token');
    }

    User.findAll({
      include: [
        {
          model: UserGroup
        }
      ]
    })
      .then(users => {
        tokenController.checkToken(id, accesstoken);
        return users;
      })
      .then(users => {
        res.status(200).json(users);
      })
      .catch(error => {
        res.status(404).send('Invalid request ' + error);
      });
  },

  async create(req, res) {
    const { id, accesstoken } = req.headers;
    const tokenCheck = await tokenController.checkToken(id, accesstoken);
    if (!tokenCheck) {
      res.status(404).send('invalid token');
      throw new Error('invalid token');
    }

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

  async update(req, res) {
    const {
      user_id,
      first_name,
      last_name,
      login,
      email,
      group_id,
      status
    } = req.body.user;

    const { id, accesstoken } = req.headers;
    const tokenCheck = await tokenController.checkToken(id, accesstoken);
    if (!tokenCheck) {
      res.status(404).send('invalid token');
      throw new Error('invalid token');
    }

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
        res.status(201).send('Ok');
      })
      .catch(error => {
        console.log(error);
        res.status(404).send('Invalid request ' + error);
      });
  },

  async delete(req, res) {
    const { id, accesstoken } = req.headers;
    const tokenCheck = await tokenController.checkToken(id, accesstoken);
    if (!tokenCheck) {
      res.status(404).send('invalid token');
      throw new Error('invalid token');
    }

    const { user_id } = req.body.user;
    User.destroy({
      where: {
        user_id: user_id
      }
    })
      .then(() => {
        res.status(200).send('Ok');
      })
      .catch(error => {
        res.status(404).send('Invalid request ' + error);
      });
  }
};
