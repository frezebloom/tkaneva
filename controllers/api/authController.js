const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config/config");
const db = require("../../models/index");

const User = db.user;

module.exports = {
  tokenList: {},
  signup(req, res) {
    const { login, password } = req.body;

    User.findOne({ where: { login: login } })
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(req.body, config.SECRET_KEY, {
            expiresIn: config.TOKEN_LIFE
          });

          const refreshToken = jwt.sign(req.body, config.SECRET_KEY_REFRESH, {
            expiresIn: config.TOKEN_LIFE_REFRESH
          });

          const response = {
            accessToken: token,
            refreshToken: refreshToken,
            expiresIn: Date.now() + config.TOKEN_LIFE * 1000
          };

          this.tokenList[refreshToken] = response;
          res.status(200).json(response);
        } else {
          res.status(401).send("Unauthorized");
        }
      })
      .catch(error => {
        res.status(401).send("Unauthorized");
      });
  },
  refreshToken(req, res) {
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
