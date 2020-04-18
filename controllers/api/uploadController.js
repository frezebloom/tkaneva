const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const mime = require("mime-types");
const url = require("url");
const uuid = require("uuid/v1");
const db = require("../../models/index");

const Upload = db.upload;

module.exports = {
  get: (req, res) => {
    const query = url.parse(req.url, true).query.payload;
    const params = JSON.parse(query);
    Upload.findAll({
      where: {
        upload_id: params
      }
    })
      .then(uploads => {
        res.status(200).json(uploads);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("Invalid request" + error);
      });
  },
  upload: (req, res, next) => {
    const imagePath = path.join(__dirname, "/../../tmp");

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, imagePath);
      },
      filename: (req, file, cb) => {
        cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
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

    const processingFileInfo = files => {
      return files.map(file => {
        const { filename, originalname, path, size } = file;
        return Upload.create({
          name: filename,
          original_name: originalname,
          path,
          size
        })
          .then(data => {
            return {
              id: data.upload_id,
              fileName: data.name,
              originalName: data.original_name,
              path: data.path,
              size: data.size
            };
          })
          .catch(error => {
            console.log(error);
            res.status(404).send("Invalid request" + error);
          });
      });
    };

    upload(req, res, error => {
      if (error instanceof multer.MulterError) {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      } else if (error) {
        console.log(error);
        res.status(404).send("Invalid request " + error);
      }

      const fileInfo = processingFileInfo(req.files);

      Promise.all(fileInfo).then(files => {
        res.status(201).send(files);
      });

      // next();
    });
  }

  // rename: (req, res) => {
  //   req.files.forEach(file => {
  //     const name = uuid();
  //     sharp(file.path).toFile(
  //       `${file.destination}/${name}`,
  //       (error, info, name) => {
  //         if (error) res.status(404).send("Invalid request " + error);
  //         console.log(name);
  //         res.status(201).send(name);
  //       }
  //     );
  //   });
  // }

  // resize: (req, res) => {
  //   const sizes = {
  //     sm: {
  //       height: 128,
  //       width: 128
  //     },
  //     md: {
  //       height: 256,
  //       width: 256
  //     },
  //     lg: {
  //       height: 512,
  //       width: 512
  //     }
  //   };

  //   Object.keys(sizes).forEach(key => {
  //     req.files.forEach(file => {
  //       sharp(file.path)
  //         .resize(sizes[key].height, sizes[key].width)
  //         .toFile(`${file.destination}/${key}-${uuid()}`, (error, info) => {
  //           if (error) res.status(404).send("Invalid request " + error);
  //           res.status(201).send("Ok");
  //         });
  //     });
  //   });
  // }
};
