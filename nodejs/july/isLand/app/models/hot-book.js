const { Model, Sequelize, Op } = require('sequelize')
const { sequelize } = require('../../core/db')
const { Favor } = require('./favor')

class HotBook extends Model {
  static async getAll () {
    const books = await HotBook.findAll({
      order: [
        ['index', 'desc']
      ]
    })
    // 操作符 Op.in,  谓词
    // SELECT * from hot_book WHERE id in(65, 183, 1120);
    // SELECT * from hot_book WHERE author like '%日%';
    // 函数 count
    // 分组 group by SELECT author, COUNT(*) FROM hot_book GROUP BY author;
    const ids = []
    books.forEach(item => ids.push(item.id))

    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids
        }
      },
      group: ['art_id'],
      attributes: [
        'art_id', [Sequelize.fn('COUNT', '*'), 'count']
      ]
    })

    books.forEach(book=>{
      HotBook._getEachBookStatus(book, favors)
    })

    return books
  }

  // 私有方法
  static _getEachBookStatus(book, favors){
    let count = 0
    favors.forEach(favor=>{
      if(book.id === favor.art_id){
        count = favor.get('count')
      }
    })
    book.setDataValue('fav_nums',count)
    return book
  }
}

HotBook.init(
  {
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
  }, {
    sequelize,
    tableName: 'hot_book'
  }
)

module.exports = {
  HotBook
}