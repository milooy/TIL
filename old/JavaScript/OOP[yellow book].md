# 객체 지향 프로그래밍
#### javascript for web developers ch.6

## 객체에 대한 이해
```javascript
//객체만들기 1(덜쓴다)
var person = new Object();
person.name = "Lezhin";
person.age = 22;
person.sayName = function() {
    alert(this.name);
}

//객체만들기2 (객체 리터럴 표기법. 많이 씀)
var person = {
    name: "Lezhin",
    age: 22
}
```

### 프로퍼티 타입
#### 데이터 프로퍼티
- configurable: 해당 프로퍼티가 delete를 통해 삭제하거나, 프로퍼티 속성 바꾸거나 접근자 프로퍼티로 변환 가능함. 기본 true.
- enumarable: for-in 루프에서 해당 프로퍼티를 반환. 기본 true
- writable: 프로퍼티의 값 바꿀 수 있음. 기본 true
- value: 프로퍼티의 실제 데이터 값 포함. 프로퍼티의 값을 읽는 위치이며 새로운 값을 쓰는 위치기도 함. 기본 undefined.
```javascript
var person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "Jay"
});
Object.defineProperty(person, "age", {
    configurable: false,
    value: 22
});

person.name = "Lezhin"; //이래도 값을 바꿀 수 없다.
delete person.age;  //이래도 못지운다. 다시는 수정불가. 다시 defineProperty로 true로 고치지도 못한다.
```

```javascript
var book = {
    _year: 2004,    //객체의 메서드를 통해서만 접근하고 외부에서는 접근할거야! 라고 의도적으로 앞에 _ 붙임.
    edition:1
};

Object.defineProperty(book, "year", {
    get: function() {
        return this._year;
    },
    set: function(newValue) {
        if(newValue>2004){
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});

book.year = 2005;
alert(book.edition);    //2
```
> 접근자 프로퍼티는 일반적으로 이런경우, 즉 프로퍼티의 값을 바꿨을 때 해당 프로퍼티만 바뀌는게 아니라 부수적인 절차가 필요한 경우에 사용.
> getter함수만 지정하면 해당 프로퍼티는 읽기전용이 되고 이 프로퍼티를 수정하려는 시도는 모두 무시!(스트릭트모드에선 에러발생)

### 다중 프로퍼티 정의
```javascript
var book = {};

Object.defineProperties(book, { //익스플로러9 이상, 파폭4, 사파리5 이상 지원
    _year: {
        value: 2004
    },
    edition: {
        value: 1;
    },
    year: {
        get: function(){}
        ...
    }
});
```

### 프로퍼티 속성 읽기
```javascript
var descriptor = Object.getOwnPropertyDescriptor(book, "_year"); //데이터 프로퍼티 _year
alert(descriptor.value);    //2004
alert(descriptor.configurable); //false (기본값)
alert(typeof descriptor.get);  //"undefined"

var descriptor = Object.getOwnPropertyDescriptor(book, "year"); //접근자 프로퍼티 year
alert(descriptor.value);    //undefined
alert(descriptor.configurable); //false (기본값)
alert(typeof descriptor.get);  //"function"
```

## 객체 생성
같은 인터페이스 가진 객체 여러 개 만들땐 중복된코드 -> 팩터리패턴으로 해결

### 팩터리 패턴
- 특정 객체를 생성하는 과정을 추상화.
- 문제점: 생성한 객체가 어떤 타입인지 알 수 없다.  <<수
```javascript
function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        alert(this.name);
    };
    return o;
}

var person1 = createPerson("Lezhin", 25, "CEO");
var person2 = createPerson("Jay", 22, "Developer");
```

### 생성자 패턴
```javascript
function Person(name, age, job) { //생성자 함수는 대문자로 시작
    this.name = name; //this로 직접 할당
    this.age = age;
    this.job = job;
    this.sayName = function() {
        alert(this.name);
    };
}

var person1 = new Person(...); 
var person2 = new Person(...); //생성자 함수와 다른 함수의 차이는 '어떻게 호출하냐'

alert(person1.constructor == Person); //true
alert(person2.constructor == Person); //true
alert(person1.sayName == person2.sayName); //false
//(생성자 안) this.sayName = sayName;
//(생성자 밖) function sayName() {...}; 이렇게 sayName을 밖으로 빼서 우회하는 방법도 있다. 근데 스코프가 어지러워짐.
```
- new연산자 사용해서 생성자를 호출하면
    + 1 객체를 생성
    + 2 생성자의 this값에 새 객체 할당. 따라서 this가 새 객체 가리킴
    + 3 생성자 내부 코드를 실행(객체에 프로퍼티 추가)
    + 4 새 객체를 반환
