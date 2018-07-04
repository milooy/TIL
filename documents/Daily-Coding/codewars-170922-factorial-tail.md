# [일일코딩 #31] Fatorial tail

Daily Codewars #31

## Question
> 자연수 a의 팩토리얼 수를 b진수로 고쳤을 때 뒤에 0이 얼마나 붙는지 구하는 질문이다. 4kyu짜리 문제.

[codewars link](https://www.codewars.com/kata/55c4eb777e07c13528000021/train/javascript)

How many zeroes are at the end of the factorial of 10? 10! = 3628800, i.e. there are 2 zeroes. 16! in hexadecimal would be 0x130777758000, which has 3 zeroes.

`<Scalability>`

Unfortunately, machine integer numbers has not enough precision for larger values. Floating point numbers drop the tail we need. We can fall back to arbitrary-precision ones - built-ins or from a library, but calculating the full product isn't an efficient way to find just the tail of a factorial. Calculating 100'000! in compiled language takes around 10 seconds. 1'000'000! would be around 10 minutes, even using efficient Karatsuba algorithm

`<Your task>`

is to write a function, which will find the number of zeroes at the end of (number) factorial in arbitrary radix = base for larger numbers.

- base is an integer from 2 to 256
- number is an integer from 1 to 1'000'000

## 비하인드 스토리
점심 먹고 잠도 깰 겸 코드워즈를 틀었다. 처음엔 별 고민 없이 `숫자.toString(몇진수)`가 큰 수에서 overflow나길래 `toString` 없이 N진수로 고치는 코드를 짰다. 근데 그런 문제가 아니었음. `50 팩토리얼`만 해도 콤퓨타에서 저장할 수 없으니... (팩토리얼로 변환가능해야 하는 범위는 100만까지다). 
회사 옆자리 동료분께 "50!를 2진수로 바꿨을 때 뒤에 0이 얼마나 붙어요?" 여쭤보니 그건 수학 문제에 더 가깝고, ACM(대학생 프로그래밍 경시대회) 1번 문제 난이도라고 하였다(다른 분께선 그건 아니고 예선문제 정도 레베루라고...).

내가 계속 실마리를 못 잡으니 힌트를 주셨다. 
> h: 0의 의미를 생각해보세요
> 나: ...
> h: 50!를 10진수로 바꿨을 때 뒤에 0이 붙는 경우를 생각해보세요

## My Answer
알아내따! 정말 실마리는 0의 의미에 있었다.
팩토리얼을 풀어해쳤을 때, `8!`는 `8*7*6*5*4*3*2*1` 이다. 10진수가 0으로 끝나려면 `2A * 5B`나 `10C`가 저 안에 있으면 되지 않을까? 
그럼 n진수 뒤의 0은 `number`(팩토리얼 당하는 수)를 풀어해친 수 속에 얼마나 `base`(진수)가 들어있는지 찾으면 되는구나. 

처음엔 `number`를 무작정 `base`로 나눠갔다. 당연히 또 overflow가 났다. 나머지를 계속 곱하면서 저장하니 당연히...
```javascript
function zeroes (base, number) {
  var answer = 0;
  var remain = 1;
  for (var i = number; i > 0; i--) {
    var newI = i;
    newI *= remain; // 나누고 난 나머지는 계속 곱해둠 -> overflow 원흉
    if(newI%base === 0) { // 나눠 떨어지면 answer를 증가시킴
      answer++;
      newI = Math.floor(newI/base);
    }
    remain = newI;
  }
  return answer;
}
```

그 다음은 `base`와 `number` 모두 소인수분해를 해서 이를 비교해보았다. 소인수분해 함수를 만들어서 돌려 썼다.
```javascript
function zeroes (base, number) {
  function makePrime(num, obj) { // 소인수분해 하는 함수
    for (var i = 2; i <= num; i++) {
      var quantity = 0;
      while(num%i===0) {
        quantity++;
        num = Math.floor(num/i);
      }
      if(quantity>0){
        var originVal = obj[i];
        obj[i] = originVal? originVal + quantity : quantity;
      }
    }
    return obj;
  }

  var basePrime = makePrime(base, {});
  var numberPrime = {};
  for (var i = number; i >= 0; i--) { // 팩토리얼 for문 돌며 공용 object에 인수를 집어넣는다
    makePrime(i, numberPrime);
  }

  var answer = 0;
  var answerList = [];
  var baseLength = Object.keys(basePrime).length;
  for (var i = 0; i < baseLength; i++) { // 소인수분해한 두 object 비교
    var oName = Object.keys(basePrime)[i];
    if(!numberPrime[oName]) {
      answer = 0;
      break;
    }
    var result = Math.floor(numberPrime[oName] / basePrime[oName])
    answerList.push(result)
  }
  return Math.min.apply(null, answerList);
}
```

이 함수의 문제점은 `zeroes(2, 524288)`정도로 팩토리얼 할 수가 커지면 연산이 터지는 것이었다.
`zeroes(2, 100000)`크기의 연산도 `4.8s`나 걸린다.
자잘한 성능 최적화로는 안되고 연산 자체를 토막내야 되겠네...

더 생각해보니 `number`의 소인수를 굳이 모두 구할 필요 없이 `base`의 소인수로만 연산하면 되는거였다. base는 범위도 256까지밖에 안 된다. (e.g. base 소인수가 `{2:2, 3:5}`라면 number에서 2와 3의 갯수만 구하기)

```js
function zeroes (base, number) {
  function makePrime(num, obj) { // base용 소인수분해
    for (var i = 2; i <= num; i++) {
      var quantity = 0;
      while(num%i===0) {
        quantity++;
        num = Math.floor(num/i);
      }
      if(quantity>0){
        var originVal = obj[i];
        obj[i] = quantity;
      }
    }
    return obj;
  }

  function makePrimeArray(num, obj, arr) { // number용 소인수분해: base의 키값만 돌며 인수를 구한다
    var length = arr.length;
    for (var i = 0; i < length; i++) {
      var arrKey = arr[i], quantity = 0;
      while(num>0 && num%arrKey===0) {
        quantity++;
        num = Math.floor(num/arrKey);
      }
      if(quantity>0){
        var originVal = obj[arrKey];
        obj[arrKey] = originVal? originVal + quantity : quantity;
      }
    }
    return obj;
  }

  var basePrime = makePrime(base, {}),
      numberPrime = {},
      basePrimeArr = Object.keys(basePrime),
      answer = Infinity,
      answerList = [],
      baseLength = Object.keys(basePrime).length;

  for (var i = number; i >= 0; i--) {
    makePrimeArray(i, numberPrime, basePrimeArr);
  }
  for (var prop in basePrime) {
    answer = Math.min(answer, Math.floor(numberPrime[prop] / basePrime[prop])) | 0;
  }
  return answer
}
```


그래서 base용, number용 소인수 구하는 함수를 나눴다.
굳이 하면 합칠 수 있겠는데... 이 때는 쫄보라서 최대한 속도 높이려고 함수 분리했음 흐훅

이렇게 바꿨더니 기존에 연산 죽던 `524288`이 0.2s만에 계산되더라. 오예!

## pompeu2004's Solution
이럴 줄 알았어... 남들은 엄청 짧은 코드로 풀 줄...

```javascript
function zeroes (base, number) {
  var factors = {}, i = 1;
  while(++i <= base) while(base%i == 0) {
    base /= i; 
    factors[i] = (factors[i]||0) + 1;
  }
  return Math.min(...Object.keys(factors).map(factor => {
    var count = 0, i = 1;
    while((i *= factor) <= number) count += number/i>>0;
    return count/factors[factor]>>0;
  }));
}
```

## 결론 
멍충 인증
