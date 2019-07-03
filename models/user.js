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
        validate: {
          notEmpty: true
        }
      },

      last_name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },

      login: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isUnique: function(value, next) {
            User.findOne({
              where: { login: value }
            }).done(function(error) {
              if (error)
                return next(
                  JSON.stringify({
                    login: "Указанный логин уже занят"
                  })
                );
              next();
            });
          }
        }
      },

      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
          notEmpty: true,
          isUnique: function(value, next) {
            User.findOne({
              where: { email: value }
            }).done(function(error) {
              if (error)
                return next(
                  JSON.stringify({
                    login: "Указанный адрес электронной почты уже занят"
                  })
                );
              next();
            });
          }
        }
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
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
            this.getDataValue("last_name") +
            " " +
            this.getDataValue("first_name")
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
    User.belongsTo(models.userGroup, {
      foreignKey: "group_id",
      targetKey: "group_id"
    });
  };

  return User;
};
