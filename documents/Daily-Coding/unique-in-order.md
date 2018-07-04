# Daily Codewars #19
## Question
[codewars link](http://www.codewars.com/kata/54e6533c92449cc251001667/train/javascript)
Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.

For example:
```javascript
uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
uniqueInOrder([1,2,2,3,3])       == [1,2,3]
```

## My Solution
```javascript
//version1
var uniqueInOrder=function(iterable){
    if(iterable.length==0) return [];
    var arr=[iterable[0]];
    if(typeof iterable === 'string') iterable=iterable.split('');
    iterable.reduce(function(prev,cur) {
        if(prev!=cur) arr.push(cur);
        return cur;
    });
    return arr;
}
```
```javascript
//version2
var uniqueInOrder=function(iterable){
  if(Array.isArray(iterable)) iterable=iterable.join('');
  return iterable.length==0? [] : iterable.match(/(.)(?!\1+)/g).map(function(item) {
    return isNaN(parseInt(item))? item : parseInt(item);
  });
}
```
> 1번은 벼르던 reduce를 사용해보았다. prev랑 cur이 다르면 그게 값이 바뀌는 시점으로 인식해 배열에 집어넣는다는. 그런데 제일 앞이나 제일 뒤 문자 중 하나는 포기해야해서 처음에 값을 집어넣고 해야한다는 더러움이 있다.
> 2번을 그냥 정규표현식으로만 반환하면 number로 이루어진 배열도 string으로 쪼개져서 반환된다는 버그가 있어 map으로 해주었다. 

## @ooflorent's Solution
```javascript
function uniqueInOrder(it) {
  var result = []
  var last
  
  for (var i = 0; i < it.length; i++) {
    if (it[i] !== last) {
      result.push(last = it[i])
    }
  }
  return result
}
```
> 아아. js는 string이랑 array모두 [i]로 접근할 수 있지...
> 길이만큼 돌면서 문자가 last랑 다르면 문자를 last에 넣고 result배열에 넣어준다.
> 현재 돌고있는 문자를 last라고 본거구나. 똑똑이. 깔끔하다.
> 근데 for문하고 Array.map같은 건 복잡도 차이가 날까? 궁금.

## @Freywar's Solution
```javascript
var uniqueInOrder = function (iterable)
{
  return [].filter.call(iterable, (function (a, i) { return iterable[i - 1] !== a }));
}
```
> 빈 배열에 iterable을 문맥으로 한 call을 걸어주고 filter로 바로 전 문자와 다른 것들만 뽑아낸다.
> 스킬풀하다.
