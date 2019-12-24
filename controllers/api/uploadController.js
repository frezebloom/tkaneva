const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const uuid = require("uuid/v1");

module.exports = {
  upload: (req, res, next) => {
    const imagePath = path.join(__dirname, "/../../public/images/products");

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, imagePath);
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    });

    const upload = multer({
      storage,
      limits: {
        fileSize: 1000000,
        files: 10
      },

      fileFilter: function(req, file, cb) {
        const fileTypes = /jpeg|jpg|png|pdf/;
        const extname = fileTypes.test(
          path.extname(file.originalname).toLowerCase()
        );
        const mimeType = fileTypes.test(file.mimetype);

        if (extname && mimeType) {
          return cb(null, true);
        } else {
          res.status(404);
          return cb("File type not allowed");
        }
      }
    }).any();

    upload(req, res, error => {
      if (error instanceof multer.MulterError) {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      } else if (error) {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      }
      next();
    });
  },

  resize: (req, res) => {
    const sizes = {
      sm: {
        height: 128,
        width: 128
      }
      // md: {
      //   height: 256,
      //   width: 256
      // },
      // lg: {
      //   height: 512,
      //   width: 512
      // }
    };

    Object.keys(sizes).forEach(key => {
      req.files.forEach(file => {
        sharp(file.path)
          .resize(sizes[key].height, sizes[key].width)
          .toFile(`${file.destination}/${key}-${uuid()}`, (error, info) => {
            if (error) res.status(404).send("Invalid request " + error);
            console.log(info);
          });
      });
    });
  }
};
