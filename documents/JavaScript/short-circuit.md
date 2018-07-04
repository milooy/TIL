# 단축 평가 값 (Short-circuit Evaluation)

> 논리 연산자들은 왼쪽->오른쪽 순으로 실행됨. 
> 이 연산자들은 결과를 얻게 되는 순간 단축 평가(즉, 평가의 중단)를 시행.
> false && 표현식 -> 이미 false발견
> true || 표현식 -> 이미 true
> 그러나 그 결과값은 (반드시 true 또는 false가 아니라) 평가를 중단하게 된 계기가 된 값을 리턴한다.

## 예제
### ex.1
```javascript
var me = "바보";
var you = (me || "천재"); //"바보"
```
내용을 가진 문자열은 true니까 you에 me값이 대입된다.

### ex.2
```javascript
var me = "";
var you = (me || "천재"); //"천재"
```

### ex.3
```javascript
var me = "";
var you = (me || {}); //"천재"
```
me가 값을 가지고 있지 않은 경우엔 빈 객체 생성

### ex.4
```javascript
vA = 0;
vB = 1;
vC = 2;

if(vA||vB||vC){
    //do something
}
```
- 세 값 중 어느 하나라도 true로 취급될 수 있으면 if내의 코드가 실행.
- 경험 많은 개발자들은 그래서 비용이 높은 코드는 가능한 한 나중에 평가되도록 작성한다.
- OR연산자를 사용할 땐 true를 리턴할 가능성이 높은 코드를 첫 번째 조건으로 작성하고,
- AND연산자에선 false를 첫번째로.

## 참고
인터랙티브 프론트엔드 웹 개발 교과서 자바스크립트&제이쿼리 (제이펍) p.169
