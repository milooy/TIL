## jQuery Plugin 만들기
```javascript
(function($){

    // return : return 문을 사용하게 되면 이 플러그인을 다른 jQuery 메소드와 함께 자유롭게 체이닝을 사용할 수 있다.
    return this.each(function(){  // this 키워드 : jQuery 객체 자체를 나타낸다.

        var $el = $(this);  // each 내부에서 사용되는 this는 DOM요소를 차례로 가리킨다.

    });

})(jQuery) // 네임스페이스 보호
```
`jQuery.fn`은 `jQuery.prototype`의 간결 버전. jQuery 객체의 prototype 프로퍼티에 새로운 메서드로 추가됨.

플러그인 설계시 주의할 점은 이게 0개 혹은 다수의 요소와 매칭될 수 있는 걸 감안해야 함.
(한 페이지에 플러그인을 여러 개 썼는데, 하나만 실행되고 나머지는 실행되지 않거나, 모두 같은 모션으로 동작해버리거나...)
=> 이를 해결(요소 개수와 관계 없이 모두 적용)하는 방법: `.each()`

## 플러그인에 defaults, options 값 지정
```javascript
(function($){

    $.fn.myMethod = function(opts){

        return this.each(function(){

            var options = $.extend({}, $.fn.myMethod.defaults, opts || {});
            // $.extend() 를 공부한 것을 상기시켜보자.
            // 첫번째 인자값이 {} 빈 객체이므로 defaults 객체의 멤버와 opts(사용자정의 옵션값)이 merge되어 options에 담겨진다.

            var $el = $(this);
            // 플러그인 코드 작성

        });

    };

    // 기본값을 변경할 수 있게 하려면 다음과 같이 기본값에 대한 정의를 플러그인 메소드 밖에서 작성하여
    // 플러그인 밖에서도 접근할 수 있는 곳에 위치시켜야 한다.
    $.fn.myMethod.defaults = {
        active : 'on',
        selector : 'a',
        counter : 1
    }

})(jQuery);

$(function(){

    // 플러그인의 defaults 값을 외부에서 변경할 수 있다.
    $.fn.myMethod.defaults.active = 'current';

    // 사용자 정의의 옵션값을 정의하여 플러그인 메소드를 호출한다.
    $('h1').myMethod({
        selector : 'span',
        counter : 2
    })
});
```

## Refer
http://e-rooms.tistory.com/entry/jQuery%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8-%EA%B0%9C%EB%B0%9C-%EB%B0%8F-extend
https://learn.jquery.com/plugins/basic-plugin-creation/
