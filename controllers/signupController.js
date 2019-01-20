const jwt = require("jsonwebtoken");

module.exports = {
  tokenList: {},
  signup: function(req, res) {
    const data = req.body;
    const user = {
      name: data.name,
      password: data.password
    };
    // do the database authentication here, with user name and password combination.
    const token = jwt.sign(user, config.secret, {
      expiresIn: config.tokenLife
    });
    const refreshToken = jwt.sign(user, config.refreshTokenSecret, {
      expiresIn: config.refreshTokenLife
    });
    const response = {
      status: "Logged in",
      token: token,
      refreshToken: refreshToken
    };
    tokenList[refreshToken] = response;
    res.status(200).json(response);
    res.render("signup");
  }
};
