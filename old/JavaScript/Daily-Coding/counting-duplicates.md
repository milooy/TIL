# Daily Codewars #17
## Question
http://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1/train/javascript
Count the number of Duplicates

Write a function that will return the count of distinct case-insensitive alphabetic characters that occur more than once in the given string. The given string can be assumed to contain only uppercase and lowercase alphabets.

Example
```javascript
"abcde" -> 0 # no characters repeats more than once
"aabbcde" -> 2 # 'a' and 'b'
"aabbcdeB" -> 2 # 'a' and 'b'
"indivisibility" -> 1 # 'i'
"Indivisibilities" -> 2 # 'i' and 's'
```

## My Solution
```javascript
function duplicateCount(text){
  var arr = [], dupArr = [];
  for(var i=0; i<text.length; i++) {
    var t = text[i].toLowerCase();
    if(arr.indexOf(t)<0) arr.push(t);
    else if(dupArr.indexOf(t)<0) dupArr.push(t);
  }
  return dupArr.length;
}
```
> arr[], dupArr[]를 만들어서
> text 길이만큼 for를 돌려 겹치지 않을땐 arr에, 겹칠땐 dupArr에 중복되지 않게 push하고 
> dupArr의 길이를 반환했다.
> Array.filter나 Array.forEach로 한번에 해결하고픈 마음도 있었는데 그럼 또 array로 바꿔서 해야되어 그냥 이렇게 가는걸로.
> 코드워즈가 복잡도 같은것도 계산해줬으면 좋겠다.

## @jacobb's Solution
```javascript
function duplicateCount(text){
  return (text.toLowerCase().split('').sort().join('').match(/([^])\1+/g) || []).length;
}
```
> 일단 toLowerCase를 하고 배열로 만든 뒤 정렬하고 다시 string으로 만든뒤 정규표현식.
> [^]는 그룹안에 있는것의 반대니 모든 문자열(공백 등 포함.)
> \1은 그룹#1의 백리퍼런스. 
> 그니까 앞의 문자랑 같은것의+된거니 연속된 문자열을 모아 배열로 반환. 
> 그거의 length.
> 아아... 정규표현식 간지 터진다.

## @Azuaron's Solution
```javascript
function duplicateCount(text) {
  var dup = [];
  text.toLowerCase().split('').forEach(function(v, i, arr) {if(i != arr.lastIndexOf(v) && dup.indexOf(v) == -1) dup.push(v);});
  return dup.length;
}
```
> 내가 쓰고싶었던 forEach를 쓰셨네! 
> 원배열에서 아이템의 마지막 위치가 현인덱스랑 다르며, 
> dupArr에 없다면 duppArr에 push해준다!
> 아주 아름답군.
