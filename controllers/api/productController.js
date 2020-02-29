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

    const publicPath = path.join(__dirname, "/../../public/images/products");

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
      const dir = `${publicPath}/${article}`;
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdir(dir, function(error) {
            if (error) {
              console.log("Failed to create directory", error);
              res.status(404).send("Invalid request " + error);
            } else {
              const promises = uploadedFiles.map(file => {
                const source = file.path;
                const destination = `${dir}/${file.fileName}`;
                return copyFile(source, destination);
              });

              Promise.all(promises)
                .then(() => {
                  clearTmp(uploadedFiles);
                })
                .catch(error => {
                  console.log(error);
                  res.status(404).send("Invalid request " + error);
                });
            }
          });
          return article;
        } else {
          console.log(uploadedFiles + "2");
          return article;
        }
      } catch (err) {
        console.error(err);
        res.status(404).send("Invalid request " + error);
      }
    }

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
      console.log(files);
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
