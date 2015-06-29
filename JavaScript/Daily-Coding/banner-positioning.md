#일일코딩-메인 프로모션 배너 위치 지정

##Question
>- 현재 http://lezhin.com 화면에서 사용하고 있는 메인 프로모션 배너의 위치를 지정하는 코드 작성
>- 프로모션 영역은 1부터 8까지 총 8개이며 이 중 메인 프로모션이 들어가는 자리는 1, 2, 3, 5, 6, 7
>- wide 배너가 1개 (double), square 배너가 3개 (single), 작은 wide 배너가 2개 (half) 사용된다.
>- 작은 wide 배너의 위치값은 같다.
>- 이 배너들의 위치는 모두 무작위다.

```javascript
function arrange() {
    /* 코드는 여기에 */
}
/* 콘솔 출력 */
double : 1
single : 4, 5, 6
half   : 3
```

```javascript
function random(min, max) {
    if (max === undefined) { max = min; min = 0; }
    return Math.floor(Math.random() * (max - min)) + min;
}
```

##Answer
###milooy
```javascript
function arrange(){
    var arr_or = [1,2,3,5,6,7];
    var arr = [];

    while(arr.length<6){
        var num = random(arr_or.length);
        if(arr.length==0){
            if(num!=2 && num!=5){
                arr = arr_or.splice(num, 2);
            } else { continue; }
        }
        arr.push(Number(arr_or.splice(num, 1)));
    }
    return arr;
}
```
>feedback: "while문 쓰지 마!"

###zziuni
```javascript
function arrange() {
  var slot = [1,2,3,5,6,7];
  var result = {};
  var doubleEnableIndexs = [0,1,3,4];

  var doubleIndex = doubleEnableIndexs[random(0,4)];
  result.double = slot[doubleIndex];
  slot.splice(doubleIndex,2);

  result.square = [];

  for(var i=0; i<3; i++) {
    var index = random(slot.length);
    result.square.push(slot[index]);
    slot.splice(index,1)
  }

  result.single = slot[0];

  return result;  
}
```

###tobyyun
```javascript
function arrange() {
    var valArray = [1,2,3,5,6,7];
    var valDouble, valHalf, valSingle;
    valDouble = random(1,5); // double은 1,2,5,6 4가지 케이스 중 하나임
    if(valDouble > 2) {
        valDouble += 2; // 3,4 인경우 5,6 으로 만들어줌
    }
    valArray.splice(valArray.indexOf(valDouble),2); // double 이라서 2개 뺌

    valHalf = valArray[random(0,4)]; // half 는 남는 4개 셀 중 하나
    valArray.splice(valArray.indexOf(valHalf),1);

    valSingle = valArray.join(', '); // single 은 나머지

    console.log('double : ' + valDouble);
    console.log('single : ' + valSingle);
    console.log('half : ' + valHalf);
}
```

###fallroot
```javascript
function arrange() {
    var positions = [1, 2, 3, 5, 6, 7];

    var double = [1, 2, 5, 6][random(4)];
    var doubleIndex = positions.indexOf(double);

    positions.splice(doubleIndex, 2);

    var half = random(0, 4);
    var halfIndex = positions.indexOf(half);

    positions.splice(halfIndex, 1);

    console.log('double:', double);
    console.log('single:', positions.join(','));
    console.log('half:', half);
}
```
