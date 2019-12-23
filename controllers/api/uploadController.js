const path = require("path");
const multer = require("multer");
const sharp = require("sharp");

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
        fileSize: 1000000, // max size of files to upload / bytes
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
          return cb("File type not allowed ");
        }
      }
    }).any();

    upload(req, res, err => {
      if (err instanceof multer.MulterError) {
        console.log(err);
      } else if (err) {
        console.log(err);
      }
      next();
    });
  },
  resize: (req, res) => {
    req.files.forEach(file => {
      console.log(file);
      sharp(file.path)
        .resize(300, 240)
        .toFile(`${file.destination}/1${file.filename}`, (err, info) => {
          if (err) console.log(err);
          console.log(info);
        });
    });
  }
};
