module.exports = function(sequelize, Sequelize) {
  const Token = sequelize.define("token", {
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

  Token.associate = models => {
    Token.belongsTo(models.user);
  };

  return Token;
};
