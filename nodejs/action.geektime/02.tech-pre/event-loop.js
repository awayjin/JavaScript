const eventloop = {
  queue: [],

  loop () {
    while (this.queue.length) {
      let callback = this.queue.shift()
      callback()
    }

    setTimeout(this.loop.bind(this), 500)
  },

  add (callback) {
    this.queue.push(callback)
  }
}

eventloop.loop()

//

setTimeout(() => {
  eventloop.add(function () {
    console.log('callback 2')
  })
}, 800)

setTimeout(() => {
  eventloop.add(function () {
    console.log('callback 1')
  })
}, 500)
