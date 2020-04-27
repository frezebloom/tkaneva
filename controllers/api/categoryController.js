const limax = require("limax");
const db = require("../../models/index");

const Category = db.category;
const Product = db.product;

module.exports = {
  get(req, res) {
    Category.findAll()
      .then((categories) => {
        res.status(200).json(categories);
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send("Invalid request" + error);
      });
  },

  create(req, res) {
    const { name, status } = req.body.payload;
    const slug = limax(name);

    Category.create({
      name,
      slug,
      status,
    })
      .then(() => {
        res.status(201).send("Ok");
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send("Invalid request" + error);
      });
  },

  update(req, res) {
    const { category_id, name, status } = req.body.payload;
    Category.update(
      {
        name,
        status,
      },
      {
        where: { category_id },
      }
    )
      .then(() => {
        res.status(201).send("Ok");
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });
  },

  delete(req, res) {
    Product.update(
      {
        category_id: 1,
      },
      {
        where: { category_id: req.body.payload },
      }
    )
      .then(() => {
        return destroy(req.body.payload);
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });

    function destroy(id) {
      return Category.destroy({
        where: {
          category_id: id,
        },
      })
        .then(() => {
          res.status(200).send("Ok");
        })
        .catch((error) => {
          console.log(error);
          res.status(404).send("Invalid request " + error);
        });
    }
  },
};
