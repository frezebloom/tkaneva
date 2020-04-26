const path = require("path");
const db = require("../models/index");
const Product = db.product;
const Category = db.category;
const Brand = db.brand;
const Color = db.color;
const Upload = db.upload;

const publicPath = path.join(__dirname, "/../../public/images/products");

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

  getFilesPath: function (directory, uploadId) {
    return Upload.findAll({
      where: {
        upload_id: uploadId,
      },
    })
      .then((uploads) => {
        Promise.resolve(uploads.map(({ name }) => `${directory}/${name}`));
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send("Invalid request" + error);
      });
  },

  getCategories: function () {
    return Category.findAll();
  },

  render: function (req, res) {
    const tasks = [this.getProducts, this.getFilesPath];

    const a = tasks.reduce((acc, fn) => acc.then(fn), Promise.resolve());

    a.then((result) => {
      console.log(result);
    });

    //   Promise.all([this.getProducts(), this.getCategories()]).then((values) => {
    //     const products = values[0].map((product) => {
    //       const { article, uploads_id } = product.dataValues;
    //       const directory = `${publicPath}/${article}`;

    //       this.getFilesPath(directory, JSON.parse(uploads_id)).then((path) => {
    //         return product.dataValues;
    //       });
    //     });
    //     const categories = values[1].map((category) => category.dataValues);
    //     res.render("index", { products, categories });
    //   });
    // },
  },
};
