const { FEValidator, Rule } = require('./fe-validator')
const { HttpException } = require('./http-exception')

const request = require('request')
const http = require('http')
const axios = require('axios')
const url = 'http://localhost:3001/api/v1/user/path/register?type=111'

class RegisterValidator extends FEValidator {
  constructor () {
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规则')
    ]
    this.password1 = [
      new Rule('isLength', '不符合长度规则', {
        min: 4,
        max: 30
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
  }

  validatePassword (data) {
    const pwd1 = data.body.password1
    const pwd2 = data.body.password2
    if (!pwd1) {
      throw new HttpException(`password1 值异常`)
    }

    if (!pwd2) {
      throw new HttpException(`password2 值异常`)
    }

    if (pwd1 !== pwd2) {
      throw new HttpException('两个密码必须相同')
    }
  }

}

describe('注册验证', () => {
  it('axios d', async () => {
    const data = await axios.post(`${url}`, {
      password1: 'a123'
    }).then(data => {
      expect(data).toEqual({ a: 2})
      // expect({ a: 2}).toEqual({ a: 2})
    }, err => {
      console.log('err.response.data:', err.response.data)
      expect(err.response.data).toEqual({"message":"password2 值异常","errorCode":10000})
      // console.log('err:', err)
    })

    // const req = http.request({
    //   host: '127.0.0.1',
    //   port: 3001,
    //   method: 'POST'
    // }, (res) => {
    //   // res.resume();
    //   console.log('-------> res:', res)
    //   // res.on('end', () => {
    //   //   if (!res.complete)
    //   //     console.error(
    //   //       '消息仍在发送时终止了连接');
    //   // });
    // });
  })
})


// const port = 3002
// app.listen(port, () => {
//   console.log(chalk.bgCyanBright(`App listened at port ${port}`))
// })
