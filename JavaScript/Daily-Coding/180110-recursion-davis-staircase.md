# Recursion: Davis' Staircase

## Question
https://www.hackerrank.com/challenges/ctci-recursive-staircase/problem
Davis는 한번에 1, 2, 3칸을 오를 수 있다.
N칸을 오를 때의 경우의 수를 구해라

## Answer
재귀로 풀라고 힌트를 줬는데 잘 모르겠어서 구글에 '계단 오르기 알고리즘'을 검색했다.
Dynamic Programming으로 푸는 법이 나왔는데 잘 이해가 안 갔다. (재귀로 푼 다음 스텝이라 카더라)
'계단 오르기 재귀'하니까 드디어 접근법이 이해가 갔다.

5개 계단을 오르는 경우의 수 = 2번째 계단에서 3칸 오르기 + 3번째 계단에서 2칸 오르기 + 4번째 계단에서 1칸 오르기

이니까 `f(n) = f(n-3) + f(n-2) + f(n-1)`이며, base case는 계단 수가 1, 2, 3일때를 적어두면 될것이다.

처음엔 간단하게 재귀로만 풀었다.
```js
function fn(num) {
  if(num == 1) return 1;
  else if(num == 2) return 2;
  else if(num == 3) return 4;

  return fn(num-1) + fn(num-2) + fn(num-3)
}
```
그랬더니 35계단만 올라가도 4.4s가 걸리는 것이었다.
재귀는 호출을 엄청 많이 하기 때문에 수가 커질수록 성능이 구리다.

그래서 캐시드 오브젝트를 만들었다.
```js
let cachedObj = {1:1, 2:2, 3:4};
function fn(num) {
  if(Object.keys(cachedObj).indexOf(String(num)) >= 0) {
    return cachedObj[num];
  } else {
    let answer = fn(num-1) + fn(num-2) + fn(num-3);
    cachedObj[num] = answer;
    return answer;
  }
}
```
굿 이제 0.1s로 줄었다.
