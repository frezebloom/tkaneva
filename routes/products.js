const products = require("../controllers/products.js");

module.exports = function(router) {
  router.get("/", products.render);
};
