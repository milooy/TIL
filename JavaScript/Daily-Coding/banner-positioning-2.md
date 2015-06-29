#일일코딩-메인 프로모션 배너 위치 지정2

## Question
- *외부 라이브러리 사용 금지*
- 0~2 중 무작위로 하나를 선택해 is-double 클래스를 추가하고 wide 이미지를 사용
- 3~5, 6~8, 9~11 중 하나씩을 선택하고 square 이미지를 사용
- 12~14, 15~17 중 하나씩을 선택해 is-half 클래스를 추가하고 wide 이미지를 사용
- 어제 arrange 함수 결과를 data-pos 속성 값으로 사용
- 이미지 경로는 `http://cdn.lezhin.com/comics/:comicId/wide` 또는 `square` 중에 선택해서 사용
- 사용할 데이터는 아래와 같음
```javascript
var comicIds = ['bad_boss', 'sm_tiger', 'she_is_young', 'her_dog', 'ccromance', 'milkpudding', 'woori', 'nanakarou', 'nicetomeetyou', 'leopard', 'moonlight_night', 'revatoon', 'encounter', 'gbpark', 'sinhontto', 'roomshare', '34mujik', 'desertisland'];
```

##최종 결과물 예제
```html
<!DOCTYPE html>
<html>
    <head>
        <title>프로모션 배너 배치 - 일일코딩</title>
        <style>
            body {
                background: #fff;
            }
            #promotion-list {
                background: #ccc;
                height: 200px;
                margin: 100px auto;
                position: relative;
                width: 400px;
            }
            img {
                display: block;
                height: 100px;
                left: 0;
                position: absolute;
                top: 0;
                width: 100px;
            }
            .is-double {
                height: 100px;
                width: 200px;
            }
            .is-half {
                height: 50px;
                width: 100px;
            }
            [data-pos="5"], [data-pos="6"], [data-pos="7"] {
                top: 100px;
            }
            [data-pos="2"], [data-pos="6"] {
                left: 100px;
            }
            [data-pos="3"], [data-pos="7"] {
                left: 200px;
            }
            .is-half:last-child {
                top: 50px;
            }
            .is-half[data-pos="5"]:last-child, .is-half[data-pos="6"]:last-child, .is-half[data-pos="7"]:last-child {
                top: 150px;
            }
        </style>
    </head>
    <body>
        <div id="promotion-list">
            <img class="is-double" src="http://cdn.lezhin.com/comics/bad_boss/images/wide" data-pos="1">
            <img src="http://cdn.lezhin.com/comics/sm_tiger/images/square" data-pos="3">
            <img src="http://cdn.lezhin.com/comics/she_is_young/images/square" data-pos="5">
            <img src="http://cdn.lezhin.com/comics/her_dog/images/square" data-pos="6">
            <img class="is-half" src="http://cdn.lezhin.com/comics/ccromance/images/wide" data-pos="7">
            <img class="is-half" src="http://cdn.lezhin.com/comics/milkpudding/images/wide" data-pos="7">
        </div>
    </body>
</html>
```


## Answer

###jayjin
```html
<!DOCTYPE html>
<html>
    <head>
        <title>프로모션 배너 배치 - 일일코딩</title>
        <style>
            body {
                background: #fff;
            }
            #promotion-list {
                background: #ccc;
                height: 200px;
                margin: 100px auto;
                position: relative;
                width: 400px;
            }
            img {
                display: block;
                height: 100px;
                left: 0;
                position: absolute;
                top: 0;
                width: 100px;
            }
            .is-double {
                height: 100px;
                width: 200px;
            }
            .is-half {
                height: 50px;
                width: 100px;
            }
            [data-pos="5"], [data-pos="6"], [data-pos="7"] {
                top: 100px;
            }
            [data-pos="2"], [data-pos="6"] {
                left: 100px;
            }
            [data-pos="3"], [data-pos="7"] {
                left: 200px;
            }
            .is-half:last-child {
                top: 50px;
            }
            .is-half[data-pos="5"]:last-child, .is-half[data-pos="6"]:last-child, .is-half[data-pos="7"]:last-child {
                top: 150px;
            }
        </style>
    </head>
    <body>
        <div id="promotion-list">
        </div>
    </body>
    <script>
        var comicIds = ['bad_boss', 'sm_tiger', 'she_is_young', 'her_dog', 'ccromance', 'milkpudding', 'woori', 'nanakarou', 'nicetomeetyou', 'leopard', 'moonlight_night', 'revatoon', 'encounter', 'gbpark', 'sinhontto', 'roomshare', '34mujik', 'desertisland'];

        function random(min, max) {
            if (max === undefined) { max = min; min = 0; }
            return Math.floor(Math.random() * (max - min+1)) + min;
        }

        function arrange() {
            var positions = [1, 2, 3, 5, 6, 7];

            var double = [1, 2, 5, 6][random(3)];
            var doubleIndex = positions.indexOf(double);

            positions.splice(doubleIndex, 2);

            var half = positions[random(0, 3)];
            var halfIndex = positions.indexOf(half);
            positions.splice(halfIndex, 1);

            positions.unshift(double);
            positions.push(half);
            return positions;
        }

        function makeTag(comicId, pos, className, size) {
          var img = document.createElement('img');
          img.setAttribute("class", className);
          img.dataset.pos=pos;
          img.src = 'http://cdn.lezhin.com/comics/'+comicId+'/images/'+size;
          document.getElementById('promotion-list').appendChild(img);
      }

      window.onload = function() {
          var posArr = arrange();
          makeTag(comicIds[random(0, 2)], posArr[0], "is-double", "wide");
          makeTag(comicIds[random(3, 5)], posArr[1], "", "square");
          makeTag(comicIds[random(6, 8)], posArr[2], "", "square");
          makeTag(comicIds[random(9, 11)], posArr[3], "", "square");
          makeTag(comicIds[random(12, 14)], posArr[4], "is-half", "wide");
          makeTag(comicIds[random(15, 17)], posArr[4], "is-half", "wide");
      };
  </script>
</html>
```

