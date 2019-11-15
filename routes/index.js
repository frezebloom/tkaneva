const auth = require("./api/auth");
const user = require("./api/user");
const userGroup = require("./api/userGroup");
const superuser = require("./api/superuser");
const products = require("./products");

module.exports = {
  auth,
  user,
  userGroup,
  superuser,
  products
};
