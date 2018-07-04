#Javascript Prototype

##Prototype기반 프로그래밍?
- 객체의 원형인 프로토타입을 이용하여 새로운 객체를 만들어내는 프로그래밍 기법.
- 이렇게 만들어진 객체 역시 자기 자신의 프로토타입을 갖는다.
- 이런 구조로 객체를 확장하는 방식이 Prototype기반 프로그래밍
- JS에선 class가 존재하지 않으므로 객체의 원형인 prototype을 이용한 클로닝과 객체특성을 확장해나가는 방식을 통해 새로운 객체를 생성.
- JS 프로토타입 객체의 확장은 옵져버패턴 따른다.

##자바스크립트의 Prototype
```javascript
var foo = {name: "lezhin"};
foo.prototype.a = "comics";
console.log(foo.a); //syntax error
```
- 왜 syntax error일까?
- JS에서 사용되는 프로토타입이란 용어는 크게 두가지로 나뉜다.
    + **Prototype Object**
        * Prototype Property가 가리키고 있는 것
    + **Prototype Link**
        * 자기 자신을 만들어낸 객체의 원형
- JS의 모든 객체는 자신을 생성한 객체 원형에 대한 숨겨진 연결을 갖는다. 
- 이때 자기 자신을 생성하기 위해 사용된 객체원형을 프로토타입이라 한다.
    + JS의 모든 객체는 Object객체의 프로토타입을 기반으로 확장되었기 때문에 이 연결의 끝은 Object객체의 프로토타입 Object이다.
- **즉 어떤 객체가 만들어지기 위해 그 객체의 모태가 되는 녀석을 프로토타입이라 한다.**

##reference
https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain
http://insanehong.kr/post/javascript-prototype/
http://run2you.tistory.com/12