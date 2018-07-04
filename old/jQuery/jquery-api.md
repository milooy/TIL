#api.jquery.com

##Attributes
```javascript
/*addClass()*/
$('p').addClass("lezhin");
$('p').removeClass('lezhin');
$('ul li').addClass(function(index){
    return "item-" + index;
});

/*attr()*/
var title = $("en").attr("title");
$(".lezhin").attr({
    alt: "dot",
    title: "com"
});
$("div").attr("id", function(arr) {
    return "div-id" + arr;
}).each(function() {
    $("span", this).html(this.id); //span상위디브가 this
});

/*hasClass()*/
$("#lezhin").hasClass("foo"); //true or false

/*html()*/
$(".section-title").html(); //return html(string)
$(".title").html('<p>good good</p>');
//html: <div></div>
$( "div" ).html( "<b>Wow!</b> Such excitement..." );
$( "div b" )
  .append( document.createTextNode( "!!!" ) )
  .css( "color", "red" );

/*removeAttr()*/
$(".lezhin").removeAttr("title");
$(".lezhin").removeClass("title");
$(".lezhin").removeProp("title");

/*toggleClass*/
$( "p" ).click(function() {
  $( this ).toggleClass( "highlight" );
});

/*val()*/
//form elements(input, select, textarea등)의 값을 받아오는 것. 
$('#single').val();
$( "button" ).click(function() {
  var text = $( this ).text();
  $( "input" ).val( text );
});
```

## .change()
- .bind('change', handler)를 줄여놓은 것이다.
- element의 값이 변경될 때 발생 
    + 폼 요소(select, checkbox, radio버튼등...): 마우스로 선택하고 상태값을 바꾸는 즉시 이벤트 발생
    + 그 외: 값을 변경하고 포커스를 잃을 때 이벤트 발생
```html
<input class="target" type="text" value="Field 1" />
<select class="target">
    <option value="option1" selected="selected">Option 1</option>
    <option value="option2">Option 2</option>
</select>
```
```javascript
$('.target').change(function() {
  alert('Handler for .change() called.');
});
```
- text 인풋에는 값을 바꾼 후 다른 곳을 클릭하면 알림창이 뜬다. 
- select값을 변경시키면 알림창 뜸.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>change demo</title>
  <style>
  div {
    color: red;
  }
  </style>
  <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
</head>
<body>
 
<select name="sweets" multiple="multiple">
  <option>Chocolate</option>
  <option selected="selected">Candy</option>
  <option>Taffy</option>
  <option selected="selected">Caramel</option>
  <option>Fudge</option>
  <option>Cookie</option>
</select>
<div></div>
 
<script>
$( "select" )
  .change(function () {
    var str = "";
    $( "select option:selected" ).each(function() {
      str += $( this ).text() + " ";
    });
    $( "div" ).text( str );
  })
  .change();
</script>
 
</body>
</html>
```
출처: http://findfun.tistory.com/271
