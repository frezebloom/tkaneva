const db = require("../../models/index");

const Brand = db.brand;
const Product = db.product;

module.exports = {
  get(req, res) {
    Brand.findAll()
      .then(brands => {
        res.status(200).json(brands);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request" + error);
      });
  },

  create(req, res) {
    const { name, status } = req.body.payload;

    Brand.create({
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
    const { brand_id, name, status } = req.body.payload;
    Brand.update(
      {
        name,
        status
      },
      {
        where: { brand_id }
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
    Product.update(
      {
        brand_id: 1
      },
      {
        where: { brand_id: req.body.payload }
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
      return Brand.destroy({
        where: {
          brand_id: id
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
