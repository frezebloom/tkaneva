const db = require("../../models/index");
const path = require("path");
const fs = require("fs");

const Product = db.product;
const Category = db.category;
const Brand = db.brand;
const Color = db.color;

module.exports = {
  get(req, res) {
    Product.findAll({
      include: [
        {
          model: Category
        },
        {
          model: Brand
        },
        {
          model: Color
        }
      ]
    })
      .then(products => {
        return products;
      })
      .then(products => {
        res.status(200).json(products);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });
  },

  create(req, res) {
    const {
      name,
      description,
      balance,
      structure,
      width,
      length,
      density,
      price,
      discount,
      brand_id,
      category_id,
      color_id,
      uploadedFiles,
      status
    } = req.body.payload;

    const publicPath = path.join(__dirname, "/../../tmp");

    Product.count()
      .then(count => {
        return `${category_id}${brand_id}${color_id}${count}`;
      })
      .then(acticle => {
        return transferImages(acticle);
      })
      .then(article => {
        return createProduct(article);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });

    function transferImages(article) {
      if (uploadedFiles.length === 0) {
        return article;
      }
      fs.mkdir(`${publicPath}/${article}`, { recursive: true }, err => {
        if (err) throw err;
      });
    }

    function createProduct(article) {
      return Product.create({
        article,
        name,
        description,
        balance,
        structure,
        width,
        length,
        density,
        price,
        discount,
        brand_id,
        category_id,
        color_id,
        status
      })
        .then(() => {
          res.status(201).send("Ok");
        })
        .catch(error => {
          console.log(error);
          res.status(404).send("Invalid request " + error);
        });
    }
  },

  update(req, res) {
    const {
      product_id,
      article,
      name,
      description,
      balance,
      structure,
      width,
      length,
      density,
      price,
      discount,
      brand_id,
      category_id,
      color_id,
      status
    } = req.body.payload;
    Product.update(
      {
        product_id,
        article,
        name,
        description,
        balance,
        structure,
        width,
        length,
        density,
        price,
        discount,
        brand_id,
        category_id,
        color_id,
        status
      },
      {
        where: { product_id }
      }
    )
      .then(() => {
        res.status(201).send("Ok");
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });
  },

  delete(req, res) {
    Product.destroy({
      where: {
        product_id: req.body.payload
      }
    })
      .then(() => {
        res.status(200).send("Ok");
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });
  }
};
