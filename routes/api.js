const express = require('express');
const router = express.Router();

const userController = require('../controllers/api/userController.js');
const userGroupController = require('../controllers/api/userGroupController.js');
const superUserController = require('../controllers/api/superUserController.js');

router.get('/user/get', (req, res) => {
  userController.get(req, res);
});

router.post('/user/create', (req, res) => {
  userController.create(req, res);
});

router.put('/user/update', (req, res) => {
  userController.update(req, res);
});

router.post('/user/delete', (req, res) => {
  userController.delete(req, res);
});

router.get('/user-group/get', (req, res) => {
  userGroupController.get(req, res);
});

router.post('/user-group/create', (req, res) => {
  userGroupController.create(req, res);
});

router.post('/superuser/user/create', (req, res) => {
  superUserController.createSuperUser(req, res);
});

router.post('/superuser/user-group/create', (req, res) => {
  superUserController.createSuperUserGroup(req, res);
});

module.exports = router;
