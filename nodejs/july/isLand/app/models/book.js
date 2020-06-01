const { Model, Sequelize } = require('sequelize')
const axios = require('axios')
const util = require('util')

const { sequelize } = require('../../core/db')
const { Favor } = require('./favor')

class Book extends Model {
  constructor(id) {
    super()
    this.id = id
  }

  async detail(id) {
    const url = util.format(global.config.yushu.detailUrl, id)
    const detail = await axios.get(url)
    return detail.data
  }

  // get detail data
  static async searchFromYuShu(q, start, count, summary = 1) {
    const url = util.format(
      global.config.yushu.keywordUrl, encodeURI(q), count, start, summary)
    const result = await axios.get(url)
    // const result = await axios.get('https://github.com/demopark/sequelize-docs-Zh-CN')
    return result.data
  }

  // book count
  static async getMyFavorBookCount(uid) {
    const count = await Favor.count({
      where: {
        type: 400,
        uid
      }
    })
    return count
  }

}

Book.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  tableName: 'book'
})

module.exports = {
  Book
}