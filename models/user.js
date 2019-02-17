module.exports = function(sequelize, Sequelize) {
  const User = sequelize.define("user", {
    user_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    firstname: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    lastname: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    login: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },

    group: {
      type: Sequelize.TEXT
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    status: {
      type: Sequelize.ENUM("Вкл", "Выкл"),
      defaultValue: "Вкл"
    }
  });

  User.associate = models => {
    User.hasOne(models.token, {
      foreignKey: "fk_customerid",
      targetKey: "user_id"
    });
  };

  return User;
};
