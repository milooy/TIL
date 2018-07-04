# 자바스크립트 & 제이쿼리 (jpub) - 7장 jQuery 

## 요소 탐색하기
- 계층 탐색
    + ancestor descendant
    + p>c: 다른 요소의 하위 요소들
    + p+n: 직접적인 자식 요소들(모든 자식요소 하고싶다면 p>*)
    + p~s: 이전 요소의 모든 이웃 요소
- 기본 필터
    + :not(selector): 셀렉터에 부합하는 요소를 제외한 나머지 요소들(div:not('#summary'))
    + :first: 선택된 요소 중 첫 번째 요소 
    + :last, even, odd
    + :eq(index): 선택된 요소 중 매개변수로 지정된 인덱스 번호를 가진 요소
    + :gt(index), :lt(index)
    + :header, :animated, :focus
- 콘텐츠 필터
    + :contains('text'): 매개변수로 지정된 텍스트를 가지고 있는 요소들
    + :empty: 자식 요소가 없는 모든 요소들
    + :parent: 위의 반대
    + :has(selector): 선택된 요소 중 매개변수에 지정된 셀렉터에 부합하는 요소를 최소한 하나 이상 가지고 있는 모든 요소 (ex. div:has(p) p요소를 가진 모든 div요소)
- 가시성 필터
    + :hidden: 화면에서 숨겨진 모든 요소들
    + :visible: 페이지의 레이아웃에서 공간을 차지하고 있는 모든 요소들.
- 자식 요소 필터 
    + :nth-child(expr): 1부터 시작하는 해당 순번의 요소(ul li:nth-child(2)는 두번째 요소를 의미)
    + :first-child, :last-child, :only-child
- 특성 필터
    + [attribute]: 지정된 특성 갖고있는 요소들
    + [attribute='value']
    + [attribute!='value']
    + [attribute^='value']: 특성값이 지정된 값으로 시작하는 요소들
    + [attribute$='value']: 특성값이 지정된 값으로 끝나는 요소들
    + [attribute*='value']: 특성값이 지정된 값으로 포함되는 요소들
    + `[attribute][attribute2]`: 지정된 특성 중 하나를 가진 모든 요소들
- 폼
    + :input, :text, :password, :radio...
    + :image, :button
    + :selected: 드롭다운 리스트에서 선택된 모든 요소들
    + :enabled, :disabled, :checked(체크된 요소들을 리턴)

## 선택된 요소에 필요한 작업 수행
- 콘텐츠 필터
    + 가져오기/수정하기
        + .html(): 첫 번째 요소들과 그 하위 노드들의 HTML코드를 얻음.
        + .text(): 객체집합 내 모든 요소의 텍스트와 그 하위 요소들의 텍스트 리턴.(input요소나 textarea요소에서 내용 가져오려면 .val()메서드 사용.)
        + .replaceWith(): 일치하는 모든 요소에 새로운 동일한 콘텐츠 추가하고 교체된 요소들을 모두 리턴
        + .remove(): 일치하는 모든 요소들을 제거
    + 요소
        + .before(): 선택한 요소 전에 
        + .after(): 선택한 요소 다음에 
        + prepend(): 선택한 요소의 여는 태그 다음에
            * a.prepend(b)는 a에 b를 추가한다 / a.prependTo(b)는 b에 a를 추가한다.
        + append(): 선택한 요소의 닫는 태그 다음에
        + remove
        + clone
        + unwrap
        + detach
        + empty
        + add: 매개변수로 지정된 셀렉터에 의해 선택된 요소들을 기존 객체집합에 추가
    + 특성
        * attr
            - 가져오기: $('li#one').attr('id');
            - 수정하기: $('li#one').attr('id', 'hot');
        * removeAttr
        * addClass
        * removeClass
        * css
            - 가져오기: bg = $('li').class('background-color');
            - 증감하기: $('li').class('padding', '+=20');
            - 여러 속성: $('li').css({'color': '#272727', 'font-family': 'Courier'});
    + 폼 값
        * val: input, select, textarea요소에 주로 사용.
        * isNumeric
