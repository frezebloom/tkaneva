module.exports = function(sequelize, Sequelize) {
  const Token = sequelize.define("token", {
    token_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    access_token: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    refresh_token: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    access_token_life: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    refresh_token_life: {
      type: Sequelize.STRING,
      notEmpty: true
    }
  });

  Token.associate = models => {
    Token.belongsTo(models.user, {
      foreignKey: "user_id",
      targetKey: "user_id"
    });
  };

  return Token;
};
