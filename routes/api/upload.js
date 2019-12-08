const express = require("express");
const router = express.Router();

const uploadMiddleware = require("../../utils/middleware/uploadMiddleware");
const uploadController = require("../../controllers/api/uploadController");

router.get("/upload/image", (req, res) => {
  uploadController.render(req, res);
});

router.post("/upload/image", uploadMiddleware.single("image"), (req, res) => {
  uploadController.upload(req, res);
});

module.exports = router;
