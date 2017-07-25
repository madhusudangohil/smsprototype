'use strict';
module.exports = function(sequelize, DataTypes) {
  const inboundMessage = sequelize.define('InboundMessage', {
    message: DataTypes.STRING(1024),
    sessionId: DataTypes.INTEGER
  }
  );

  inboundMessage.associate = (models)=> {
    inboundMessage.belongsTo(models.Session, {foreignKey: 'sessionId', targetKey:'id'});
  }

  
  return inboundMessage;
};