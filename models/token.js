module.exports = function(sequelize, Sequelize) {
  const Token = sequelize.define("token", {
    user_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    token: {
      type: Sequelize.STRING,
      notEmpty: true
    }
  });

  Token.associate = models => {
    Token.belongsTo(models.user, {
      foreignKey: "fk_customerid",
      targetKey: "user_id"
    });
  };

  return Token;
};
