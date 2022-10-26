const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('clients', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
        type: DataTypes.NUMERIC,
        allowNull: false,
    },
    countrie: {
        type: DataTypes.STRING,
        allowNull: false,
    },

  });
};