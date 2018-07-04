# Daily Codewars #25
## Question
[codewars link](http://www.codewars.com/kata/52190daefe9c702a460003dd/train/javascript)
Complete the solution so that it returns the number of times the search_text is found within the full_text.
```javascript
searchSubstr( fullText, searchText, allowOverlap = true )
```
so that overlapping solutions are (not) counted. If the searchText is empty, it should return "0". Usage examples:
```javascript
searchSubstr('aa_bb_cc_dd_bb_e', 'bb') # should return 2 since bb shows up twice
searchSubstr('aaabbbcccc', 'bbb') # should return 1
searchSubstr( 'aaa', 'aa' ) # should return 2
searchSubstr( 'aaa', '' ) # should return 0
searchSubstr( 'aaa', 'aa', false ) # should return 1
```

## My Solution
```javascript
function searchSubstr(fullText, searchText, allowOverlap ){
  var count=0, sIdx=0;
  for(i in fullText){
    var cIdx = fullText.indexOf(searchText, sIdx);
    sIdx = allowOverlap==false? cIdx+searchText.length+1 : cIdx+1;
    if(cIdx<0) return count;
    count++;
  }
  return 0;
}
```
최대로 fullText.length만큼 for를 돈다.
거기서 allowOverlap에 따라 String.indexOf의 두번째 인자에 시작위치를 바꿔줘가며 돌린다.

## @Azuaron's Solution
```javascript
function searchSubstr(fullText, searchText, allowOverlap) {
  if(searchText == '') return 0;
  var re = new RegExp(searchText, 'g');
  if(allowOverlap) {
    var count = 0;
    while(re.exec(fullText)) {count++; re.lastIndex -= searchText.length - 1;}
    return count;
  } else return (fullText.match(re) || []).length || 0;
}
```
false일땐 일단 정규표현식으로 간단히 리턴하고,
true면 `re.lastIndex -= searchText.length - 1`로 lastIndex를 바꿔준다.

## @kumorig's Solution
```javascript
function searchSubstr( t, s, o ){
  return(t.length===0||s.length===0)?0:t.match(new RegExp((o||(o==undefined))?"(?=("+s+"))":t,"g")).length; 
}
```
헤헤...정규식...이전 회사에 다녔던 분 이름인 정규식...
