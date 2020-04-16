const Sequelize = require('sequelize')

// 连接 MySQL 数据库
const sequelize = new Sequelize('island', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize
  .authenticate()
  .then((res) => {
    // console.log('Connection has been established successfully.');
    console.log('\033[42;30m Connection has been established  \033[40;32m successfully. \033[0m')
    console.log('\033[40;32m Right? \033[0m')
    console.log('\033[40;32m ready \033[0m')
    console.log('res:', res)
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });