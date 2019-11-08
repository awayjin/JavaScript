class EventEmitter {
  constructor () {
    this._events = {}
  }
  // on 监听事件
  on (event, cb) {
    const arr = this._events[event] || []
    arr.push(cb)
    this._events[event] = arr
  }
  // emit 触发事件
  emit (event, ...args) {
    const callbacks = this._events[event]
    if (callbacks) {
      callbacks.map(event => event.call(this, ...args))
    }
  }
}

let $event = new EventEmitter()
$event.on('my-event-1', (item) => console.log(item))
$event.on('my-event-1', (item) => console.log('item2:', item))
$event.on('my-event-2', (item) => console.log(item))

$event.emit('my-event-1', '111')
$event.emit('my-event-1', '222')
$event.emit('my-event-2', '333')
