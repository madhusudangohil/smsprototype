'use strict';
module.exports = function(sequelize, DataTypes) {
  const fakeQueue = sequelize.define('FakeQueue', {
    sessionId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    fromNumber: DataTypes.STRING,
    assignedTo: DataTypes.STRING,
    status: DataTypes.STRING
  });

  fakeQueue.associate = (models)=>{
    fakeQueue.hasOne(models.InboundMessage, {foreignKey: 'messageId'});
    fakeQueue.belongsTo(models.Session, {foreignKey: 'sessionId'});
  }

  return fakeQueue;
};