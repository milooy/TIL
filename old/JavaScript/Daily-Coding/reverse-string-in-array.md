# Daily Codewars #11
## Question
http://www.codewars.com/kata/5264d2b162488dc400000001/solutions/javascript
```javascript
Write a function that takes in a string of one or more words, and returns the same string, but with all five or more letter words reversed (Just like the name of this Kata). Strings passed in will consist of only letters and spaces. Spaces will be included only when more than one word is present.


Examples:

spinWords( "Hey fellow warriors" ) => returns "Hey wollef sroirraw" 
spinWords( "This is a test") => returns "This is a test" 
spinWords( "This is another test" )=> returns "This is rehtona test"
```
> 5글자 이상인 단어만 뒤집어 보여주기

## My Answer
```javascript
function spinWords(words){
    words = words.split(' ');
    for(var i=0, item; item=words[i]; i++) {
        if(item.length >=5) words[i] = item.split('').reverse().join('');
    }
    return words.join(' ');
}
```
> javascript의 `for in`문은 배열에선 index를 반환하고, 오브젝트에선 값을 반환한다. 그래서 배열에 접근할 때는 `words[i]`처럼 해줘야 한다. 

## katzoo's Answer
```javascript
function spinWords(words){
  return words.split(' ').map(function (word) {
    return (word.length > 4) ? word.split('').reverse().join('') : word;
  }).join(' ');
}
```
> 으아 다음엔 꼭 map,filter등을 생각해내리라!! ㅠ.ㅠ

## Refer
[javscript for in에 대한 분석](http://programmingsummaries.tistory.com/187)
[Ten ways to reverse a string in JavaScript](http://eddmann.com/posts/ten-ways-to-reverse-a-string-in-javascript/)
