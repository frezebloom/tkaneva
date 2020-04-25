const db = require("../models/index");
const Product = db.product;
const Category = db.category;
const Brand = db.brand;
const Color = db.color;

module.exports = {
  getProducts: function () {
    return Product.findAll({
      include: [
        {
          model: Category,
        },
        {
          model: Brand,
        },
        {
          model: Color,
        },
      ],
    });
  },
  getCategories: function () {
    return Category.findAll();
  },
  render: function (req, res) {
    Promise.all([this.getCategories()]).then((values) => {
      const categories = values[0].map((category) => category.dataValues);
      console.log(categories);
      res.render("index", { categories });
    });
  },
};
