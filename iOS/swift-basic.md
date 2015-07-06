# Swift 쉽게 더 쉽게

## Single view application
- AppDelegate.swift
    + 애플리케이션의 동작을 모니터링하는 애플리케이션 델리게이트 역할. 
    + `function applicationDidEnterBackground(...)` <<사용자가 우리 앱에 더이상 관심을 두지 않을 때 할 일을 처리
        * e.g 우리 앱 사용하다 전화받으면 우리 앱 백그라운드상태 될때 이 함수 실행
- ViewController.swift
    + 뷰 컨트롤러 역할.
    + 사용자가 보는 특정 화면이나 뷰를 제어.

## 변수와 상수
- 변수: `var numOfStudents = 10`
    + swift가 자동으로 변수 타입을 추론할 때 그 변수는 `암시적 타입(implicitly typed)`을 갖는다. 값 보고 그걸 기준으로 타입 지정함.
    + `명시적 타입`: `var numOfItems:Int = 77`
- 상수: `let Pi = 3.1415`

## 함수
```objective-c
func randomInt(min:Int, max:Int)->Int
{
    return min + Int(arc4random_uniform(UInt32(max-min+1)))
}

//중첩 함수
func nested(i:Int, j:Int)
{
    func printAnswer(answer:Int)
    {
        println("\(answer)")
    }
    var sum = i+j
    printAnswer(sum)
}
```

## 열거형
```objective-c
enum Day
{
    case Mon
    case Tue
    ...
    vase Sun
}
var firstDay = Day.Mon
firstDay = .Tue //firstDay가 Day타입으로 이미 선언되어서 .만 찍고 접근 가능.
```

## 클래스
```objective-c
class Dog
{
    //속성
    var Name:String
    var Breed:String
    var Age:Int

    //initializer
    init(name:String, breed:String, age:Int)
    {
        Name = name
        Breed = breed
        Age = age
    }

    //메서드
    func sit() 
    {
        println("\(name) is sitting")
    }
    func getAge()->Int 
    {
        return Age
    }
    func bark()
    {

    }
}

let aDog = Dog(name:"Merry", breed:"Coolie", age:8)
aDog.sit()

//Dog클래스를 상속받은 Beagle클래스
class Beagle:Dog
{
    override func bark()
    {
        println("KAKA")
    }
    func makeMess()
    {
        println("MESSSSSS")
    }
}
```
- initializer
    + 특별한 형태의 클래스 메서드. init키워드로 정의.
    + 클래스의 인스턴스를 생성할 때마다 매번 실행됨.
    + 클래스의 속성을 초기화하며, 클래스의 인스턴스를 생성할 때 전달될 필요가 있는 인자를 받음.

## 프로토콜
- 다른 프로그래밍언어에서 인터페이스라고도 한다. 
- 프로토콜에는 그것을 사용하는 클래스에 반드시 있어야 하는 특정 속성과 메서드를 정의.
```objective-c
protocol Travel{
    function move()
}

class Person:Travel {
    //반드시 구현해줘야 함.
    func move(){
        println("Person is walking")
    }
}
```

## 익스텐션
```objective-c
extension Double {
    var toFahrenheit : Double{return self*9/5+32}
    var toCelcius : Double{return self-32*5/9}
}
let temp:Double = 0
```

## 연산자 오버로딩
```objective-c
//구조체 - 간단한 값의 집합을 캡슐화. 속성과 메서드를 포함할 수 있다는 점에서 클래스와 유사
struct Vector {
    var x=0
    var y=0
    var z=0

}

var v1 = Vector(x:5, y:8, z:5)
```

## 제네릭
- 코드의 반복/중복 문제 해결
```objective-c
//T:인자의 타입. equatable은 모든 인자들의 타입이 같다는 것을 의미.
func isEqual<T: Equatable>(a:T, b:T)->Bool {
    return a == b
}

isEqual(3,3)
isEqual(3.3, 3.5)
isEqual(true, false)
```
