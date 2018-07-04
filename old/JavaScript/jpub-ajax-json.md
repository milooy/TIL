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
        + 3 서버가 요청에 대한 응답을 완료하면 브라우저에선 이벤트가 발생. 
            * 이 이벤트는 데이터를 처리하여 페이지의 일부를 변환하는 js함수를 호출
- ajax를 이용하면 페이지의 일부를 수정하고 싶을 때 어느 특정 요소의 컨텐츠를 업데이트 하면 된다.
    + 그러려면 이벤트를 가로채 서버에 새로운 콘텐츠를 요청하는 비동기 요청 보냄 된다.

## Ajax 요청 및 응답처리
- 브라우저는 XMLHTtpRequest객체르 이용해 Ajax요청을 생성. 
- 서버가 브라우저의 요청에 대해 응답을 전달하면 같은 XMLHTTPRequest객체가 그 결과를 처리함.
```javascript
//요청
var xhr = new XMLHttpRequest(); //new로 생성.
xhr.open('GET', 'data/test.json', true); //open(http메서드, 요청을 처리할 페이지의 url, 요청이 비동기로 처리될 것인지를 지정하는 불리언)
xhr.send('search=arduino'); //준비된 요청을 전달. 괄호 내에 서버에 전달될 추가 정보 전달할 수도 있음.

//응답
xhr.onload = function() { //브라우저가 서버로부터 응답을 받으면 onload이벤트가 발생.
    if(xhr.status == 200) { //xml객체의 status속성값을 검사하고 서버의 응답이 정상인지 확인
        //서버의 실행 결과를 처리할 코드
    }
}
```

## 데이터 타입
- Ajax응답은 주로 HTML, XML, JSON중 한 가지 형식으로 전달된다.
- HTML
    + 웹페이지의 일부를 업데이트하고 싶은 경우 페이지에 데이터를 표현하기 위한 가장 간단한 방법.
    + pros
        * 코드 작성 및 요청 처리하고 응답 표시하기가 간편
        * 서버로부터 전달된 데이터를 곧바로 페이지에 삽입가능. =>브라우저가 별도로 처리할 필요 없다.
    + cons
        * 서버가 반드시 페이지에서 사용할 수 있는 HTML을 리턴해야 함.
        * 웹 브라우저가 아닌 애플리케이션엔 적합 ㄴㄴ => 데이터 이식성이 좋지 않음.
        * 요청이 반드시 같은 도메인으로부터 이루어져야 한다.
            - ajax응답이 html나 xml형식인 경우엔 페이지와 같은 도메인에서 전달된 것들만 허용.
- XML
    + html랑 비슷하지만 태그의 이름이 다르다.
    + 이는 xml이 저장되어있는 데이터를 묘사하기 때문.
    + 문법 또한 HTML에 비해 훨씬 제한적.
    + pros
        * 유연한 데이터 타입 => 복잡한 구조의 데이터도 표현가능
        * 이기종 및 응용프로그램 사이의 데이터교환에 적합
        * HTML과 동일한 DOM메서드들을 통해 처리 가능.
    + cons
        * 태그 때문에 실제 데이터 외에도 추가로 많은 문자 사용 => 실제로 필요한 데이터보다 더 많은 양 대역폭 소비
        * 요청이 반드시 같은 도메인에서 이루어져야함.
        * 결과를 처리하기 위해 많은 양의 코드 작성해야 함.
- JSON
    + JavaScript Object Notation
    + 객체표현식과 유사한 용법을 사용해 데이터 표현.
    + pros
        * 다른 도메인에서도 요청을 보낼 수 있다.
        * HTML, XML보다 강력
        * 주로 js와 함께 사용.
    + cons
        * 문법에 예민. 따옴표 등을 실수하면 파일 전체 처리불가.
        * js이기 때문에 악의적인콘텐츠를 가질 가능성이 있다.
            - =>신뢰할 수 있는 곳에서 생성된 JSON만을 사용해야 한다.

