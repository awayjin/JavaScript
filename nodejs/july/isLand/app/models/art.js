const { Movie, Music, Sentence } = require('./classic')
const { flatten } = require('lodash')
class Art {
  static async getData3 (art_id, type, useScope = true) {

    let art = null
    const finder = {
      where: {
        id: art_id
      }
    }
    const scope = useScope ? 'bh' : null
    switch (type) {
      case 100:
        art = await Movie.scope(scope).findOne(finder)
        break
      case 200:
        art = await Music.scope(scope).findOne(finder)
        break
      case 300:
        art = await Sentence.scope(scope).findOne(finder)
        break
      case 400:
        const {
          Book
        } = require('./book')
        art = await Book.scope(scope).findOne(finder)
        if(!art){
          art = await Book.create({
            id:art_id
          })
        }
        break
      default:
        break
    }
    // if (art && art.image) {
    //     let imgUrl = art.dataValues.image
    //     art.dataValues.image = global.config.host + imgUrl
    // }
    return art
  }
  static async getData (art_id, type) {
    let art = null
    const finder = {
      where: { id: art_id }
    }
    switch (type) {
      case 100:
        art = await Movie.findOne(finder)
        break
      case 200:
        art = await Music.findOne(finder)
        break
      case 300:
        art = await Sentence.findOne(finder)
        break
      case 400: // book
        const { Book } = require('./book');
        art = await Book.findOne(finder)
        if(!art){
          art = await Book.create({
            id: art_id
          })
        }
        break
    }
    // 图片加上 host
    if (art && art.image) {
        let imgUrl = art.dataValues.image
        art.dataValues.image = global.config.host + imgUrl
    }
    return art
  }
  // 下划线私有方法
  _getDetail () {

  }
  static async getList(artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: [],
    }
    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id)
    }
    const arts = []
    for (let key in artInfoObj) {
      const ids = artInfoObj[key]
      if (ids.length === 0) {
        continue
      }

      key = parseInt(key)
      arts.push(await Art._getListByType(ids, key))
    }

    return flatten(arts)
  }
}

module.exports = {
  Art
}