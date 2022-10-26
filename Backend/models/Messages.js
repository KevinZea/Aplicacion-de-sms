const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('messages', {

    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  });
};