## XML - 확장 가능한 마크업 언어
- html과 비슷하게 생겼지만 태그의 이름이 서로 다름.
- html과 동일한 돔조작 할수있는데, js보단 jquery로 하는게 더 낫다.
- xml파일의 태그는 그들이 가지고 있는 데이터를 설명할 수 있어야 함.
- xml은 모든 플랫폼에서 동작.
- 2000년대 초반에 많이 활용.
```
<?xml version="1.0" encoding="utf-8">
<events>
    <event>
        <location>샌프란시스코</location>
        <date>5/1</date>
    </event>
    <event>
        <location>한국</location>
        <date>5/2</date>
    </event>
</events>
```

## JSON - 자바스크립트 객체 표현식
- 객체 표현식과 거의 똑같이 생겼지만 순수 텍스트임.
- 실제 객체는 네트워크를 통해 전송할 수 없다. 그보다는 브라우저에 의해 객체로 변환될 수 있는 텍스트를 전달하는 것.
- 키는 반드시 작은따옴표 말고 큰따옴표로 둘러싸야한다.
- 값: string, number, Boolean, array, object, null
- js의 JSON객체는 JSON데이터를 js객체로 변환할 수 있다. 
- 또한 js객체를 문자열로 변환하기도 함
- `JSON.stringify()`: js객체를 JSON형식의 문자열로 변환. 이를 이용해 js객체를 브라우저->다른 앱으로 전송가능.
- `JSON.parse()`: JSON객체를 브라우저가 사용가능한 js객체로 변환.
```javascript
{
    "location": "샌프란시스코",
    "date": 5,
    "booking": true 
}

{
    "events": [ //이 배열에 객체 2개 저장.
        {
            "location": "샌프란시스코",
            "date": 5,
            "booking": true 
        },
        {
            "location": "서울",
            "date": 6,
            "booking": false
        }
    ]
}
```

## Ajax로 HTML로드하기
- 서버가 요청에 응답할땐 반드시 상태 메시지를 전달하여 요청이 제대로 처리되었는지를 알려야 한다.
    + 200: 서버가 응답 완료했으며 아무런 문제가 없다
    + 304: 응답 내용이 이전 응답 내용과 동일하다
    + 404: 페이지를 찾을 수 없다.
    + 500: 서버 내부에서 오류가 발생했다
    + 만일 이 코드를 로컬에서 실행하면 서버상태 속성을 받을 수 없을 때문에 이 속성을 검사하는 부분의 코드를 주석처리하고 조건식이 올바르게 실행될 수 있도록 true리턴해야 한다.
```javascript
var xhr = new XMLHttpRequest();
xhr.onload = function() { //응답이 로드되면
    if(xhr.status===200){ //서버 응답이 정상이면
        document.getElementById('content').innerHTML = xhr.responseText;
    }
};
xhr.open('GET', 'data/data.html', true); //요청 준비 - 방법/처리할페이지경로/비동기로할거
xhr.send(null); //요청 전송냐 - 여기서 서버 접속하고 응답 오면 위의 onload가 호출.
```

## Ajax로 XML 로드하기
- 조건식 내부의 응답을 처리하는게 좀 복잡. xml을 html로 변환해야 하기 때문.
- 책 380p 참고

## Ajax로 JSON로드하기
- json은 서버에서 문자열로 전송되어온다.
- 도착하면 이걸 js객체로 변환해야 한다. (역직렬화)
- JSON내장객체의 parse()메서드 사용하면 된다.
- 직렬화: stringify(). 브라우저->서버
```javascript
var xhr = new XMLRequest();
xhr.onload = function() {
    if(xhr.status===200){
        responseObject = JSON.parse(xhr.responseText); //json가져와 js객체로 변경

        var newContent = '';
        for(var i=0; i<responseObject.events.length; i++) {
            newContent += '<div class="event">';
            newContent += '<img src"' + responseObject.events[i].location + '"';
            ...
        }
        document.getElementById('content').innerHTML = newContent;
    }
};
xhr.open('GET', 'data/data.json', true); //요청 준비
xhr.send(null); //요청 전송
```

