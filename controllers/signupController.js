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
  },
  token: (req, res) => {
    // refresh the damn token
    const data = req.body;
    // if refresh token exists
    if (data.refreshToken.indexOf(this.tokenList) !== -1) {
      const user = {
        email: data.email,
        name: data.name
      };
      const token = jwt.sign(user, config.SECRET_KEY, {
        expiresIn: config.TOKEN_LIFE
      });
      const response = {
        token: token
      };
      // update the token in the list
      this.tokenList[data.refreshToken].token = token;
      res.status(200).json(response);
    } else {
      res.status(404).send("Invalid request");
    }
  }
};
