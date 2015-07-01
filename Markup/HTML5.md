# HTML5

## HTML5
- HTML 4.0이후에도 W3C에 의해 HTML은 HTML 4.01, XHTML1.0등으로 진화하기 위해 많은 노력을 해옴.
- 그 과정에서 W3C는 HTML의 Version up을 중단하고 XHTML로 개발 방향 변경함.
    - XHTML 2.0은 하위호환성을 고려하진 않는 새로운 언어로 디자인
    - 이상과 현실의 차이로 인해 XHTML은 브라우저들에게서 외면
    - => WHATWG라는 working group이 개발현실을 반영하면서도 하위버전 HTML과도 호환되는 발전된 HTML을 정의하기 시작함.
- 2009년 10월 W3C도 WHATWG를 인정하고 HTML5라는 이름으로 새로운 HTML을 디자인

## HTML5의 디자인 원칙
- 호환성
    + 컨텐츠의 호환성
    + 이전 브라우저와의 호환성
    + 기능의 재사용
    + 이용 방법의 호환성
    + 혁신보다는 발전을 우선함
- 실용성
- 상호 운영성
- 보편적 접근성

## HTML4 vs HTML5
- HTML5이전
    + 블록레벨 element와 inline element로 구분되어지는 태그들로 표현함
    + 이러한 태그들은 tree형태의 계층구조를 이루어 문서의 outline을 구성하고 contents에 접근가능
+ HTML5
    + `Contents Model`이라는 새로운 개념 추가
        * 문서의 아웃라인을 잡고 contents를 구성
        * <header>, <footer>, <article>
- DOCTYPE
    + `<!DOCTYPE HTML>`
- Encoding
    + `<meta charset="UTF-8">`
- Root Element
    + `<html lang="ko">`


## Refer
http://direct.co.kr/cs/HTML5.pdf
[HTML5 오픈 레퍼런스 eBook](http://www.clearboth.org/html5ref_ebook/)
