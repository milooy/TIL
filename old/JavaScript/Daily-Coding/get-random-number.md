# 일일코딩-랜덤넘버 뽑기

## Question
>최솟값, 최댓값 입력받아서 그 사이에 있는 정수를 무작위로 하나 구하기
>### 조건
>- 최솟값은 입력하지 않을 수 있음
>- 최솟값을 입력하지 않으면 0부터 시작
>- 최댓값 인자도 결과값으로 나올 수 있어야 함
>- 인터넷 검색 금지

```javascript
function random(min, max) {
    return randomNumber;
}
```

## 내 첫번째 답안지
```javascript
//ver1
function random(min, max) {
    if(arguments.length==1)
        return Math.round(Math.random()*arguments[0]+1)-1;
    else if(arguments.length==2)
        return Math.round(Math.random()*(arguments[1]-arguments[0]))+arguments[0];
    // return Math.round(Math.random()*(max-min))+min
}
//ver2
function random(min, max) {
    var a = arguments[0];
    var b = arguments[1];

    if(b==undefined){
      b=a; a=0;
    }
    return Math.round(Math.random()*(b-a))+a;
}
```

## 피드백
```javascript
var result = [0, 0, 0, 0];

for (var i = 0; i < 1000; ++i) {
    result[random(0, 3)] += 1;
}

console.log(result);
```
위의 코드를 돌려보면 알겠지만 결과는 제일 앞 수와 제일 마지막 수가 월등히 적게 나온다.
<br>왜냐하면 Math.round()로 반올림을 하면 
<br>0: 0~0.4
<br>1: 0.5~1.4
<br>2: 1.5~2.4
<br>3: 2.5~2.9
<br>이런식으로 0과 3이 적은 비율을 갖게 되기 때문.
<br>그러므로 floor나 ceil을 써서 올림이나 버림을 하면 된다.

## 고친 코드
```javascript
function random(min, max) {
    if (max === undefined) {
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * (max - min)) + min;
}
```
