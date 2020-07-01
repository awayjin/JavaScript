const { clone, unset } = require('lodash')
const { Sequelize, Model } = require('sequelize')
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
    timestamps: false
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
sequelize.sync({ alter: false })
// sequelize.sync({ force: false })
// sequelize.sync({ force: true })

// 序列化排除
// Model.prototype.toJSON = function () {
//   let data = clone(this.dataValues);
//   unset(data, 'updated_at')
//   unset(data, 'created_at')
//   unset(data, 'deleted_at')
//   // unset(data, 'content')
//   return data
// }

module.exports = {
  sequelize
}
