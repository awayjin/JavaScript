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
    }).then(data => data, err => err)
    console.log('data:', data)
    // const req = await request({
    //   url: url,//请求路径
    //   method: "POST",//请求方式，默认为get
    //   headers: {//设置请求头
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     password1: 'a123'
    //   })//post参数字符串
    // }, function(error, response, body) {
    //   // if (!error && response.statusCode == 200) {
    //   // }
    //   console.log('error:', error)
    //   console.log('response:', response)
    //   return body
    // });
    // console.log('req:', req)

    const req = http.request({
      host: '127.0.0.1',
      port: 3001,
      method: 'POST'
    }, (res) => {
      res.resume();
      consoe
      res.on('end', () => {
        if (!res.complete)
          console.error(
            '消息仍在发送时终止了连接');
      });
    });

    expect({ a: 2}).toEqual({ a: 2})
  })
})


// const port = 3002
// app.listen(port, () => {
//   console.log(chalk.bgCyanBright(`App listened at port ${port}`))
// })