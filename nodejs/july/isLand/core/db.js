const Sequelize = require('sequelize')
const {
  dbName,
  host,
  port,
  user,
  password
} = global.config.database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  // logging: true,
  logging: console.log,
  timezone: '+08:00',
  define: {

  }
})

// 测试连接是否成功
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


// 自动同步所有模型
sequelize.sync({ force: false })


module.exports = {
  sequelize
}
