# Swift 언어 개발문서

## Swift 둘러보기
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

//흐름 제어
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
```

## Refer
http://swift.leantra.kr/#a-swift-tour
