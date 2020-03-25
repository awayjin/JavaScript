const { Sequelize, Model } = require('sequelize')
const { db } = require('../../core/db')

class User extends Model {

}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  passsworld: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
})

module.exports = User