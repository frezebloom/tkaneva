module.exports = {
  render: function(req, res) {
    res.render("index", { title: "Hey", message: "Hello there!" });
  }
};
