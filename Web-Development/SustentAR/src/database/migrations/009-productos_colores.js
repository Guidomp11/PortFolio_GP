'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('productos_colores', {
      id:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      id_producto: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull : false, 
        references : {
          model : 'productos',
          key : 'id'
        }
      },
      id_colores: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references : {
          model : 'colores',
          key : 'id'
        }
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('productos_colores') 
  }
};
