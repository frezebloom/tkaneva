module.exports = {
  render: function(req, res) {
    res.render("uploadTest", { title: "Hey", message: "Hello there!" });
  }
};
