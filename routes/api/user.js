const express = require('express');
const router = express.Router();

const userController = require('../controllers/api/userController.js');
const userGroupController = require('../controllers/api/userGroupController.js');
const superUserController = require('../controllers/api/superUserController.js');