- 장점: 인스턴스 타입을 쉽게 식별 가능.
- 단점: 인스턴스마다 메서드가 생성됨.(person1,2의 sayName()메서드는 Function의 같은 인스턴스는 아님.)
- person1,2는 모두 Object의 인스턴스. 커스텀 객체는 모두 Object를 상속하기 때문

```javascript
//생성자로 사용
var person = new Person("Lezhin", ...);
person.sayName(); //Lezhin

//함수로 호출
Person("Jay", ...); //window에 추가
window.sayName(); //Jay

//다른 객체의 스코프에서 호출
var o = new Object();
Person.call(o, "Tultul", 25, "bear");
o.sayName(); //Tultul
```

### 프로토타입 패턴
- 모든 함수는 prototype 프로퍼티를 가짐
    + 해당 참조 타입의 인스턴스가 가져야 할 프로퍼티와 메서드를 담고있는 객체
- 장점: 프로토타입의 프로퍼티와 메서드는 객체 인스턴스 전체에서 공유됨!
- 모든 프로토타입은 자동으로 constructor프로퍼티를 가짐. 
    + 해당 프로토타입이 프로퍼티로서 소속된 함수를 가리킴.
    + Person.prototype.constructor는 Person을 가리킴(아래 예제)
    + person1,2는 Person.prototype을 가리키는 내부 프로퍼티를 가질 뿐 생성자와 직접 연결되지는 않음.
- 객체 인스턴스에 프로퍼티를 추가하면 해당 프로퍼티는 프로토타입에 존재하는 같은 이름의 프로퍼티를 가린다.
```javascript
function Person() {}
Person.prototype.name = "Lezhin";
Person.prototype.age = 22;
Person.prototype.sayName = function() {
    alert(this.name);
}

var person1 = new Person();
var person2 = new Person();
person1.sayName();  //Lezhin

person1.name = "Jay";
alert(person1.name);  //Jay - 인스턴스에서. 프로퍼티가 존재하므로 프로토타입까지 검색하진 않음.
alert(person2.name);  //Lezhin - 프로토타입에서. 인스턴스에서 못찾았으니까.

alert(person1.hasOwnProperty("name")); //true. 해당 프로퍼티가 '객체 인스턴스'에 존재.
delete person1.name;
alert(person1.name); //Lezhin. 가리던 인스턴스 지움!
alert(person1.hasOwnProperty("name")); //false
alert("name" in person1); //true. 프로퍼티에 접근만 가능하면 트루

alert(Person.prototype.isPrototypeOf(person1)); //true

//객체를 매개변수로 받고 나열 가능한 프로퍼티 이름을 문자열로 포함하는 배열 반환
Object.keys(Person.prototype); //"name, age, sayName"
// 나열 가능 여부와 관계없이 인스턴스 프로퍼티 전체목록(constructor포함)
Object.getOwnPropertyNames(Person.prototype); //"constructor, name, age, sayName"
```

#### 프로토타입 대체 문법
```javascript
function Person(){};

Person.prototype = {
    name: "Lezhin",
    age ...
}

var friend = new Person();
friend instanceof Object; //true
friend instanceof Person; //true
friend.constructor == Person; //false
friend.constructor == Object; //true

//만약 constructor가 중요하다면 프로토타입 안에 'constructor: Person'을 명시적으로 삽입.
```
- 모든 프로퍼티와 메서드 담은 `객체 리터럴`
- 가독성 좋음
- 하지만 constructor 프로퍼티가 Person을 가리키지 않음. 기본 프로토타입 객체를 완전히 덮어써 새로운 객체 만들기 때문에.

#### 프로토타입의 동적 성질
```javascript
var friend = new Person();
Person.prototype.sayHi = function() {
    alert("hi");
};
friend.sayHi(); //"hi" 프로토타입이 바뀌면 그 내용이 즉시 인스턴스에도 반영
//인스턴스에서 sayHi검색 후 없으면 프로토타입에서 찾는다.
```
```javascript
function Person() {};
var friend = new Person(); //포인터는 이때(생성자 호출)할당됨
Person.prototype = {    //프로토타입을 다른 객체로 바꿔서 생성자와 원래 프로토타입간의 연결 끊어짐
    constructor: Person,
    name: "Lezhin",
    sayName: ...
}
friend.sayName(); //error
```

#### 네이티브 객체 프로토타입
```javascript
alert(typeof Array.prototype.sort); //function
alert(typeof String.prototype.substring); //function

String.prototype.startsWith = function(text) { //커스텀 메서드를 원시래퍼에 추가
    return this.indexOf(text) == 0;
};

var msg = "Lezhin";
alert(msg.startsWith("L")); //true
```

