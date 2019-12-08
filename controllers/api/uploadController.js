const path = require("path");
const Resize = require("../../utils/resize");

module.exports = {
  render: function(req, res) {
    res.render("uploadTest", { title: "Hey", message: "Hello there!" });
  },

  upload: async function(req, res) {
    const imagePath = path.join(__dirname, "/../../public/images/products");
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
      res.status(401).json({ error: "Please provide an image" });
    }
    const filename = await fileUpload.save(req.file.buffer);
    return res.status(200).json({ name: filename });
  }
};
