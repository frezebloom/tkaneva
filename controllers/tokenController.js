const db = require("../models/index");
const Token = db.token;

module.exports = {
  checkToken(user_id, accesstoken) {

  return Token.findOne({ where: { user_id: user_id } })
    .then(token => {
      if (token.access_token !== accesstoken) return false;
      return true;
    })
    .catch(() => {
      return false;
    })
  }
}