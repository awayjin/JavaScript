'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoComplete: true },
    username: STRING(20),
    pwd: STRING(50),
  });
  return User;
};
