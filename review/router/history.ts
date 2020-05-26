window.addEventListener('popstate', (event) => {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
});

function getId (id: string) {
  return document.getElementById(id);
}

var low = getId('low')
var middle = getId('middle')
var high = getId('high')
var number = getId('number')

class GuessNumber {
  private randomNumber: number;
  init () {

  }
}

new GuessNumber().init()

number.addEventListener('keypress', (e: any) => {
  var target: any = e.target
  var value = target.value
  // 匹配非负整数
  if (e.which  === 13 && (/^\d+$/.test(value))) {
    console.log(value)
  }
})
