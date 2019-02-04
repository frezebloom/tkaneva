module.exports = function(sequelize, Sequelize) {
  const Category = sequelize.define("category", {
    category_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    name: {
      type: Sequelize.STRING,
      notEmpty: true
    }
  });

  return Category;
};