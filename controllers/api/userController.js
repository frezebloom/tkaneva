module.exports = {
  user: {
    firstname: "Mikhail",
    lastname: "Yarema"
  },
  render: function(req, res) {
    res.send(this.user);
  }
};