## 다른 서버로부터의 데이터 다루기
- ajax는 내가 보유한 서버로부터 전달된 데이터는 무리없이 처리가능하지만(보안상의 이유로)
- 다른 도메인으로부터의 ajax응답은 로드할 수 없다.(크로스 도메인 요청)
- 우회방법
    + 웹 서버의 프록시 파일
        * 서버에 원격서버로부터 데이터를 수집하는 파일을 생성(php, node, 루비 등 서버언어 이용해)
        * 그럼 사이트 페이지에서 이 파일에 데이터 요청하면 됨.
        * 이를 프록시(proxy)라고 함.
    + JSONP
        * JSON with Padding
        * 데이터를 로드하는 `<script>`요소를 다른 서버로부터 페이지에 추가.
        * 이 방법이 가능한 이유는 스크립트 태그의 원본 주소에 대한 제약이 존재하지 않기 때문
        * 스크립트는 함수를 호출하며, 함수의 매개변수로는 JSON형식의 데이터가 전달.
            - 이때 호출되는 함수는 페이지에 데이터를 요청하는 페이지에 정의된 것.
            - 페이지를 처리하고 표시하는 역할 담당
        * 대안: JQUERY사용하면 편함.
    + 크로스 오리진 리소스 공유
        * 브라우저는 서버와 통신할 때마다 서로에 대한 정보를 HTTP헤더를 이용해 전달
        * CORS(cross origin resource sharing)은 HTTP헤더에 추가적으로 정보를 추가해 브라우저와 서버가 서로 통신을 해야한다는 사실을 알게한다.
        * 최신버전의 브라우저에만 동작.

## JSONP 동작원리
- parse()메서드나 stringify()메서드를 사용할 필요 없음.
- 데이터가 문자열 아니고 스크립트파일로 바로 전달되어 이미 객체취급 가능.
- 데이터 리턴할때 이를 처리할 함수 이름 지정할 수도 있다.
    + http://example.org/jsonp.php?callback=showEvents
- p.386 참고
```javascript
//브라우저
<script>
function showEvents(data) { //서버가 전송한 JSON데이터를 처리할 함수
    //데이터를 처리하고 페이지에 출력할 코드 작성
}
</script>
<script src="http://example.org/jsonp"></script> //원격서버로부터 json데이터를 요청할 경로

//서버
//서버응답->스크립트는 데이터를처리할 함수(showEvents())를 호출하는 스크립트 전달.
//이 함수 호출이 jsonP의 P다.(padding)
showEvents({
    "events": [
        {
            "location": "샌프란시스코",
            "date": 5,
            "booking": true 
        } ...
    ]
    })
```

## jQuery와 ajax
- jQuery는 서버로부터 리턴된 데이터를 손쉽게 처리할 수 있는 jqXHR객체를 제공함.
- 요청
    + .load(): 요소에 HTML코드를 로드. 데이터를 조회하는 가장 간단한 메서드
    + `$.get(url[, data][, callback][, type])`: HTTP GET메서드를 이용해 데이터를 로드. 서버에 데이터를 요청하기 위해 사용.
    + `$.post(url[, data][, callback][, type])`: HTTP POST로 데이터를 로드. 서버에 저장된 데이터 수정위해 새로운 데이터를 전달할 때 사용.
    + `$.getJSON(url[, data][, callback])`: GET요청 이용해 JSON데이터를 로드한다. 서버가 JSON데이터 리턴할 때 사용.
    + `$.getScript(url[, callback])`: GET요청 이용해 스크립트를 로드하고 실행. js데이터(e.g JSONP)를 로드할 때 사용.
    + `$.ajax()`: 모든 요청 수행가능. 위에 설명한 메서드들은 내부적으로 이 메서드 사용.
    + => url: 데이터 가져올 경로 / data:서버로 전송될 추가정보 / callback: 서버로부터 데이터가 전달되었을 때 호출될 콜백 / type:클라이언트가 원하는 서버의 응답형식
