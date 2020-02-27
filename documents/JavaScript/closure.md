# 자바스크립트 클로저(Closure)

## 클로저란?
외부함수의 변수에 접근할 수 있는 내부함수.

- 스코프 체인
+ 클로저 자신에 대한 접근 (자신 블럭 내에 정의된 변수)
+ 외부 함수 변수에 대한 접근
+ 전역변수 대한 접근

- 카일 심슨의 정의: 클로저는 함수가 속한 렉시컬 스코프를 기억하여 함수가 렉시컬 스코프 밖에서 실행될 때에도 이 스코프에 접근할 수 있게 하는 기능

## 기본 예제
```js
function showName(firstName, lastName) {
    var intro = "이름은 ";
    function fullName() {
        // 외부함수 변수뿐만 아니고 파라미터도 사용 가능
        return intro + firstName + lastName;
    }
    return fullName();
}

showName("유림", "진");
```

```js
$(function() {
    var selections = [];
    $(".yoolmoo").click(function() { // 이 클로저는 selections 변수에 접근합니다.
        selections.push(this.prop("name")); // 외부 함수의 selections 변수를 갱신함
    });
});
```

## 클로저 활용
```js
function userID() {
    var userID = 999;
    return {
        getID: function() {
            // 갱신된 userID를 리턴
            return userID;
        },
        setID: function(newID) {
            UserID = newID;
        }
    }
}

var myID = userID(); // 이 때, userID 외부 함수가 리턴됨
myID.getID(); // 999
myID.setID(567);
myID.getID(); // 567

```

## 클로저 헷갈려라
```js
function userID(userList) {
    var i; // 외부함수의 변수가 for문에 의해 변경됨
    var uniqueID = 100;
    for(i=0; i<userList.length; i++) {
        userList[i]["id"] = function() {
            // 이 내부 익명함수 클로저는 최종 갱신된 변수 i(3)에만 접근가능하다
            // 이게 실행될 시점에 i는 3이다
            return uniqueID + i;
        }
    }
    return userList;
}

var userList = [{name:"율무", id:0}, {name:"연우", id:0}, {name:"다정", id:0}];
var userIDCreated = userID(userList);

var yoolmooID = userIDCreated[0]; // 이때 내부함수 호출
console.log(yoolmooID.id); //101을 원했는데 103나옴 [103, 103, 103]
```

```js
function userID(userList) {
    var i; // 외부함수의 변수가 for문에 의해 변경됨
    var uniqueID = 100;
    for(i=0; i<userList.length; i++) {
        userList[i]["id"] = function(j) {
            // 이 내부 익명함수 클로저는 최종 갱신된 변수 i(3)에만 접근가능하다
            // 이게 실행될 시점에 i는 3이다
            return function() {
                return uniqueID + j;
            }() //함수 리턴 대신 즉시 실행
        }(i); //i변수를 파라미터로 즉시 함수호출
    }
    return userList;
}
```

## 클로저 + React hooks
```js
// 예제 0
function useState(initialValue) {
  var _val = initialValue // _val은 useState에 의해 만들어진 지역 변수입니다.
  function state() {
    // state는 내부 함수이자 클로저입니다.
    return _val // state()는 부모 함수에 정의된 _val을 참조합니다.
  }
  function setState(newVal) {
    // 마찬가지
    _val = newVal // _val를 노출하지 않고 _val를 변경합니다.
  }
  return [state, setState] // 외부에서 사용하기 위해 함수들을 노출
}

var [foo, setFoo] = useState(0) // 배열 구조분해 사용
console.log(foo()) // 0 출력 - 위에서 넘긴 initialValue
setFoo(1) // useState의 스코프 내부에 있는 _val를 변경합니다.
console.log(foo()) // 1 출력 - 동일한 호출하지만 새로운 initialValue
```
- `state()`가 클로저인 이유:
    - state가 밖에서 `foo()`이렇게 실행되었는데도 내부의 `_val`을 잘 리턴하고 있다. 그 내부스코프에 있던 `_val`이 계속 수정되더라도 상관 없이 잘 return하고 있다. 
    + 사실 state함수 내부를 안 보고 밖에만 본다면 밖에서 내부변수 _val이 노출되지 않았는데 계속 수정할 수 있다는게 신기하지.


## Refer
http://chanlee.github.io/2013/12/10/understand-javascript-closure/
