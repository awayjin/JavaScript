import { observable, computed, autorun, when, reaction, action, runInAction } from 'mobx'

// 1. array object map
const arr = observable([11, 22])
console.log('1. arr', Array.isArray(arr), arr[0])

const obj = observable({ a: 1, b: 2})
console.log('2 .obj', obj.a, obj.b)

const map = observable(new Map())
map.set('a', 'a-value')
console.log('3. map', map.get('a'))

// number, string, boolean
const num = observable.box(22)
const str = observable.box('str')
const bool = observable.box(true)
str.set('change str')
bool.set(false)
// console.log(num.get(), str.get(), bool.get())

// 2. 对观察的数据做出反应
class Store {
  @observable arr = [];
  @observable obj = {};
  @observable map = new Map();

  @observable str = 'he';
  @observable bool = false;
  @observable num = 112;

  @computed get mixed() {
    return store.str + '/' + store.num
  }

  @action bar() {
    this.str = 'action-world'
    this.num = 300
    this.bool = true
  }

  @action.bound bar2() {
    this.str = 'bound-world'
    this.num = 600
    this.bool = false
  }
}
const store = new Store()

// computed
const foo = computed(() => {
  return store.str + '/' + store.num
})
// foo.observe()
console.log('4. foo', foo.get())
store.str = 'world'
console.log('4. foo', foo.get())

// autorun
autorun(() => {
  // console.log('5. autorun:', store.str + '/' + store.num)
  console.log('5. autorun:', store.mixed)
})
store.num = 333

// when
when(() => store.bool, () => {
  console.log("6. it's true")
})
store.bool = true

// reaction
reaction(() => [store.str, store.bool, store.num], (arr) => {
  console.log('7. reaction', arr.join('//'))
})
// store.str = 'wor'
// store.num = 200
store.bool = false

// 3. action
store.bar()
const bar2 = store.bar2;
bar2()

runInAction('modify-a', () => {
  store.str = 'runInAction-hello'
  store.num = 1000
  store.bool = true
})