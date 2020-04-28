module.exports = function (sequelize, Sequelize) {
  const Category = sequelize.define("category", {
    category_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    name: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

    // slug: {
    //   type: Sequelize.STRING,
    //   notEmpty: true,
    // },

    status: {
      type: Sequelize.ENUM("Вкл", "Выкл"),
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.product, {
      foreignKey: "category_id",
      targetKey: "category_id",
    });
  };

  return Category;
};
