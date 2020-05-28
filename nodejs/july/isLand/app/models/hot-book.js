const { Model, Sequelize, Op } = require('sequelize')
const { sequelize } = require('../../core/db')
const { Favor } = require('favor')

class HotBook extends Model {
  static async getAll () {
    const books = await sequelize.findAll({
      order: ['index', 'desc']
    })
    // 操作符 Op.in,  SELECT * from hot_book WHERE id in(65, 183, 1120);
    // SELECT * from hot_book WHERE author like '%日%';
    // 函数 count
    // 分组 group by SELECT author, COUNT(*) FROM hot_book GROUP BY author;
    const ids = []
    books.forEach(item => ids.push(item.id))

    const favor = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids
        }
      },
      group: ['art_id'],
      attributes: [
        'art_id', [Sequelize.fn('COUNT', 'count')]
      ]
    })

  }
}

HotBook.init(
  {
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
  }, {

  }
)

module.exports = {
  HotBook
}