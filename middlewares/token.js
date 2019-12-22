const db = require("../models/index");
const Token = db.token;

module.exports = {
  checkToken(req, res, next) {
    const { id, accesstoken } = req.headers;
    Token.findOne({ where: { user_id: id } })
      .then(token => {
        if (
          token.access_token !== accesstoken ||
          token.access_token_life < Date.now()
        ) {
          res.status(404).send("invalid token");
          throw new Error("invalid token");
        } else {
          next();
        }
      })
      .catch(() => {
        res.status(404).send("invalid token");
        throw new Error("invalid token");
      });
  }
};
