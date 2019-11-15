module.exports = function(sequelize, Sequelize) {
  const Color = sequelize.define("color", {
    color_id: {
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

  return Color;
};
