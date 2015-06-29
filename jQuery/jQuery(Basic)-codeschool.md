# Try jQuery

## Traversing the DOM
```javascript
//Searching the DOM
$(".promo, #france");   //Selecting multiple elements
$("#destinations li:last");
$("#destinations li:odd");  //index가 0부터 시작하고, 홀수만! <->even
//Traversing the DOM <<빠르다
$("#destinations").find("li"); //하위 li들 찾기
$("li").first();
$("li").first().next().prev(); //제자리~
$("li").first().parent();
$("destinations").children("li");   //find와는 달리 direct children만 셀렉트
```

## Working with the DOM
```javascript
//Manipulating the DOM
.append(<element>);     //last child에 붙여짐
.prepend(<element>);    //first child에 붙여짐
.after(<element>);      //밑에 불여짐
.before(<element>);     //위에 붙여짐

.appendTo(<element>);
.prependTo(<element>);
.insertAfter(<element>);
.insertBefore(<element>);

$(document).ready(function() {
    var price = $('<p>From 399</p>');
    price.appendTo($('.vacation'));
});

$('button').on('click', function() {
    var price = $('<p>From 399</p>');
    $(this).closeset('.vacation').append(price);    //find ancester. 하나만 반환. 
    $(this).remove();   //그냥 this.remove()하면 안된다!
});

//Traversing and Filtering
<li class="vacation" data-price="300">  //이런 데이터 프로퍼티는
.data(<name>)   //으로 뽑아낼 수 있다.

$('.vacation button').on('click', function() {}); //이거는
$('.vacation').on('click', 'button', function() {}); //이렇게 쓸 수 있다. 

$('.vacation').filter('.onsale').addClass('highlighted');
```

## On DOM Load
```html
<li class="confirmation">
    ...
    <button>FLIGHT DETAILS</button>
    <ul class="ticket">...</ul>
</li>
```
```javascript
$('.confirmation').on('click', 'button', function() {
    $(this).closest('.confirmation').find('.ticket').slideDown();
}); //slideDown(), slideUp(), slideToggle()
```

## Link Layover
```javascript
//fadeIn(), .fadeOut(), .fadeToggle()
$('.vacation').on('click', '.expand', function(event){
    event.stopPropagation();    //이벤트 버블링 막기. 이거 해도 안된당!
    event.preventDefault();    //이벤트 버블링 되지만 브라우저가 이건 handle하지 않는다.
    $(this).closest('.vacation').find('.comments').fadeToggle();
});
```

## Taming CSS
```javascript
$(this).css({'color':'white',
             'border-color': 'red' });
.css('display', 'block'); //이건 .show(), .hide()랑 똑같다.

//위 코드가 더러워보인다면
/*css: .highlighted { color: white; border-color:red }*/
$(this).addClass('highlighted');
```

## Animation
```javascript
$(this).animate({'top':'-10px'});

if($(this).hasClass('highlighted')) {
    $(this).animate({'top':'-10px'}, 'fast');
} else {
    $(this).animate({'top':'0px'}, 600);
}
