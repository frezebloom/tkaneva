const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = {
  tokenList: {},
  signup: function(req, res) {
    const data = req.body;
    const user = {
      name: data.name,
      password: data.password
    };
    // do the database authentication here, with user name and password combination.
    const token = jwt.sign(user, config.SECRET_KEY, {
      expiresIn: config.TOKEN_LIFE
    });
    const refreshToken = jwt.sign(user, config.REFRESH_TOKEN_SECRET, {
      expiresIn: config.REFRESH_TOKEN_LIFE
    });
    const response = {
      status: "Logged in",
      token: token,
      refreshToken: refreshToken
    };
    this.tokenList[refreshToken] = response;
    res.status(200).json(response);
  }
};
