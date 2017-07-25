'use strict';
module.exports = function(sequelize, DataTypes) {
  const sessionState = sequelize.define('SessionState', {
    stateDescription: DataTypes.STRING
  });

  sessionState.associate = (models)=>{
    sessionState.belongsTo(models.Session, {foreignKey: 'sessionId'});
  }

  return sessionState;
};