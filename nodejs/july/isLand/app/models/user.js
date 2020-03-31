// 数据迁移 SQL 更新 风险
const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

class User extends Model {

}

// 模型相当于表
User.init({
  // 模型属性
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'user' // 我们需要选择模型名称
  // tableName: 'User' // 我们需要选择模型名称
})

// 定义的模型是类本身
// console.log(User === sequelize.models.User); // true


module.exports = {
  User
}