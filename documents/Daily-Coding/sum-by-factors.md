# Daily Codewars #28
## Question
[codewars link](http://www.codewars.com/kata/sum-by-factors/javascript)
Given an array of positive or negative integers

`I= [i1,..,in]`

you have to produce a sorted array P of the form

`[ [p, sum of all ij of I for which p is a prime factor (p positive) of ij] ...]`

P will be sorted by increasing order of the prime numbers. The final result has to be given as a string in Java or C# and as an array of arrays in other languages.

Example:
```javascript
I = [12, 15] 
result = [[2, 12], [3, 27], [5, 15]]
```
[2, 3, 5] is the list of all prime factors of the elements of I, hence the result.

**Note**: It can happen that a sum is 0 if some numbers are negative!

Example: I = [15, 30, -45] 5 divides 15, 30 and (-45) so 5 appears in the result, the sum of the numbers for which 5 is a factor is 0 so we have [5, 0] in the result amongst others.
> 소인수를 구하고, 공통된 소인수를 가진 수들을 더해 각각 반환하는 문제다.

## My Solution
```javascript
function sumOfDivided(lst) {
  var commonArr = [];
  var pfsArr = [];

  for(i in lst) {
    var num = lst[i];
    var pfArr = [];
    var pf = 2;

    function recur(n) {
      if(n%pf==0) {
        if(pfArr.indexOf(pf)<0) pfArr.push(pf);
        if(commonArr.indexOf(pf)<0) commonArr.push(pf);
        n = n/pf;
        pf=2;
      } else pf++;
      if(pf>Math.abs(n))return;
      recur(n);
    }

    recur(num);
    pfsArr.push(pfArr);
  }

  return commonArr.sort(function(a,b){return a-b;}).map(function(cPf){
    var sum = 0;
    pfsArr.forEach(function(pPf, pIdx){
      if(pPf.indexOf(cPf)>=0) sum+=lst[pIdx];
    });
    return [cPf, sum];
  });
}
```
배열을 세개 만들었다.
- pfArr: 주어진 배열 인자의 소인수 배열
- commonArr: 그 소인수들을 중복 없이 모은 배열
- pfsArr: pfArr들이 들어가있는 배열
여기서 commonArr에 map을 돌려 pfsArr에 특정 소인수가 있는지 판별하고, 있으면 더해서 두번째 인자에 넣어준다.
배고프다. 저녁 안먹음.

## @Hex-a's Solution
```javascript
function sumOfDivided(lst) {
    if(lst.length == 0) { return []; }
    var m = Math.max.apply(null, lst.map(Math.abs)),
        primes = [],
        marked = Array(m+1);

    for(var i = 2; i <= m; ++i) {
        if(marked[i]) continue;

        var sum = 0, isMul = false;
        lst.forEach(function(n) { if(n % i == 0) { sum += n; isMul = true; } });
        if(isMul) primes.push([i, sum]);

        for(var j = 2*i; j <= m; j += i) {
            marked[j] = true;
        }
    }

    return primes;
}
```

## @7nik's Solutino
```javascript
function sumOfDivided(lst) {
  console.log(lst);
  var max = lst.reduce(function(m,v){return m>v?m:v;}, lst[0]);
  var min = lst.reduce(function(m,v){return m<v?m:v;}, lst[0]);
  max = Math.max(max, -min);
  console.log(max);
  var primes = [];
  for (var i = 2; i <= max; i++) {
    if (primes.every( function (prime) { return i % prime; }) &&
        lst.some(function (val) { return !(val % i); })) {
      primes.push(i);
    }
  }
  console.log(primes);
  var result = primes.map(function(prime) {
      return [prime, lst.reduce(function(sum, num) {
          return sum + (num % prime ? 0 : num);
        }, 0)];
    });
  return result;
} 
```

다들 많이 다르게 풀었네.
