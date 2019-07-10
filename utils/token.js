const db = require("../models/index");
const Token = db.token;

module.exports = {
  compareToken(user_id, accesstoken) {
    Token.findOne({ where: { user_id: user_id } })
    .then(token => {
      if (token.access_token !== accesstoken) {
        return 's';
      } else {
        return 'f';
      }
    })

  }
}