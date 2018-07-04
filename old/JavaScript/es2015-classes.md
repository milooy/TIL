# Classes

## Class 정의
Class는 사실 함수. 함수가 함수 표현식/함수 선언 으로 정의할 수 있듯이 class도 class표현식/선언식 두 가지 방법으로 만들 수 있음.

1. Class 선언
```js
class Nemo {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}
```
함수 선언과 클래스 선언의 차이점은 함수 선언의 경우에만 호이스팅이 일어난다는 것.
위처럼 class Nemo로 만들고 그 위에서 `new Nemo()`이렇게 부르면 ReferenceError를 뿜는다.

2. Class 표현식
```js
var Nemo = class { // 이름 안가짐
    constructor...
}

var Nemo = class Nemo { // 이름 가짐
    constructor...
}
```

## Class body와 method 정의
- Strict mode: 클래스 선언과 표현식의 본문은 strict mode에서 실행됨
- Construct: class로 생성된 객체를 생성하고 초기화하기 위한 특수한 메소드. 부모 클래스의 constructor를 호출하기 위해 super키워드 사용가능

### prototype methods
```js
class Nemo {
    constructor...

    get area() { 
        return this.calcArea()
    }

    calcArea() {
        return this.height * this.width;
    }
}
```

### Static methods
클래스를 위한 정적 메소드 정의. 클래스의 인스턴스화 없이 호출되며, 클래스의 인스턴스에서는 호출 불가.
어플리케이션을 위한 유틸리티 함수를 생성하는데 주로 사용.
e.g. Point.distance(인스턴스1, 인스턴스2)로 포인트간의 거리 구하기
```js
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.sqrt(dx*dx + dy*dy);
    }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));
```

### extends로 클래스 상속(sub classing), 상위 클래스 호출
```js
class Dog extends Animal {
    speak() {
        super.speak();
        console.log()
    }
}
```

## Constructor
```js
class Square extends Polygon {
  constructor(length) {
    // length로 다각형의 넓이와 높이를 정의하기 위해 부모클래스의 생성자를 호출합니다.
    super(length, length);
    // Note: 파생 클래스에서, 'this'를 사용하기 전에는 반드시 super()를
    // 호출하여야 합니다. 그렇지 않을 경우 참조에러가 발생합니다.
    this.name = 'Square';
  }

  get area() {
    return this.height * this.width;
  }

  set area(value) {
    this.area = value;
  } 
}
```
