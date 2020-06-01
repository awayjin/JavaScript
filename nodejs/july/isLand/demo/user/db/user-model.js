const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('./db')

// 创建模型
class DemoUser extends Model {

}

DemoUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(128),
      unique: true
    },
    nickName: DataTypes.STRING,
    password1: {
      type: DataTypes.STRING
    },
    openid: {
      type: DataTypes.STRING(64),
      unique: true
    }
  },
  {
    sequelize,
    modelName: 'demo_user',
    freezeTableName: true
  }
)

module.exports = {
  DemoUser
}