- 응답
    + jqXHR속성
        + rsponseText: 서버로부터 리턴된 텍스트 데이터를 가져옴.
        + responseXML: 서버로부터 리턴된 XML데이터를 가져옴.
        + status: 상태 코드를 가져온다.
        + statusText: 상태 설명 문자열(주로 오류났을때 상세오류내용 가져옴)
    + jqXHR메서드
        * .done(): 요청이 성공적으로 처리되었을 때 실행될 코드
        * .fail(): 요청이 실패했을 때 실행될 코드
        * .always(): 요청의 성공/실패 여부에 관계없이 항상 실행될 코드
        * .abort(): 서버와의 커뮤니케이션을 취소.

## jQuery로 HTML을 페이지에 로드하기
- 가장 간단한 메서드. 
- 서버로부터 HTML을 로드할 때만 사용하지만, 서버가 응답을 제공하면 그 HTML은 jQuery객체집합에 자동으로 적용
```javascript
$('#content').load('jq-ajax3.html #content');
```
- #content를 로드한다 이 url로 #content에만 로드 (페이지 전체가 아닌 일부만 로드하도록 할 수 있다.)
```javascript
$('nav a').on('click', function(e) {
    e.preventDefault(); //새로운 페이지로 이동하는 기본동작 취소
    var url = this.href; //url변수에 로드할 페이지의 url저장

    $('nav a.current').removeClass('current');
    $(this).addClass('current');

    $('#container').remove(); //이전 페이지 컨텐츠 제거
    $('#conent').load(url + ' #content').hide().fadeIn(slow);
    })
```

## jQuery Ajax 데이터 전송하기
```javascript
$('#selector a').on('click', function(e) {
    e.preventDefault(); //링크에 의해 다른 페이지로 이동하지 않도록!
    var queryString = 'vote=' + $(e.target).attr('id'); //e.g. 'vote=grey'
    $.get('votes.php', queryString, function(data) {
        $('#selector').html(data);
    });
});
```

## Ajax로 폼 전송하기
```javascript
$('#reister'.on('submit', function(e) {
    e.preventDefault(); //form전송을 취소
    var details = $('#register').serialize(); //폼 데이터를 수집하고 details로 저장
    $.post('register.php', details, function(data) {
        $('#register').html(data);
    });
});
```

## JSON로드하기 및 Ajax오류 처리하기
- JSON데이터를 로드하려면 현재 페이지를 제공하는 서버와 같은 서버로부터 JSON데이터를 조회하는 $.getJSON()메서드를 사용하면 된다.JSONP는 $.getScript()
```javascript
function loadRates(){
    $.getJSON('data/rates.json') //getJSON하고 바로 체이닝으로 done, fail, always
    .done(function(data){ //데이터를 성공적으로 로드한 경우에만 호출
        var d = new Date();
        ...
        $.each(data, function(key, val){
            msg += '<div class="' + key + ...
        });
        $('#rates').html(msg);
    }).fail(function(){ //데이터 못가져왔을때만 호출
        var msg = '<h2>환율 정보</h2>';
        msg += "로드하지 못했슴다";
        $('#rates').html(msg);
    }).always(function() { //항상 실행.
        var reload = '<a id="refresh" href="#">'; //새로고침 링크 추가
        $('#reload').html(reload);
        $('#refresh').on('click', function(e){ //새로고침 누르면 다시 loadRates실행
            e.preventDefault();
            loadRates();
        });
    });
}
```

## Ajax요청 상세하게 제어하기
```javascript
$('nav a').on('click', function(e){
    e.preventDefault();
    var url = this.href;
    var $content = $('#content');
    ...
    $.ajax({
        type: "POST",
        url: url,
        timeout: 2000,
        beforeSend: function() {
            $content.append('로드 중');
        },
        complete: function() {
            $('#loading').remove();
        },
        success: function() {
            $content.html($(data).find('#container')).hide().fadeIn(400);
        },
        fail: function() {
            $('#panel'). ...
        }
    });
});
