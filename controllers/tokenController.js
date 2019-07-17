const db = require("../models/index");
const Token = db.token;

module.exports = {
  checkToken(user_id, accesstoken) {

  return Token.findOne({ where: { user_id: user_id } })
    .then(token => {
      if (token.access_token !== accesstoken) return false;
      if (token.access_token_life < Date.now()) return false;
      console.log(user_id, token.access_token, accesstoken)
      return true;
    })
    .catch(() => {
      return false;
    })
  }
}