#### 프로토타입의 문제점
- 초기화 매개변수를 생성자에 전달할 수 없게 함 => 모든 인스턴스가 같은 프로퍼티 가짐
- `공유`라는 성질
```javascript
function Person(){};

Person.prototype = {
    constructor: Person,
    name: "Lezhin",
    ...
    friends: ["Tultul", "Jay"]
};

var Person1 = new Person();
var Person2 = new Person();

person1.friends.push("JS");

alert(person1.friends); //Tultul, Jay, JS
alert(person2.friends); //Tultul, Jay, JS
alert(person1.friends === person2.friends); //true
```

### 생성자패턴 + 프로토타입패턴
가장 널리 쓰이는 방법
```javascript
function Person(name, age, job){
    this.name  name;
    this.age = age;
    this.friends = ["Tultul", "Jay"];
}

Person.prototype = {
    constructor: Person,
    sayName : function() {
        alert(this.name);
    }
};

var person1 = new Person("Lezhin", ...);
var person1 = new Person("JS", ...);
```

### 동적 프로토타입 패턴
모든 정보를 생성자 내부에 캡슐화, 필요한 경우엔 프로토타입을 생성자 내부에서 초기화
```javascript
function Person(name, age, job){
    //프로퍼티
    this.name = name;
    ...

    //메서드
    if(typeof this.sayName != "function"){ //생성자가 첫번째로 호출된 다음에만 실행!
        Person.prototype.sayName = function() {//프로토타입을 수정하면 즉시 모든 인스턴스에 반영
            alert(this.name);
        };
    }
}
var friend = new Person("Lezhin", ...);
friend.sayName(); //Lezhin
```

### 기생 생성자 패턴
다른 패턴이 실패할 때 콜백으로 씀.
일반적인 생성자처럼 보이지만 사실 다른 객체를 생성/반환하는 동작을 래퍼생성자로 감싸는 것.
중요: 반환된 객체와 생성자, 프로토타입 사이에 아무 연결고리가 없다. instanceof연산자로 타입 알수없음.
```javascript
function SpecialArray() {
    var values = new Array();
    values.push.apply(values, arguments);
    values.toPipedString = function() {
        return this.join("|");
    };
    return values;
}

//메서드를 추가한 특별한 배열 만들기!
var colors = new SpecialArray("red, blue, green");
alert(colors.toPipedString()); //"red|blue|green"
```

### 방탄 생성자 패턴
- 방탄(durable)객체: 공용 프로퍼티가 없고 메서드가 this를 참조하지 않음.
- this나 new의 사용을 금지하는 보안 환경 등에서 씀.
```javascript
function Person(name, age, job){
    var o = new Object();
    ...
    o.sayName = function() {alert(name);}
    return o;
}
//반환된 객체의 name값에 접근할 방법이 없다. sayName으로만 값 알수있음.
var friend = Person("Lezhin", ...);
friend.sayName(); //Lezhin
```

## 상속
> ECMAScript에서는 구현 상속만 지원하며 구현 상속은 대개 프로토타입 체인을 통해 이루어짐.

### 프로토타입 체인
[refer](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)
- 기본 아이디어: 프로토타입 개념을 이용해 두 가지 참조 타입 사이에서 프로퍼티와 메서드를 상속한다.
- 모든 생성자엔 생성자 자신을 가리키는 프로토타입 객체 있으며, 인스턴스는 프로토타입을 가리키는 내부 포인터가 있음.
- 프로토타입이 사실 다른 타입의 인스턴스라면?
    + 프로토타입(A)자체에 다른 프로토타입(B)을 가리키는 포인터가 이을 것이며, B에는 또 다른 생성자를 가리키는 포인터가 있을 것이다.이계 계속 연결되어 인스턴스와 프로토타입을 잇는 체인이 형성.
```javascript
function Superman() {
    this.property = true;
}

Superman.prototype.getSuperValue = function() {
    return this.property;
}

function Me() {
    this.meproperty = false;
}

Me.prototype = new Superman(); //Superman 상속
Me.prototype.getMeValue = function() {
    return this.meProperty;
};

var instant = new meType();
alert(instant.getSuperValue()); //true
```
- 위 코드는 Superman과 Me 두 가지 타입을 정의하는데, 각 타입엔 프로퍼티와 메서드가 한개씩만 있음.
- Me가 Superman의 새 인스턴스를 생성해 상속하며 이를 Me.prototype에 할당.
    - 이렇게 하면 원래 프로토타입을 새로운 객체로 덮는다.(p.250 잘 이해 안감)