>feedback: "예상보다 훨 잘했네! 그리고 window.onload는 옛날스펙이니 다른거 써라"

###tobyyun
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>프로모션 배너 배치 - 일일코딩</title>
        <style>
            body {
                background: #fff;
            }
            #promotion-list {
                background: #ccc;
                height: 200px;
                margin: 100px auto;
                position: relative;
                width: 400px;
            }
            img {
                display: block;
                height: 100px;
                left: 0;
                position: absolute;
                top: 0;
                width: 100px;
            }
            .is-double {
                height: 100px;
                width: 200px;
            }
            .is-half {
                height: 50px;
                width: 100px;
            }
            [data-pos="5"], [data-pos="6"], [data-pos="7"] {
                top: 100px;
            }
            [data-pos="2"], [data-pos="6"] {
                left: 100px;
            }
            [data-pos="3"], [data-pos="7"] {
                left: 200px;
            }
            .is-half:last-child {
                top: 50px;
            }
            .is-half[data-pos="5"]:last-child, .is-half[data-pos="6"]:last-child, .is-half[data-pos="7"]:last-child {
                top: 150px;
            }
        </style>
    </head>
    <body>

<div id="promotion-list"></div>

<script id="promotion-template" type="text/x-template">
    <img class="is-double" src="http://cdn.lezhin.com/comics/{{double}}/images/wide" data-pos="{{D}}">
    <img src="http://cdn.lezhin.com/comics/{{square1}}/images/square" data-pos="{{S1}}">
    <img src="http://cdn.lezhin.com/comics/{{square2}}/images/square" data-pos="{{S2}}">
    <img src="http://cdn.lezhin.com/comics/{{square3}}/images/square" data-pos="{{S3}}">
    <img class="is-half" src="http://cdn.lezhin.com/comics/{{half1}}/images/wide" data-pos="{{H}}">
    <img class="is-half" src="http://cdn.lezhin.com/comics/{{half2}}/images/wide" data-pos="{{H}}">
</script>

<script>
function arrange() {
    var positions = [1,2,3,5,6,7];
    var double, half;
    double = random(1,5); // double은 1,2,5,6 4가지 케이스 중 하나임
    if(double > 2) {
        double += 2; // 3,4 인경우 5,6 으로 만들어줌
    }
    positions.splice(positions.indexOf(double),2); // double 이라서 2개 뺌

    half = positions[random(0,4)]; // half 는 남는 4개 셀 중 하나
    positions.splice(positions.indexOf(half),1);

    console.log('double:', double);
    console.log('single:', positions.join(','));
    console.log('half:', half);

    setPromotion(double, half, positions);
}
function random(min, max) {
    if (max === undefined) { max = min; min = 0; }
    return Math.floor(Math.random() * (max - min)) + min;
}
function setPromotion(double, half, positions) {
/*
- 0~2 중 무작위로 하나를 선택해 is-double 클래스를 추가하고 wide 이미지를 사용
- 3~5, 6~8, 9~11 중 하나씩을 선택하고 square 이미지를 사용
- 12~14, 15~17 중 하나씩을 선택해 is-half 클래스를 추가하고 wide 이미지를 사용
- 어제 arrange 함수 결과를 data-pos 속성 값으로 사용
*/
    var comicIds = ['bad_boss', 'sm_tiger', 'she_is_young', 'her_dog', 'ccromance', 'milkpudding', 'woori', 'nanakarou', 'nicetomeetyou', 'leopard', 'moonlight_night', 'revatoon', 'encounter', 'gbpark', 'sinhontto', 'roomshare', '34mujik', 'desertisland'];
    var promotionList = document.getElementById('promotion-list');
    var promotionHtml = document.getElementById('promotion-template').innerHTML;

    promotionHtml = promotionHtml
        .replace("{{double}}", comicIds[random(3)])
        .replace("{{square1}}", comicIds[random(3,6)])
        .replace("{{square2}}", comicIds[random(6,9)])
        .replace("{{square3}}", comicIds[random(9,12)])
        .replace("{{half1}}", comicIds[random(12,15)])
        .replace("{{half2}}", comicIds[random(15,18)])
        .replace("{{D}}", double)
        .replace("{{S1}}", positions[0])
        .replace("{{S2}}", positions[1])
        .replace("{{S3}}", positions[2])
        .replace(/{{H}}/gi, half);

    promotionList.innerHTML = promotionHtml;
}
arrange();
</script>

    </body>
</html>
```
