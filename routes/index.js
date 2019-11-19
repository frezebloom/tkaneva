const auth = require("./api/auth");
const user = require("./api/user");
const userGroup = require("./api/userGroup");
const color = require("./api/color");
const brand = require("./api/brand");
const category = require("./api/category");
const superuser = require("./api/superuser");
const products = require("./products");

module.exports = {
  auth,
  user,
  userGroup,
  color,
  brand,
  category,
  superuser,
  products
};
