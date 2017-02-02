# 칸아카데미 알고리즘 강의
https://ko.khanacademy.org/computing/computer-science/algorithms

## 이진 검색
### 수도 코드
1. min = 0 이고 max = n-1 입니다.
2.max < min, 이라면 멈춥니다. 타겟이 배열에 존재하지 않습니다. -1을 반환합니다.
3. 'guess'를 'max'와 'min'의 평균으로 계산하고 (정수가 될 수 있도록) 내림합니다.
4. 배열[guess]가 타겟과 같다면 멈춥니다. 찾았습니다! guess를 반환합니다.
5. 만약 추측이 너무 낮았다면, 즉 배열[guess] < 타켓이라면, min = guess + 1로 바꿉니다.
6. 그렇지 않다면 추측이 너무 높습니다. max = guess - 1로 바꿉니다.
7. 2단계로 돌아갑니다.

### 코드
```js
var doSearch = function(array, targetValue) {
  var min = 0;
  var max = array.length - 1; //24
  var guess;
  while(min<=max) {
      guess = Math.floor((max+min)/2);
      println(guess);
      if(array[guess]<targetValue) {
          min = guess+1;
      } else if (array[guess]>targetValue) {
          max = guess-1;
      } else {
          return guess;
      }
  }
  return -1;
};

var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 
41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

var result = doSearch(primes, 97);
println("Found prime at index " + result);

Program.assertEqual(doSearch(primes, 73), 20);
```

## 점근적 표기법
###알고리즘의 실행 시간
1. 입력값의 크기에 따른 알고리즘 실행 시간
    - 배열 크기 작을수록 추측 최대 횟수도 줄어든다
2. 실행 시간의 성장률(rate of growth): 입력값의 크기에 따라 이 함수가 얼마나 빨리 커지는지
    - 6n^2 + 100n + 300이란 알고리즘에서 n값이 커질수록 6n^2는 나머지 합친것보다 훨씬 기하급수적으로 커진다
    - an^2가 bn+c보다 크고 n이 커질수록 그 차이가 커지는 n의 값(교차점)은 항상 존재
    - 중요하지 않은 항목과 상수 계수를 제거하면 이해 방해하는 불필요한 부분 없어져서 알고리즘의 실행 시간에서 중요한 부분인 *성장률* 에 집중할 수 있다.

상수 계수와 중요하지 않은 항목 제거했을 때는 **점근적 표기법(asymptotic notation)**을 사용한다.
이는 1. big-Θ 2. big-O 3. big-Ω 3개가 있다.

### 빅 세타 표기법

