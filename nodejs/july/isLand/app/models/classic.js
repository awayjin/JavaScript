const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
}

class Movie extends Model {

}
Movie.init(classicFields, {
  sequelize,
  tableName: 'movie',
  freezeTableName: true
})

class Sentence extends Model {

}
Sentence.init(classicFields, {
  sequelize,
  tableName: 'sentence',
  freezeTableName: true
})

class Music extends Model {

}

const musicFields = Object.assign({
  url: Sequelize.STRING
}, classicFields)
Sentence.init(musicFields, {
  sequelize,
  tableName: 'music',
  freezeTableName: true
})


module.exports = {
  Movie,
  Sentence,
  Music
}