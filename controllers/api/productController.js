const db = require("../../models/index");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");

const Product = db.product;
const Category = db.category;
const Brand = db.brand;
const Color = db.color;

const publicPath = path.join(__dirname, "/../../public/images/products");

function copyFile(source, destination) {
  const input = fs.createReadStream(source);
  const output = fs.createWriteStream(destination);
  return new Promise((resolve, reject) => {
    output.on("error", reject);
    input.on("error", reject);
    input.on("end", resolve);
    input.pipe(output);
  });
}

function clearTmp(files) {
  files.forEach(function ({ path }) {
    fs.unlink(path, (error) => {
      if (error) throw error;
      console.log("File deleted!");
    });
  });
}

module.exports = {
  get(req, res) {
    Product.findAll({
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
        return products;
      })
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((error) => {
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
      status,
    } = req.body.payload;

    Product.max("product_id", {})
      .then((maxId) => {
        const id = _.isNaN(maxId) ? 0 : maxId + 1;
        const article = `${category_id}${brand_id}${color_id}${id}`;
        return transferImages(article, uploadedFiles);
      })
      .then(({ article, uploads_id }) => {
        return createProduct(article, uploads_id);
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });

    function transferImages(article, uploadedFiles) {
      if (uploadedFiles.length === 0) {
        return { article };
      }

      const uploads_id = JSON.stringify(uploadedFiles.map((file) => file.id));
      const dir = `${publicPath}/${article}`;

      try {
        fs.mkdir(dir, function (error) {
          if (error) {
            console.log("Failed to create directory", error);
            res.status(404).send("Invalid request " + error);
          } else {
            const promises = uploadedFiles.map((file) =>
              copyFile(file.path, `${dir}/${file.fileName}`)
            );

            Promise.all(promises)
              .then(() => {
                clearTmp(uploadedFiles);
              })
              .catch((error) => {
                console.log(error);
                res.status(404).send("Invalid request " + error);
              });
          }
        });

        return { article, uploads_id };
      } catch (error) {
        console.error(error);
        res.status(404).send("Invalid request " + error);
      }
    }

    function createProduct(article, uploads_id = "") {
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
        uploads_id,
        brand_id,
        category_id,
        color_id,
        status,
      })
        .then(() => {
          res.status(201).send("Ok");
        })
        .catch((error) => {
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
      uploadedFiles,
      status,
    } = req.body.payload;

    Product.findOne({
      where: {
        product_id,
      },
    })
      .then((product) => {
        const { uploads_id } = product.dataValues;

        const uploadedFilesId = uploadedFiles.map((file) => file.id);

        const deletedFiles = JSON.parse(uploads_id).filter(
          (id) => !uploadedFilesId.includes(id)
        );

        const newUploadFiles = uploadedFiles.filter(
          (file) => !uploads_id.includes(file.id)
        );

        console.log(deletedFiles);
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send("Invalid request" + error);
      });

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
        status,
      },
      {
        where: { product_id },
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
    Product.destroy({
      where: {
        product_id: req.body.payload,
      },
    })
      .then(() => {
        res.status(200).send("Ok");
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });
  },
};
