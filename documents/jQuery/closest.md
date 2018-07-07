# .closest()

상위 엘리먼트들을 찾아 올라가는 함수
parent().parent().parent() 대신 .closest()를 사용하면 DOM 구조 변형에 영향받지 않는 코드 작성이 가능함.

적용한 곳 : 홈개편 - home.js
```
$(this).closest('.pagemodule').attr('data-category',category);
$(this).closest('.homelist-category').find('a').removeClass('is-on');
```

[http://api.jquery.com/closest/](http://api.jquery.com/closest/)
