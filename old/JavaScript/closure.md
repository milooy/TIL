# 자바스크립트 클로저(Closure)

## 클로저란?
외부함수의 변수에 접근할 수 있는 내부함수.

- 스코프 체인
+ 클로저 자신에 대한 접근 (자신 블럭 내에 정의된 변수)
+ 외부 함수 변수에 대한 접근
+ 전역변수 대한 접근

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

## Refer
http://chanlee.github.io/2013/12/10/understand-javascript-closure/
