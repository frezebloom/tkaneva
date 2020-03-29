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
          console.log("пришёл " + accesstoken);
          console.log("сохранен " + token.access_token);
          console.log("token_life " + token.access_token_life);
          console.log("а сейчас " + Date.now());

          console.log("invalid token");
          res.status(404).send("invalid token");
        } else {
          next();
          return true;
        }
      })
      .catch(error => {
        console.log(error);
        res.status(404).send("invalid token");
        next();
        throw new Error("invalid token");
      });
  }
};
