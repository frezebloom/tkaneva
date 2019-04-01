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
    }
  });

  UserGroup.associate = models => {
    UserGroup.belongsTo(models.user);
  };

  return UserGroup;
};
