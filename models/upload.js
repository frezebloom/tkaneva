module.exports = function(sequelize, Sequelize) {
  const Upload = sequelize.define("upload", {
    upload_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    name: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    original_name: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    path: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    size: {
      type: Sequelize.STRING,
      notEmpty: true
    }
  });

  return Upload;
};
