module.exports = function(sequelize, Sequelize) {
  var Token = sequelize.define("token", {
    token_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    user_id: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    name: {
      type: Sequelize.STRING,
      notEmpty: true
    }
  });

  return Token;
};
