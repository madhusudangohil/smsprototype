'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('InboundMessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING
      },
      sessionId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: {tableName: 'Sessions'},
          key: 'id',
          as:'sessionId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  
  down: (queryInterface, Sequelize) => 
    queryInterface.dropTable('InboundMessages')
  
};