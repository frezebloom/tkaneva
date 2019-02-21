const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config/config");
const db = require("../../models/index");

const User = db.user;
const Token = db.token;

module.exports = {
  signup(req, res) {
    const { login, password } = req.body;

    User.findOne({ where: { login: login } })
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          const payload = {
            user: user.login,
            email: user.email
          };

          const token = jwt.sign(payload, config.SECRET_KEY, {
            expiresIn: config.TOKEN_LIFE
          });

          const refreshToken = jwt.sign(payload, config.SECRET_KEY_REFRESH, {
            expiresIn: config.TOKEN_LIFE_REFRESH
          });

          return {
            user,
            token,
            refreshToken
          };
        }
      })
      .then(data => {
        const { user_id } = data.user;

        const tokenData = {
          access_token: data.token,
          refresh_token: data.refreshToken,
          access_token_life: Date.now() + config.TOKEN_LIFE * 1000,
          refresh_token_life: Date.now() + config.TOKEN_LIFE_REFRESH * 1000,
          user_id: data.user.user_id
        };

        Token.findOne({ where: { user_id: user_id } }).then(token => {
          if (!token) {
            Token.create(tokenData)
              .then(() => {
                res.status(200).json(tokenData);
              })
              .catch(error => {
                res.status(404).send("Invalid request");
              });
          } else {
            Token.update(tokenData, { where: { user_id: user_id } })
              .then(() => {
                res.status(200).json(tokenData);
              })
              .catch(error => {
                res.status(404).send("Invalid request");
              });
          }
        });

        return true;
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
