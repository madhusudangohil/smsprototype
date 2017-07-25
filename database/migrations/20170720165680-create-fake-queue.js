'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('FakeQueues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sessionId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model:'Sessions',
          key: 'id',
          as:'sessionId'
        }
      },
      messageId: {
        type: Sequelize.INTEGER,
        references:{
          model:'InboundMessages',
          key: 'id',
          as:'message'
        }
      },
      fromNumber: {
        type: Sequelize.STRING
      },
      assignedTo: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
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
    queryInterface.dropTable('FakeQueues')
};