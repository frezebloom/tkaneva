const path = require("path");
const multer = require("multer");

module.exports = {
  render: function(req, res) {
    res.render("uploadTest", { title: "Hey", message: "Hello there!" });
  },

  upload: async function(req, res) {
    const imagePath = path.join(__dirname, "/../../public/images/products");

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, imagePath);
      },
      filename: (req, file, cb) => {
        cb(
          null,
          file.originalname.replace(/\.[^/.]+$/, "") +
            "-" +
            Date.now() +
            path.extname(file.originalname)
        );
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
      res.status(200).send("files uploaded");
    });
  }
};
