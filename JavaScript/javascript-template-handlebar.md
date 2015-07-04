# Javascript Template - Handlebar.js
## Handlebar
- Mustache계열 템플릿
- 사용할 수 있는 제어가 매우 한정적
- template 레이아웃 기능 지원
- helper라는 기능으로 여러가지 커스터마이징 제공

## 간단한 How to
1. `handlebar.js`와 `jquery`를 html에 추가한다.
2. html에 원하는 템플릿을 id와 함께 추가한다.(handlebar.js 밑에)
```html
<script id="todo-template" type="text/x-handlebars-template">
    <li class="{}">
        <div class="view">
            <input class="toggle" type="checkbox" {}>
            <label>{{todo}}</label>
            <button class="destroy"></button>
        </div>
    </li>
</script>
```
3. javascript에 코드를 써준다.
```javascript
var source   = $("#todo-template").html();
var template = Handlebars.compile(source);
var data = { todo : $('#new-todo').val()};
$("#todo-list").append(template(data));
```


## Refer
[javascript micro templating](http://ejohn.org/blog/javascript-micro-templating/)
[handlebar js](http://handlebarsjs.com/)
[handlebar 간단한 사용법](http://mobicon.tistory.com/242)
[handlebar js tutorial](http://javascriptissexy.com/handlebars-js-tutorial-learn-everything-about-handlebars-js-javascript-templating/)
[Javascript Template 사용 가이드](http://code.tutsplus.com/tutorials/best-practices-when-working-with-javascript-templates--net-28364)
