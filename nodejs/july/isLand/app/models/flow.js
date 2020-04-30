const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Flow extends Model {

}

Flow.init({
  index: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
  // 数据库表与表之间的关联
  // type:100 movie
  // type:200 music
  // type:300 sentence
}, {
  sequelize,
  tableName: 'flow',
  freezeTableName: true
})

module.exports = {
  Flow
}