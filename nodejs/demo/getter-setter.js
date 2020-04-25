class Auth {

  constructor (props) {
    this.pro = 'default'
    this.log = 'def'
  }

  get m () {
    console.log(3)
  }
  set s (value) {
    this.log = value
    console.log('log:', this.log)
  }
  get a () {
    console.log('aaa:', this.pro)
    console.log('log:', this.log)
  }
}

new Auth().m
new Auth().s = 11
new Auth().a


const lan = {
  type: [],
  set cur (value) {
    this.type.push(value)
  },
  get getType () {
    console.log(this.type)
  }
}
lan.cur = 'cn'
lan.cur = 'un'
lan.getType