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
          user_id: user_id
        };

        const response = {
          userId: tokenData.user_id,
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token
        };

        Token.findOne({ where: { user_id: user_id } }).then(token => {
          if (!token) {
            Token.create(tokenData)
              .then(() => {
                res.status(200).json(response);
              })
              .catch(error => {
                res.status(404).send("Invalid request");
              });
          } else {
            Token.update(tokenData, { where: { user_id: user_id } })
              .then(() => {
                res.status(200).json(response);
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
    const { user_id, refresh_token } = req.body;

    Token.findOne({ where: { user_id: user_id }, include: [User] })
      .then(data => {
        if (
          refresh_token === data.refresh_token &&
          data.refresh_token_life > Date.now()
        ) {
          const payload = {
            user: data.user.login,
            email: data.user.email
          };

          const token = jwt.sign(payload, config.SECRET_KEY, {
            expiresIn: config.TOKEN_LIFE
          });

          const tokenData = {
            access_token: token,
            refresh_token: data.refresh_token,
            access_token_life: Date.now() + config.TOKEN_LIFE * 1000,
            refresh_token_life: data.refresh_token_life,
            user_id: data.user_id
          };

          const response = {
            userId: tokenData.user_id,
            accessToken: tokenData.access_token,
            refreshToken: tokenData.refresh_token
          };

          Token.update(tokenData, { where: { user_id: data.user_id } })
            .then(() => {
              res.status(200).json(response);
            })
            .catch(error => {
              res.status(404).send("Invalid request");
            });
        }
        return true;
      })
      .catch(error => {
        res.status(401).send("Unauthorized");
      });
  }
};
