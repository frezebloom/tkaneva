module.exports = function(sequelize, Sequelize) {
  var Color = sequelize.define("color", {
    color_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    name: {
      type: Sequelize.STRING,
      notEmpty: true
    }
  });

  return Color;
};
