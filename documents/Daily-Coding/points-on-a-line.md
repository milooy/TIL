# Daily Codewars #14
## Question
http://www.codewars.com/kata/53b7bc844db8fde50800020a/train/javascript
Given some points (cartesian coordinates), return true if all of them lie on a line.
```javascript
onLine([[1,2], [7, 4], [22, 9]]);       // returns true
onLine([[1,2], [-3, -14], [22, 9]]);    // returns false
```
> 좌표계에서 일직선에 있는지 구하는 문제다.
> 배열엔 3개뿐이 아니고, 여러개 또는 0개 혹은 같은 숫자들이 들어갈 수 있는 것을 유념해야 한다.

## My Solution
```javascript
function onLine(points) {
  var prevSlope;
  if(points.length<=2) return true;

  for(i=0; i<points.length-1; i++){
    slope = (points[i][0]-points[i+1][0])/(points[i][1]-points[i+1][1])
    if(!prevSlope || isNaN(prevSlope)) prevSlope = slope;
    if(isNaN(slope)) continue;
    if(prevSlope != slope) return false;
  }
  return true;
}
```
> 처음 문제를 봤을땐 '뭐 이리 쉬운게 6kyu단계야' 했는데 막상 하니 오래걸렸다.
> NaN과 -infinite, +infinite를 구별해야 하고, 
> 같은 배열(like `[[1,2], [1,2], [2,4], [2,4]]`)따위를 처리하는것이 생각보다 까다로웠다.

## @lv.D's Solution
```javascript
function onLine(points) {
  if (points.length < 3) return true;
  var x = points.shift();
  var a = undefined;
  return points.
    filter (function(y) { return !(x[0] == y[0] && x[1] == y[1]) }).
    map    (function(y) { return a = (x[0] - y[0])/(x[1] - y[1]) }).
    every  (function(y) { return y == a });
}
```
> 이 뭐...
> 아 뭐 이사람은 이렇게 풀 수도 있겠지... 그래...

## @Wisehorn's Solution
```javascript
function onLine(points) {
  if (points.length < 3) return true;
  
  var returnValue = collinear.apply(null, points.slice(i, 3));
  for(var i = 1; i < points.length - 2; i++) {
    returnValue = returnValue && collinear.apply(null, points.slice(i, i+3));
  }

  return returnValue;

  function collinear(point1, point2, point3) {
    return (point1[1] - point2[1]) * (point1[0] - point3[0]) == 
           (point1[1] - point3[1]) * (point1[0] - point2[0]);
  }
}
```
>나랑 비슷하게 for문을 돌렸다.
