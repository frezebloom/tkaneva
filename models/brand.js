module.exports = function(sequelize, Sequelize) {
  var Brand = sequelize.define("brand", {
    brand_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    name: {
      type: Sequelize.STRING,
      notEmpty: true
    }
  });

  return Brand;
};
