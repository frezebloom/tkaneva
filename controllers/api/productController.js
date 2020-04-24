const db = require("../../models/index");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");

const Product = db.product;
const Category = db.category;
const Brand = db.brand;
const Color = db.color;
const Upload = db.upload;

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

function clearDir(files) {
  files.forEach(function ({ path }) {
    fs.unlink(path, (error) => {
      if (error) throw error;
      console.log("File deleted!");
    });
  });
}

function clearFiles(filesId, directory) {
  Upload.findAll({
    where: {
      upload_id: filesId,
    },
  })
    .then((uploads) => {
      const filesPath = uploads.map(({ name }) => {
        return { path: `${directory}/${name}` };
      });

      clearDir(filesPath);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send("Invalid request" + error);
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
                  clearDir(uploadedFiles);
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
      })
      .then(({ article, uploads_id }) => {
        return createProduct(article, uploads_id);
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      });

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
        const uploadsId = JSON.parse(uploads_id);

        const newUploadFiles = uploadedFiles.filter(
          (file) => !uploads_id.includes(file.id)
        );

        const deletedFiles = uploadsId.filter(
          (id) => !uploadedFiles.some((file) => file.id === id)
        );

        const dir = `${publicPath}/${article}`;

        const promises = newUploadFiles.map((file) =>
          copyFile(file.path, `${dir}/${file.fileName}`)
        );

        fs.stat(dir, (error, stats) => {
          if (error && error.code === "ENOENT") {
            fs.mkdir(dir, function (error) {
              if (error) {
                console.log("Failed to create directory", error);
                res.status(404).send("Invalid request " + error);
              } else {
                Promise.all(promises)
                  .then(() => {
                    clearDir(newUploadFiles);

                    if (deletedFiles.length > 0) {
                      clearFiles(deletedFiles, dir);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    res.status(404).send("Invalid request " + error);
                  });
              }
            });
          } else if (error) {
            console.log(error);
            res.status(404).send("Invalid request " + error);
          } else if (stats.isDirectory()) {
            Promise.all(promises)
              .then(() => {
                clearDir(newUploadFiles);

                if (deletedFiles.length > 0) {
                  clearFiles(deletedFiles, dir);
                }
              })
              .catch((error) => {
                console.log(error);
                res.status(404).send("Invalid request " + error);
              });
          }
        });

        return JSON.stringify(uploadedFiles.map((file) => file.id));
      })
      .then((uploads_id) => {
        return updateProduct(uploads_id);
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send("Invalid request" + error);
      });

    function updateProduct(uploads_id) {
      return Product.update(
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
          uploads_id,
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
    }
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
