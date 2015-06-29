# 자바스크립트 & 제이쿼리 (jpub) - 8장 Ajax와 JSON

## Ajax
- 언제?
    - 검색어 자동완성
    - 장바구니에 아이템 추가
- 비동기 
    + 동기 처리 모델: 원래 브라우저는 `<script>`태그를 만나면 스크립트를 로드하고 처리하기 전까지 다른 작업은 중단
    + ajax의 비동기 처리 모델(aka non-blocking 처리모델)
        + 1 브라우저는 서버에 데이터 요청
            * 이 요청은 서버가 필요로 하는 정보를 포함하기도 함
            * 브라우저는 ajax요청을 담당하는 XMLHttpRequest라는 객체를 구현하고 있음.
            * 일단 요청을 전송하고 나면, 브라우저는 서버의 응답을 기다리지 않는다. 
        + 2 서버는 응답으로 데이터를 전달
            * 주로 HTML, XML, JSON형식
            * 서버에서 일어나는 일들은 ajax라 부르는 처리과정에 포함X
        + 3 qmfkdnwjsms zhsxpscmfmf cjflgkdu vpdlwldp cnrk
- ajax를 이용하면 페이지의 일부를 수정하고 싶을 때 어느 특정 요소의 컨텐츠를 업데이트 하면 된다.
    + 그러려면 이벤트를 가로채 서버에 새로운 콘텐츠를 요청하는 비동기 요청 보냄 된다.

## Ajax 요청 및 응답처리
```javascript
//요청
var xhr - new XMLHttpRequest();
xhr.open('GET', 'data/test.json', true);
xhr
