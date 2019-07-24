let hel: string = '33'

let hello2: string = 'Hello TypeScript'


// 对象类型接口
function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label)
}

let myObj = { size: 10, label: 'size 10 object..'}

printLabel(myObj)

// 用接口来描述
interface LabeledValue {
  label: string
}

function printLabel2(labeledObj: LabeledValue ) {
  console.log(labeledObj.label)
}

printLabel2(myObj)

// 可选属性
interface SquareConfig {
  color?: string,
  width?: number
}

function createSquare2(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

function createSquare1(config: SquareConfig): { color: string; area: number } {
  return { color: 'white', area: 44}
}

console.log(33444)