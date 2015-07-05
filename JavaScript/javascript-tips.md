#Javascript Tips

##Dom List에서 text만 뽑아내기
html()같은 건 jquery object이기에 그냥 하면 안된다.
```javascript
var comic_title = $('.tt-dataset-comics .tt-suggestion .comic-title');
comic_title.map(function() {return $(this).html()})
```

##Random Number
```javascript
//0~4까지 랜덤넘버
Math.floor(Math.random()*5);
```

## javascript shorthand techniques
http://www.sitepoint.com/shorthand-javascript-techniques/
