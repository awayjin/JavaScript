const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const { Art } = require('./art')

// 点赞业务表
class Favor extends Model {
  static async like (art_id, type, uid) {
    // 1. 添加记录
    // 2. classic fav_nums
    // 数据库事务 - 数据一致性
    // ACID 原子性 一致性 隔离性 持久性
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })

    if (favor) {
      throw new global.errors.LikeError()
    }

    return sequelize.transaction(async t => {
      await Favor.create({
        art_id,
        type,
        uid
      }, {
        transaction: t
      })
      const art = await Art.getData(art_id, type, false)
      await art.increment('fav_nums', {
        by: 1,
        transaction: t
      })
    })

    // 使用事务
    // const t = await sequelize.transaction()
    // try {
    //   await Favor.create({
    //     art_id,
    //     type,
    //     id
    //   }, { transaction: t })
    //   const art = await Art.getData(art_id, type)
    //   // https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/model-instances.md
    //   await art.increment('fav_nums', {
    //     by: 1,
    //     transaction: t
    //   })
    //   return t
    // } catch (e) {
    //   await t.rollback()
    // }
  }

  // 取消点赞
  static async dislike (art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if (!favor) {
      throw new global.errs.DislikeError()
    }
    // Favor 表， favor 记录
    return sequelize.transaction(async t => {
      await favor.destroy({
        force: true, // false 物理删除， true 还是软删除
        transaction: t
      })
      const art = await Art.getData(art_id, type, false)
      await art.decrement('fav_nums', {
        by: 1,
        transaction: t
      })
    })
  }

  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        uid,
        art_id,
        type,
      }
    })
    return favor ? true : false
  }

  static async getBookFavor(uid, bookID){
    const favorNums = await Favor.count({
      where: {
        art_id:bookID,
        type:400
      }
    })
    const myFavor = await Favor.findOne({
      where:{
        art_id:bookID,
        uid,
        type:400
      }
    })
    return {
      fav_nums:favorNums,
      like_status:myFavor?1:0
    }
  }

  static async getMyClassicFavors(uid) {
    const arts = await Favor.findAll({
      where: {
        uid,
        type:{
          [Op.not]:400,
        }
      }
    })
    if(!arts){
      throw new global.errs.NotFound()
    }

    return await Art.getList(arts)
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