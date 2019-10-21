const sqlite3 = require('sqlite3').verbose()
const dbName = 'later.sqlite'
const db = new sqlite3.Database(dbName)

db.serialize(() => {
  // db.run('drop table articles') // 删除表
  const sql = `
    CREATE TABLE IF NOT EXISTS articles
      (id integer primary key, title, content TEXT)
  `
  db.run(sql)
})

class Article {
  // 查询所有
  static all (cb) {
    db.all('SELECT * FROM articles', cb)
  }

  // 查询指定文章
  static find(id, cb) {
    db.get('SELECT * FROM articles WHERE id = ?', id, cb)
  }

  // 创建一篇文章
  static create(data, cb) {
    // const sql = 'INSERT INTO articles VALUES(?, ?)'
    // db.run(sql, data.title, data.content, cb)
    const sql = 'INSERT INTO articles VALUES(?, ?, ?)'
    db.run(sql, 333, data.title, data.content, cb)
  }

  static delete(id, cb) {
    if (!id) {
      return cb(new Error('Please provide an ID'))
    }
    db.run('DELETE FROM articles id = ?', id, cb)
  }
}

module.exports = db
module.exports.Article = Article