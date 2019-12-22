module.exports = function(sequelize, Sequelize) {
  const Brand = sequelize.define("brand", {
    brand_id: {
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

  Brand.associate = models => {
    Brand.hasMany(models.product, {
      foreignKey: "brand_id",
      targetKey: "brand_id"
    });
  };

  return Brand;
};
