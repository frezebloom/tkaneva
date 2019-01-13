module.exports = {
  user: {
    firstname: "Mikhail",
    lastname: "Yarema"
  },
  getUser: function(req, res) {
    res.json(req.body.id);
  }
};
