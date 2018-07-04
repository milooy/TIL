# jQuery - return flight

## Ajax Basics
```javascript
$('.confirmation').on('click', 'button', function() {
    $.ajax('http://example.org/confirmation.html', {    //relative url으로 'confirmation.html'만 쓸 수 있다. confirmation Number는 ㅡ이렇게 넘긴다 'confirmation.html?confNum=1234'
        success: function(response) { //runs only when the server returns a succesful responce
            $('.ticket').html(response).slideDown();
        },
        data: {"confNum: 1234"},
        error: function(request, errorType, errorMessage){
            alert('Error: ' + errorType + ' with Message: ' + errorMessage);
        },
        timeout: 3000,
        beforeSend: function() {
            
        }
    });
});

//위의 코드를 $.get으로 줄이기
$.get('confirmation.html', function(response){
    $('.ticket').html(response).slideDown();
});