- 요소 탐색
    + 일반
        * find: 현재 객체집합에서 셀렉터와 일치하는 요소들 리턴
        * closest: 셀렉터와 일치하는 가장 근접한 상위요소(직계부모~최상위요소 모두)를 리턴
        * parent: 현재 객체집합의 직계부모요소 리턴 
        * parents: 모든 부모요소
        * children: 모든 자식 요소
        * siblings: 모든 이웃 요소
        * next: 다음 이웃 요소
        * nextAll
        * prev
        * prevAll
    + 필터/테스트
        * filter: 두 번째 셀렉터를 이용하여 jQuery객체집합을 필터링
        * not
        * has
        * is: 폼요소가 선택 혹은 체크되어있는지 확인 
        * :contains()
    + 객체집합 내 순서 평가
        * eq: 인덱스 번호에 해당하는 요소를 리턴
        * :lt
        * :gt
- 크기/위치
    + 크기
        + height: 영역의 크기
        + with innerHeight(영역의 높이에 안쪽 여백 더한 값) / innerWidth / outerHeight/ outerWidth
        + $(document).height()
        + $(document).width()
        + $(document).height()
        + $(window).height()
        + $(window).width()
    + 위치
        * offset: document객체의 좌측 상단 모서리에서부터 요소까지의 좌표를 가져오거나 지정(offset().top 이런식으로 쓴다)
        * position: 상위 요소 중 기본 흐름 값을 가진 요소로부터 해당 요소까지의 좌표를 가져오거나 지정
        * scrollLeft
        * scrollTop
- 효과/애니메이션
    + 기본
        * show: 선택된 아이템을 보이게 
        * hide: 숨긴다
        * toggle
    + 흐림 효과
        * fadeIn
        * fadeOut
        * fadeTo: 선택된 요소의 불투명도 조절
        * fadeToggle
    + 슬라이딩 효과
        * slideDown
        * slideUp
        * slideToggle
    + 기타
        * delay: 큐 내의 다음 아이템의 실행을 잠시 지연
        * stop: 현재 실행중인 애니메이션 중단
        * animate: 새로운 임의의 애니메이션 생성
- 이벤트
    + 문서/파일 
        * ready
        * laod
    + 사용자 상호작용
        * on
        * (.click(), .hover(), submit()같은 메서드들도 보게 될것인데, 이벤트 처리를 위한 on()메서드가 나타나며 사라짐)

### 효과 예제
```javascript
$('h2').hide().slideDown();
var $li = $('li');
$li.hide().each(function(index) {   //일단 숨기고, 아이템들이 하나씩 나타나기.
    $(this).delay(700*index).fadeIn(700);
});
$li.on('click', function(){
    $(this).fadeOut(700);
});
```

### CSS속성에 애니메이션 적용
- height, width, font-size처럼 값이 숫자로 표현될 수 있는 속성이라면 어떠한 CSS속성이라도 애니메이션에 사용가능.
```javascript
$(this).animate({
    opacity: 0.0,
    paddingLeft: '+=80'
    }, 500, function() {
        $(this).remove(); //애니메이션이 완료되면 콜백함수가 아이템을 제거
});
```
## tips
### 정보
- 획득 
    - jquery객체집합에 둘 이상 요소 저장되어 있으면 ($('li').html();) 첫번째 요소의 정보만 얻어옴.
    - 다른 요소 참조하려면 탐색메서드나 필터 메서드, 혹은 셀렉터 이용. 
    - 모든 요소 콘텐츠 가져오려면 .each()메서드 사용.
- 수정
    + 둘이상 요소 저장되어있고 수정하면 모든 요소 수정됨.

