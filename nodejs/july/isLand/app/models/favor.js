const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const { Art } = require('./art')

// 点赞业务表
class Favor extends Model {
  static async like (art_id, type, id) {
    // 1. 添加记录
    // 2. classic fav_nums
    // 数据库事务 - 数据一致性
    // ACID 原子性 一致性 隔离性 持久性
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        id
      }
    })

    if (favor) {
      throw new global.config.errors.LikeError()
    }

    // 使用事务
    const t = await sequelize.transaction()
    try {
      await Favor.create({
        art_id,
        type,
        id
      }, { transaction: t })
      const art = await Art.getData(art_id, type)
      // https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/model-instances.md
      art.increment('fav_nums', {
        by: 1,
        transaction: t
      })
    } catch (e) {
      await t.rollback()
    }
    return t
  }

  static async dislike (art_id, type, id) {

  }
}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.STRING,
  // 数据库表与表之间的关联
  // type:100 movie
  // type:200 music
  // type:300 sentence
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'favor'
})

module.exports = {
  Favor
}