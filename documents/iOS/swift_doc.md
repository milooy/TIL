# Swift 언어 개발문서

## Swift 둘러보기져
### 변수
```objective-c
var myVariable = 42
let Pi = 3.14
let explicitDouble: Double = 70
let label = "pi is"
let piLabel = label + String(Pi)

let apples = 3
let oranges = 5
let fruitDesc = "I have \(apples + oranges) fruits."

//배열, 딕셔너리
var shopList = ['catfish', 'water', 'tulips'];
var ageDic = [
    "Jay":"22",
    "Ingeeks":"25"
]
ageDic["Dajung"] = "1"

let emptyArray = String[]()
let emptyArray2 = []
let emptyDic = Dictionary<String, Float>()
let emptyDic2 = [:]
```

### 흐름 제어
```objective-c
let scoreList = [12, 23, 34]
var teamScore = 0
for score in scoreList {
    if score>20 {
        teamScore += 3
    } else {
        teamScore += 1
    }
}

//값의 타입 뒤에 ?를 붙이면 옵셔널 값. ?이 없으면 nil이 들어가지 않는다.
var optionalString: String? = "Hello"
optionalString = nil

var optionalName: String? = "Jay"
var greeting = "Hello"
if let name = optionalName { //옵션값이 nil이면 조건문 false로 안들어감.
    greeting = "Hello, \(name)"
}

//switch. break키워드 안써도 된다.
let vagetable = "red pepper"
switch vegetable {
    case "vege1":
        let vegeCmt = "This is vege 1"
    case "vege2", "vege3":
        let vegeCmt = "This is haha"
    case let x where x.hasSuffix("pepper"):
        let vegeCmt = "This is pepper"
    default:
        let vegeCmt = "This is default"
}

//for-in
let interestingNumbers = [
  "Prime": [2, 3, 5, 7, 11, 13],
  "Fibonacci": [1, 1, 2, 3, 5, 8],
  "Square": [1, 4, 9, 16, 25],
]
var largest = 0
for (kind, numbers) in interestingNumbers {
  for number in numbers {
    if number > largest {
       largest = number
    }
  }
}

//while, do
var n = 2
while n < 100 {
    n = n * 2
}
n

var m = 2
do {
    m = m * 2
} while m < 100

```
..을 사용해서 범위를 지정하면 제일 맨 마지막 값은 제외됩니다. 반면에 ...을 사용하면 양쪽 끝의 값을 모두 범위에 포함하게 됩니다.

### 함수와 클로져
```objective-c
//함수 안의 함수
func makeIncrementer() -> (Int -> Int) {
  func addOne(number: Int) -> Int {
    return 1 + number
  }
  return addOne
}
var increment = makeIncrementer()
increment(7)

//인자를 함수로 받기
func hasAnyMatches(list: Int[], condition: Int -> Bool) -> Bool {
      for item in list {
          if condition(item) {
              return true
          }
      }
      return false
  }
  func lessThanTen(number: Int) -> Bool {
      return number < 10
  }
  var numbers = [20, 19, 7, 12]
  hasAnyMatches(numbers, lessThanTen)

//실제로 함수는 클로저의 특별한 예.
numbers.map({
  (number: Int) -> Int in
  let result = 3 * number
  return result
})
```

## Refer
http://swift.leantra.kr/#a-swift-tour
