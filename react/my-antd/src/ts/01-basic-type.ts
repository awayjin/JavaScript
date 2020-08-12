// primitive values
// Symbol bigInt
// any union-types
// array tuple元组

// string
const str: string = 'str'
const str2: string = undefined
const str3: string = null

// number
const num: number = 11
const num2: number = 0b1100

// boolean
const bool: boolean = false

// null
const n: null = null

// undefined
const u: undefined = undefined

// any
let notSure: any
notSure = 3
notSure = 'str'
notSure = false
notSure = null

// union-types
let ut: string | boolean
ut = true
ut = 'str'

// array
const arr: number[] = [1, 2, 3, null, undefined]
const arr2: any[] = [1, 'str', 3]
let arr3: [number, string] = [1, 'str'];
arr3 = [2, 's']