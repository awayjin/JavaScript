const inquirer = require('inquirer')

const promptList = [
  {
    type: 'input',
    name: 'userName',
    message: 'set a user name:',
    default: 'test_user',
    // validate: function (val) {
    //    if (val.length === 3) {
    //      return val
    //    }
    //    return '请输入3位数字.'
    // }
  },
  {
    type: 'input',
    message: '请输入手机号:',
    name: 'phone',
    validate: function(val) {
      if(val.match(/\d{3}/g)) { // 校验位数
        var done = this.async();
        done(null, true)
        return val;
      }
      return "请输入3位数字";
    }
  },
  {
    type: 'confirm',
    name: 'test',
    message: 'Are you handsome?',
    default: true
  }
]

inquirer
  .prompt(promptList)
  .then(answers => {
    console.log('answers:', answers)
    console.log('%c answers:', answers, 'font-size: 14px; color: red;')
  })

// const list = [{
//   type: 'confirm',
//   name: 'test',
//   message: 'Are you handsome?',
//   default: true
// }]
// inquirer.prompt(list).then((answers) => {
//   console.log('结果为:');
//   console.log(answers);
// })
