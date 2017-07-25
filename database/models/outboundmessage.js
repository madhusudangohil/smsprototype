'use strict';
module.exports = function(sequelize, DataTypes) {
  const outboundMessage = sequelize.define('OutboundMessage', {
    message: DataTypes.STRING,
    sessionId: DataTypes.INTEGER
  });

  outboundMessage.associate = function(models){
    outboundMessage.belongsTo(models.Session, {foreignKey: 'sessionId'});
  }

  return outboundMessage;
};