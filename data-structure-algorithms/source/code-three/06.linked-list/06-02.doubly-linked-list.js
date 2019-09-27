import { LinkedList } from './06.linked-list'

function defaultEquals (a, b) {
  return a === b
}

class Node {
  constructor (element, next) {
    this.element = element
    this.next = next
  }
}

class DoublyNode extends Node{
  constructor (element, next, prev) {
    super(element, next)
    this.prev = prev
  }
}

class DoublyLinkList extends LinkedList {
  constructor (equalsFn = defaultEquals) {
    super(equalsFn)
    this.tail = null
  }
}