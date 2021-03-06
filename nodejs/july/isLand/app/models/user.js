const bcrypt = require('bcryptjs') // 加密工具
// 数据迁移 SQL 更新 风险
const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

console.log('user', 111)

class User extends Model {
  // 静态方法
  static async verifyEmailPassword (email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    // console.log('---> user:', user)
    if (!user) {
      throw new global.errors.AuthFailed('账号不存在')
    }
    // 对比密码
    const correct = bcrypt.compareSync(String(plainPassword), user.password)
    if (!correct) {
      throw new global.errors.AuthFailed('密码不正确')
    }
    return user
  }

  // openid
  static async getUserByOpenId (openid) {
   const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }

  // register openid
  static async registerByOpenid(openid) {
    return await User.create({
      openid
    })
  }

}

// 创建表，模型相当于表
User.init({
  // 模型属性
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  // 密码加密通过 bcrypt
  password: {
    type: Sequelize.STRING,
    set (val) {
      // 位数，成本
      // 明文，加密 不同，彩虹攻击
      const salt = bcrypt.genSaltSync(10)
      const pwd = bcrypt.hashSync(val, salt)
      this.setDataValue('password', pwd)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'users', // 模型名称
  freezeTableName: true // 强制表名称等于模型名称, 停止 Sequelize 执行自动复数化
})

// 定义的模型是类本身
// console.log(User === sequelize.models.User); // true

module.exports = {
  User
}