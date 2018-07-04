# 5.3 Date 타입

```
var now = new Date(); // Mon Mar 30 2015 15:46:09 GMT+0900 (KST)

var a = new Date(Date.parse("May 25, 2015"));
var a = new Date("May 25, 2015");

var a = new Date("xxx 25, 2015"); // NAN

var a = new Date(Date.UTC(2015, 0)); // 2015년 1월 1일 0시
var a = new Date(Date.UTC(2015, 1)); // 2015년 2월 1일 0시
var a = new Date(Date.UTC(2015, 1, 5, 17, 55, 55)); // 2015년 2월 1일 오후 5시 55분 55초

/*
JS 이전에 존재하던 언어와 맞추기 위함이라는 설도 있고.
해당 달의 이름을 가진 배열의 인덱스와 맞추는 작업의 용이성을 위함이라고도 합니다.
['January', 'Feb'...] 인 경우, 0부터 리턴하는 것이 간결하겠지요.
*/

var a = new Date(2015, 0); // 2015년 1월 1일 0시 (지역)
var a = new Date(2015, 1, 5, 17, 55, 55); // 2015년 2월 1일 오후 5시 55분 55초(지역)

var a = Date.now(); // ECMA5, IE9 이상 지원
var a = +new Date(); // 숫자로 변환 1427698413137

// 시작시간
var start = Date.now();
// 실행시간을 잴 함수
doSomething() ;
// 끝난시간
var stop = Date.now(),
    result = stop - start;
```

# 5.3.1 상속된 메서드

다른 참조타입 처럼 toLocaleString(), toString(), valueOf() 메서드를 오버라이드함, 반환값은 다름

* 인터넷익스플로러 8
 - toLocaleString() - Thursday, February 01, 2007 12:00:00 AM
 - toString() - Thu Feb 1 00:00:00 PST 2007
* 파이어 폭스 3.5
 - toLocaleString() - Thursday, February 01, 2007 12:00:00 AM
 - toString() - Thu Feb 01 2007 00:00:00 GMT-0800 (Pacific Standard Time)
* 사파리 4
 - toLocaleString() - Thursday, February 01, 2007 00:00:00
 - toString() - Thu Feb 01 2007 00:00:00 GMT-0800 (Pacific Standard Time)
* 크롬 4
 - toLocaleString() - Thu Feb 01 2007 00:00:00 GMT-0800 (Pacific Standard Time)
 - toString() - Thu Feb 01 2007 00:00:00 GMT-0800 (Pacific Standard Time)
* 오페라 10
 - toLocaleString() - 2/1/2007 12:00:00 AM
 - toString() - Thu, 01 Feb 2007 00:00:00 GMT-0800

사용자에게 표시하기에는 적당하지 않음(디버그 목적 정도)

valueOf() : 숫자값

```
var date1 = new Date(2007, 0, 1);
var date2 = new Date(2007, 1, 1);

alert(date1 < date2); // true
```

# 5.3.2 날짜 표시 메서드

* toDateString() - 날짜를 요일， 월， 일， 년 형식으로 표현 (브라우저에 따라 다름)
* toTimeString()- 날짜를 시， 분， 초， 타임존 형식으로 표현 (브라우저에 따라 다름)
* toLocaleDateString()- 날짜를 요일， 월， 일， 년 형식으로 표현 (브라우저, 지역에 따라 다름)
* toLocaleTimeString()- 날짜를 시， 분， 초， 타임존 형식으로 표현 (브라우저, 지역에 따라 다름)
* toUTCString()- 날찌를 UTC(협정 세계시) 형식으로 표현 (브라우저에 따라 다름)

# 5.3.3 날짜/시간 부속 메서드

