import Vue from 'vue'

const Store = function (options = {}) {
  const { state = {}, mutations = {} } = options
  // console.log('options:', options)
  // console.log('state:', state)
  this._vm = new Vue({
    data: {
      $$state: state
    }
  })
  this._mutations = mutations
}

Store.prototype.commit = function (type, payload) {
  if (this._mutations[type]) {
    this._mutations[type](this.state, payload)
  }
}

Object.defineProperties(Store.prototype, {
  state: {
    get () {
      return this._vm.$data.$$state
    }
  }
})

export default { Store }

// import DemoVuex from './min-vuex.js'
// const demoStore = new DemoVuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })
//
// Vue.prototype.$demoVuex = demoStore
