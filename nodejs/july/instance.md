## 数据库设计思路

> Code First: 就是不用打开数据库软件，也不用引用实体表，直接用代码code来把实体映射成数据表

- 实体表： user, 期刊：movie, sentence, music. 扩展性，相似性

- 业务表：Flow. 抽象，记录业务，解决业务问题.

## js-base64 认证: 小程序中携带令牌
```
{
    header: {
       Authorization: this._encode()
     },
     _encode () {
       const token = wx.getStorageSync('token')
       const base64 = Base64.encode(token + ':')
       // Authorization:Basic base64(account:password)
       return 'Basic ' + base64
     }
}
```

## 事务
// 1. 添加记录
// 2. classic fav_nums
// 数据库事务 - 数据一致性
// ACID 原子性 一致性 隔离性 持久性