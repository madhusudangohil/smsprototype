'use strict';
module.exports = function(sequelize, DataTypes) {
  const session = sequelize.define('Session', {
    phoneNumber: DataTypes.STRING,
    stateId: DataTypes.INTEGER
  });

  session.associate = (models)=>{
    session.hasMany(models.InboundMessage, {foreignKey: 'id'});
    session.hasMany(models.OutboundMessage, {foreignKey: 'id'});
    session.hasOne(models.FakeQueue, {foreignKey: 'id'});
    session.hasOne(models.SessionState, {foreignKey: 'id'});
  }

  return session;
};