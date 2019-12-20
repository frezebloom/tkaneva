module.exports = function(sequelize, Sequelize) {
  const UserGroup = sequelize.define("userGroup", {
    group_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    name: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    status: {
      type: Sequelize.ENUM("Вкл", "Выкл")
    }
  });

  UserGroup.associate = models => {
    UserGroup.hasMany(models.user, {
      foreignKey: "group_id",
      targetKey: "group_id"
    });
  };

  return UserGroup;
};
