#Regular Expression Guide

###정규표현식 생성- 1. 컴파일
```javascript
//정규표현식 리터럴
var pattern = /a/;
//정규표현식 객체 생성자
var pattern2 = new regExp('a');

//보통 리터럴 쓰는데 패턴 넣거나 할때는 객체생성자로 쓴다. 그니까 둘다 쓴다는겨.
```

###정규표현식 생성-2. 메서드 실행(execution)
```javascript
console.log(pattern.exec('abcdef')); // ["a"]
console.log(pattern.exec('bc')); // null
console.log(pattern.test('abcdef')); // true
```

###정규표현식 생성-3. 문자열 메서드 실행
```javascript
console.log('abcdef'.match(pattern)); // ["a"]
console.log( 'abcdef'.replace(pattern, 'A')); // Abcdef
```

###옵션
- i: 대소문자 구별 안함(ex. var xi=/a/i;)
- g: 끝까지 검색해서 모든 결과 리턴

###Tip
- \s: 공백
- 인덱스반환: text.search(re);

### 선택
- 숫자: [0-9]

###예제
```javascript
var targetText = "http: vs https: or httpss:";
var natcges = targetText.match(/https?:/g);

console.log(matches);
>Array["http:", "https:"];

targetText = targetText.replace(/https?:/g, "protocol");
console.log(targetText);
>"protocol vs protocol or httpss:"
```

###Reference
- 초보자에게 좋은 자료: http://www.slideshare.net/ibare/ss-39274621
- 정규표현식 테스트해볼수 있는 사이트: http://www.regexr.com/
- opentutorials: http://opentutorials.org/module/532/6580 
