const db = require("../../models/index");
const token = require("../../utils/token");

const Color = db.color;
const Product = db.product;

module.exports = {
  get(req, res) {
    Color.findAll()
      .then(colors => {
        res.status(200).json(colors);
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

    Color.create({
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
    const { color_id, name, status } = req.body.payload;

    const { id, accesstoken } = req.headers;
    const tokenCheck = token.checkToken(id, accesstoken);
    if (!tokenCheck) {
      res.status(404).send("invalid token");
      throw new Error("invalid token");
    }

    Color.update(
      {
        name,
        status
      },
      {
        where: { color_id }
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
        color_id: 1
      },
      {
        where: { color_id: req.body.payload }
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
      return Color.destroy({
        where: {
          color_id: id
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
