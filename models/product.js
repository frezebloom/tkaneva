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

    description: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    balance: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    structure: {
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

    images: {
      type: Sequelize.TEXT,
      notEmpty: true
    },

    status: {
      type: Sequelize.ENUM("Вкл", "Выкл")
    }
  });

  Product.associate = models => {
    Product.belongsTo(models.brand, {
      foreignKey: "brand_id",
      targetKey: "brand_id"
    });
    Product.belongsTo(models.category, {
      foreignKey: "category_id",
      targetKey: "category_id"
    });
    Product.belongsTo(models.color, {
      foreignKey: "color_id",
      targetKey: "color_id"
    });
  };

  return Product;
};