### 변수에 캐싱
- 코드가 동일한 객체집합을 한번 이상 사용할 필요가 있다면 객체에 담아두는게 효과적. 
- $listItems = $('li'); 와 같이 변수에 jQuery객체를 저장할 때 이렇게 하면 다른 변수들과 구분하는데 도움된다.

### 체이닝
- jQuery객체집합을 `수정`하기 위한 대부분의 메서드는 체이닝 가능
- 그러나 DOM/브라우저에서 정보를 `조회`하는 메서드들은 체이닝으로 연결 불가.

### 페이지가 준비되었는지 확인
```javascript
// 이 메서드 내부에 작성하면 코드가 페이지의 다른곳이나 다른 파일에 작성된 경우에도 의도대로 동작한다.
$(document).ready(function() {
    //bla bla
});

// 위 함수의 약식 표현
$(function() {
    //bla bla
});
```
- .load()
    + load이벤트가 발생할 때 호출. 
    + .on()메서드로 대체되었다.
    + 페이지와 나머지 모든 리소스(이미지, CSS, 스크립트)가 로드된 이후에 발생
    + 스크립트가 반드시 로드되어야 하는 리소스에 의존적일 때 사용.
        * ex. 스크립트가 이미지의 크기를 알아야 할 때
- .ready()
    + 페이지가 빨리 로드된 것처럼 보이도록 브라우저에 DOM이 로드되자마자 실행.
    + 그러나 최신 브라우저들에서만 지원.(구버전: laod이벤트 되면 시작)

### 컨텐츠를 수정
현재 선택한 요소들의 콘텐츠를 사용하려는 동시에 수정하려면 함수에 매개변수를 전달하면 된다.
```javascript
$('li.hot').html(function(){
    return '<em>' + $(this).text() + '</em>';
    })
```

### .each()
```javascript
$(function() {
    $('li').each(function() {
        var ids = this.id;  //$(this).attr('id')보다 이게 좋다.
        $(this).append('<span class="order">' + ids + '</span>');
    });
});
```

### this
`$(this)`처럼 this키워드를 이용해 새로운 jQeury 객체집합을 만드는 경우도 볼 수 있는데, 
이렇게 하면 현재 요소에 대해서도 jQuery메서드들을 사용할 수 있다.

### .on()
- 매개변수를 2개 받는다. 첫번째는 대응할 이벤트, 두번째는 함수(기명/익명)
- (*친것들은 onready처럼 작업을 더 쉽게 만들어주는 추가 메서드 제공.)
- focus, blur, change
- input, keydown keyup, keypress
- click, dblclick, mouseup, mousedown, mouseover, mousemove, mouseout, *hover
- submit, select, change
- *ready, load, *unload
- error, resize, scroll
```javascript
//모바일은 마우스오버가 없으니 클릭도 같이 지정.
$listItems.on('mouseover click', functionn(){
    //~~
});
```

### event객체
```javascript
$('li').on('click', function(e) {
    eventType = e.type;
});
```
#### 속성
- type: 이벤트 종류
- which: 눌려진 버튼이나 키
- data
- target: 이벤트가 발생한 DOM요소
- pageX, pageY
- timeStamp
- .preventDefault(): 기본 동작을 취소(ex. 폼 데이터 전송)
- .stopPropagation(): 상위 객체로 이벤트가 버블링되는 것을 중단.

### .animate()
```javascript
.animate({
    //변경할 스타일들 나열
    }, [, speed][, easing][, complete]);
// speed: 진행될 시간의 길이 밀리초단위. low/fast도 가능
// easing: linear(일정속도) / swing(중간은 빨리 처음끝은 느리게)
// complete: 애니메이션이 종료시 호출될 함수(콜백함수)를 지정 위함

$(this).animate({
    opacity: 0.0,
    paddingLeft: '+=80'
    }, 500, function() {
        $(this).remove();
    });

```

### 오타
303p attribute$='value'
322p $('li').clss('~')
322p 'background-color': '#272727',
