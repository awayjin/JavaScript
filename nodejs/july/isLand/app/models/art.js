const { Movie, Music, Sentence } = require('./classic')

class Art {
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
    return art
  }
  // 下划线私有方法
  _getDetail () {

  }
}

module.exports = {
  Art
}