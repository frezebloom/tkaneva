const config = require("../config/config");
const address = require("address");
const db = require("../models/index");
const Product = db.product;
const Category = db.category;
const Brand = db.brand;
const Color = db.color;
const Upload = db.upload;

const publicPath = `${address.ip()}:${config.PORT}`;
// `http://${window.location.hostname}:3000/api/upload/image`

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
    })
      .then((products) => {
        const mappers = this.getFilesUpload(products).then(
          (productsMapper) => productsMapper
        );
        return mappers;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getFilesUpload: function (products) {
    const uploadPromises = products.map((product) => {
      const { article, uploads_id } = product.dataValues;

      return Upload.findAll({
        where: {
          upload_id: JSON.parse(uploads_id),
        },
      })
        .then((uploads) => {
          product.imagesPath = uploads.map(
            (upload) =>
              `http://${publicPath}/images/products/${article}/${upload.name}`
          );
          return product;
        })
        .catch((error) => {
          console.log(error);
          res.status(404).send("Invalid request" + error);
        });
    });

    return Promise.all(uploadPromises).then((result) => result);
  },

  getCategories: function () {
    return Category.findAll();
  },

  render: function (req, res) {
    Promise.all([this.getProducts(), this.getCategories()]).then((values) => {
      const products = values[0];
      const categories = values[1].map((category) => category.dataValues);
      res.render("index", { products, categories });
    });
  },
};
