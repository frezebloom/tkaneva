module.exports = function(sequelize, Sequelize) {
  const Product = sequelize.define("product", {
    product_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    article: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    name: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    category: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    description: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    structure: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    brand: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    color: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    width: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    length: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    density: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    price: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    discount: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    status: {
      type: Sequelize.ENUM("Вкл", "Выкл")
    }
  });

  return Product;
};
