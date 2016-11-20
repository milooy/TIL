# Code School: Digging into Django

## 한 row에 3개 col 들어가는 for loop 만들기
```html
<div class="row">
    {% for treasure in tresures %}
        <div class="col-md-4"></div>
    {% if forloop.counter|divisibleby: 3 %}
        </div><div class="row">
    {% endif %}
    {% endfor %}
</div>
```

- for loop variables
    + forloop.counter: 1부터 시작하는 카운터
    + forloop.counter0: 0부터 시작하는 카운터
    + forloop.first: 첫번째인가? t/f
    + forloop.last: 마지막인가? t/f
- 유용한 장고 필터들
    - value | add: 2
    - name | lower
    - value | add: 2 | divisibleby:3
    - {% for location in locations|dictsort:'name' %} name으로 정렬해줌
