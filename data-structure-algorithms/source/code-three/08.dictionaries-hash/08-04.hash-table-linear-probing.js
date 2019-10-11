import { defaultToString, ValuePair } from '../utils/util.js'
// 链表数据结构
// import { LinkedList } from '../06.linked-list/06.linked-list.js'

// 散列表 - 分离链接
// 分离链接法包括为散列表的
// 每一个位置创建一个链表并将元素存储在里面。
export class HashTableLinearProbling {
  constructor (toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  // 散列函数
  // 简单的将每个键值中的每个字母的ASCII码相加，然后再对37取余
  loseloseHashCode (key) {
    if (typeof key === 'number') { // 是否是一个数
      return key
    }

    // 然后，给定一个 key 参数，
    // 我们就能根据组成 key 的每个字符的 ASCII 码值的和得到一个数。
    const tableKey = this.toStrFn(key) // 转为字符串
    //  hash 变量来存储这个总和
    let hash = 0

    // 遍历 key 并将从 ASCII 表中查到的
    // 每个字符对应的 ASCII 值加到 hash 变量中
    for (let i = 0; i < tableKey.length; i++) {
      // charCodeAt 字符编码
      hash += tableKey.charCodeAt(i)
    }

    // 为了得到比较小的数值，我们会使用 hash 值 和一个任意数做除法的余数(%)
    return hash % 37
  }

  // hashCode
  hashCode (key) {
    return this.loseloseHashCode(key)
  }

  // put - 将键和值加入散列表
  put (key, value) {
    // 线性探查 - linear probing
    if (key != null && value != null) {
      let position = this.hashCode(key)

      if (this.table[position] == null) {
        this.table[position] = new ValuePair(key, value)
      } else {
        let index = position + 1
        while (this.table[index] != null) {
          console.log('111:', position)
          index++
        }
        this.table[index] = new ValuePair(key, value)
      }

      return true
    }
    return false

    // 分离链接
    // if (key != null && value != null) {
    //   let position = this.hashCode(key)
    //
    //   if (this.table[position] == null) {
    //     // 每一个位置创建一个链表并将元素存储在里
    //     this.table[position] = new LinkedList()
    //   }
    //
    //   let valuePair = new ValuePair(key, value)
    //   this.table[position].push(valuePair)
    //   return true
    // }
    // return false

    // if (key != null && value != null) {
    //   let position = this.hashCode(key)
    //   let valuePair = new ValuePair(key, value)
    //   this.table[position] = valuePair
    //   return true
    // }
    // return false
  }

  // get - 从散列表中获取一个值
  get (key) {
    // 线性探查 - linear probing
    let position = this.hashCode(key)
    if (this.table[position] != null) {
      let valuePair = this.table[position]
      if (valuePair.key === key) {
        return valuePair.value
      }

      let index = position + 1
      while (this.table[index] != null && this.table[index].key !== key) {
        index++
      }

      if (this.table[index] != null && this.table[index].key  === key) {
        return this.table[index].value
      }
    }
    return undefined

    // 分离链接
    // const position = this.hashCode(key)
    // const linkedList = this.table[position]
    //
    // if (linkedList != null && !linkedList.isEmpty()) {
    //   let current = linkedList.getHead()
    //   while (current != null) {
    //     if (current.element.key === key) {
    //       return current.element.value
    //     }
    //     current = current.next
    //   }
    // }
    // return undefined

    // const valuePair = this.table[this.hashCode(key)]
    // return valuePair != null ? valuePair.value : null
  }

  // remove - 从散列表中移除一个值
  remove (key) {
    const position = this.hashCode(key)
    const linkedList = this.table[position]

    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead()
      while (current != null) {
        if (current.element.key === key) {
          linkedList.remove(current.element)
          if (linkedList.isEmpty()) {
            delete this.table[position]
          }
          return true
        }
        current = current.next
      }
    }
    return false

    // const position = this.hashCode(key)
    // const valuePair = this.table[position]
    // if (valuePair != null) {
    //   delete this.table[position]
    //   return true
    // }
    // return false
  }

  // size
  size () {
    return  Object.keys(this.table).length
  }

  // isEmpty
  isEmpty () {
    return this.size() === 0
  }

  // clear
  clear () {
    this.table = {}
  }

  // toString
  toString () {
    if (this.isEmpty()) {
      return ''
    }

    const keys = Object.keys(this.table)
    let objString = `{ ${keys[0]} => ${this.table[keys[0]].toString()} }`
    for (let i = 1 ; i < keys.length; i++) {
      objString = `${objString}\n { ${keys[i]} => ${this.table[keys[i]].toString()} }`
    }
    return objString
  }

}