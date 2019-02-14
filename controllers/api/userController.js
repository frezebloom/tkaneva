module.exports = {
  create(req, res) {
    const { firstname, lastname, email, group, password } = req.body.user;
    console.log(email);
  }
};
