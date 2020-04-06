module.exports = {
  // env-开发， prod-生产
  environment: 'dev',
  // environment: 'prod',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456'
  },
  security:{
    secretKey:"abcdefg",
    expiresIn:60*60*24*30
  }
}