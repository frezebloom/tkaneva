module.exports = function(sequelize, Sequelize) {
  const User = sequelize.define(
    "user",
    {
      user_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      first_name: {
        type: Sequelize.STRING,
        notEmpty: true
      },

      last_name: {
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
    },
    {
      getterMethods: {
        id: function() {
          return this.getDataValue("user_id");
        },
        fullName: function() {
          return (
            this.getDataValue("first_name") +
            " " +
            this.getDataValue("last_name")
          );
        }
      }
    }
  );

  User.associate = models => {
    User.hasOne(models.token, {
      foreignKey: "user_id",
      targetKey: "user_id"
    });
  };

  return User;
};