```
getTime();
setTime('ms');
getFullYear();
getUTCFullYear();
setFullYear('year');
setUTCFullYear('year');
getMonth();
getMonth('month');
getUTCMonth();
setUTCMonth('month');
getDate();
getUTCDate();
setDate('date');
setUTCDate('date');
getDay();
getUTCDay();
getHours();
getUTCHours();
setHours('hours')
setUTCHours('hours');
getMinutes();
getUTCMinutes();
setMinutes('minutes');
setUTCMinutes('minutes');
getSeconds();
getUTCSeconds();
setSeconds('seconds');
setUTCSeconds('seconds');
getMilliseconds();
getUTCMilliseconds();
setMilliseconds('milliseconds');
setUTCMilliseconds('milliseconds');
getTmezoneOffset();
```

# 5.4 RegExp 타입

var expression = /pattern/flags;

flags
- g : 전역
- i : 대소문자 구분 안함
- m : 여러 줄

```
var a = /at/g; // 모든 at
var a = /[bc]at/i; // bat 또는 cat 중 처음 것. 대소문자 구분 안함
var a = /.at/gi; // at으로 끝나는 세글자. 모든. 대소문자.
```

메타문자 (escape 필요)

() [] {} \ ^ $ | ? * + .

```
// 동일
var patternl = /[bc]at/i;
var pattern2 = new RegExp("[bc]at" , "i");

var a = /\[bc\]at/; // 리터럴 패턴
var a = new RegExp("\\[bc\\]at"); // 문자
```

# 5.4.1 정규표현식 인스턴스프로퍼티열

* global - g 플래그가설정되었는지 나타내는불리언값
* ignoreCase - i 플래그가설정되었는지 나타내는불리언값
* lastlndex - 패턴 매칭을 어느 위치에서 시작할지 나타내는 정수 값
* multiline - m 플래그가설정되었는지 나타내는불리언값
* source - 정규 표현식을 생성한 문자열

```
var patternl = /\[bc\]at/i;

alert(pattern.global); // false
alert(pattern.ignoreCase); // true
alert(pattern.multiline); // false
alert(pattern.lastlndex); // 0
alert(pattern.source); // "\[bc\]at"
```

# 5.4.2 정규 표현식 인스턴스 메서드

가장 많이 쓰이는 메서드는 그룹을 캡처할 의도로 만들어진 exec()

```
var text = "mom and dad and baby";
var pattern = /mom(and dad(and baby)?)?/gi;

var matches = pattern.exec(text);
alert(matches.index); // 0
alert(matches.input); // “mom and dad and baby"
alert(matches[0]); // “mom and dad and baby"
alert(matches[1]); // “ and dad and baby"
alert(matches[2]); // “ and baby"
```
또 다른 메서드 test(), true/false 반환

```
var text = "000-00-0000";
var pattern = /\d{3}-\d{2}-\d{4}/;

if (pattern.test(text)){
    alert ("The pattern was matched.");
}
```

# 5.4.3 RegExp 생성자 프로퍼티

* input $- 마지막으로 테스트한 텍스트.
* lastMatch $& 마지막으로 일치한 문자열.
* lastParen $+ 마지막으로 일치한 캡처 그룹.
* leftContext $’ inp 니t 텍스트에서 lastMatch 앞에 있는 문자열
* multiline $* 모든 정규 표현식이 다중 행 모드(m)을 사용해야 하는지 묘현하는 불리언값. IE 미지원
* rightContext $’ input 텍스트에서 lastMatch 다음에 오는 문자열

# 5.4.4 패턴의 한계

ECMAscript의 정규 표현식은 완전히 개발된 상태. 하지만 지원하지 않는 것들 있음.

* 텍스트의 처음과 마지막에 일치하는 \A와 \Z
* 룩비하인드(룩어헤드의 반대 개념)
* 병합 클래스
* 최소 그룹 atomic group
* 유니코드지원 (한번에 한 문자를 찾는 기능은 지원합니다.)
* 이름 붙은 캡처 그룹
* s(한 줄 모드)， x(공백 무시 모드)플래그
* 조건문
* 정규 표현식 주석
