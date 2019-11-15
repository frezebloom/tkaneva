const db = require("../../models/index");
const token = require("../../utils/token");

const Category = db.category;
const Product = db.product;

module.exports = {
  get(req, res) {
    Category.findAll()
      .then(categories => {
        res.status(200).json(categories);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request" + error);
      });
  },

  create(req, res) {
    const { id, accesstoken } = req.headers;
    const tokenCheck = token.checkToken(id, accesstoken);
    if (!tokenCheck) {
      res.status(404).send("invalid token");
      throw new Error("invalid token");
    }

    const { name, status } = req.body.payload;

    Category.create({
      name,
      status
    })
      .then(() => {
        res.status(201).send("Ok");
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request" + error);
      });
  },

  update(req, res) {
    const { category_id, name, status } = req.body.payload;

    const { id, accesstoken } = req.headers;
    const tokenCheck = token.checkToken(id, accesstoken);
    if (!tokenCheck) {
      res.status(404).send("invalid token");
      throw new Error("invalid token");
    }

    Category.update(
      {
        name,
        status
      },
      {
        where: { category_id }
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
    const { id, accesstoken } = req.headers;
    const tokenCheck = token.checkToken(id, accesstoken);
    if (!tokenCheck) {
      res.status(404).send("invalid token");
      throw new Error("invalid token");
    }

    Product.update(
      {
        category_id: 1
      },
      {
        where: { category_id: req.body.payload }
      }
    )
      .then(() => {
        return destroy(req.body.payload);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });

    function destroy(id) {
      return Category.destroy({
        where: {
          category_id: id
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
  }
};
