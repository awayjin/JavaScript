const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  'island',
  'root',
  '123456',
  {
    host: 'localhost',
    dialect: 'mysql',
    timestamp: true,
    timezone: '+08:00'
  }
)

// 模型同步, 创建表
// sequelize.sync({ alter: true })
sequelize.sync({ force: false })

try {
  sequelize.authenticate()
  console.log('Connection has been connected established successfully.')
} catch (e) {
  console.error('Unable to connect to the database:', error)
}


module.exports = {
  sequelize
}