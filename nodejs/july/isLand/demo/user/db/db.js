const { Sequelize, DataTypes, Model } = require('sequelize')

const sequelize = new Sequelize(
  'island',
  'root',
  '123456',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
)

// 创建模型
class DemoUser extends Model {

}

DemoUser.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'demo_user',
    freezeTableName: true
  }
)
// 模型同步, 创建表
DemoUser.sync()

try {
  sequelize.authenticate()
  console.log('Connection has been connected established successfully.')
} catch (e) {
  console.error('Unable to connect to the database:', error)
}


module.exports = {
  sequelize
}