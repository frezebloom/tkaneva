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
        },
        // unique: {
        //   msg: 'Email address already in use!'
        // }
      },

      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
          notEmpty: true,
          unique: {
            args: true,
            msg: 'Email address already in use!',
          }
        },
        
        
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
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
