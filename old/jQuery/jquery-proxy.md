# jQuery Proxy
jQuery의 네임스페이스를 관리할 수 있게 해준다.
```javascript
var app = {
    config: {
        clickMsg: "hi"
    },
    clickHandler: function() {
        alert(this.config.clickMsg);
    }
}

app.clickHandler(); //Hi가 잘 나온다.
$('a').bind('click', app.clickHandler);
//이렇게 바인딩된 메서드는 정상작동x. this가 재정의되기 때문.

$('a').bind('click', $.proxy(app, 'clickHandler'));
//이렇게 하면 된다!
```

```javascript
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>jQuery.proxy demo</title>
  <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
</head>
<body>
 
<p><button type="button" id="test">Test</button></p>
<div id="log"></div>
 
<script>
var me = {
  type: "zombie",
  test: function( event ) {
    // Without proxy, `this` would refer to the event target
    // use event.target to reference that element.
    var element = event.target;
    $( element ).css( "background-color", "red" );
 
    // With proxy, `this` refers to the me object encapsulating
    // this function.
    $( "#log" ).append( "Hello " + this.type + "<br>" );
    $( "#test" ).off( "click", this.test );
  }
};
 
var you = {
  type: "person",
  test: function( event ) {
    $( "#log" ).append( this.type + " " );
  }
};
 
// Execute you.test() in the context of the `you` object
// no matter where it is called
// i.e. the `this` keyword will refer to `you`
var youClick = $.proxy( you.test, you );
 
// attach click handlers to #test
$( "#test" )
  // this === "zombie"; handler unbound after first click
  .on( "click", $.proxy( me.test, me ) )
 
  // this === "person"
  .on( "click", youClick )
 
  // this === "zombie"
  .on( "click", $.proxy( you.test, me ) )
 
  // this === "<button> element"
  .on( "click", you.test );
</script>
 
</body>
</html>
```

## Refer
http://firejune.com/1527/jQuery+1.4+%EB%B2%84%EC%A0%84%EC%97%90+%EC%B6%94%EA%B0%80%EB%90%9C+%EC%83%88+%EA%B8%B0%EB%8A%A5+15%EA%B0%9C
https://api.jquery.com/jQuery.proxy/
