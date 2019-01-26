# Youtube thumbnail 가져오기 

## 개요
한 화면에 유튜브 이미지+링크를 많이 모아놓은 사이트를 개발하고 있는데,  이를 모두 iframe으로 embed하는 것은 낭비이기에 thumbnail만 가져오는 방법을 찾아보았다.

## 썸네일 가져오기
```html
<img src="http://img.youtube.com/vi/JnxwbY07jmY/0.jpg"/>
```
일단 이렇게 하면 썸네일이 나온다.
하지만 이런 식으로 6:4비율로 검정 background가 포함되어 나온다.
<img src="http://img.youtube.com/vi/JnxwbY07jmY/0.jpg"/>

## 썸네일 크롭하기
<a href="http://www.nelsdrums.com/inspiration/tips/cropping-youtube-thumbnails-using-css">이 링크</a>를 보고 따라했다.
```html
<div class="crop"><a href="#" title=""><img src="http://img.youtube.com/vi/JnxwbY07jmY/0.jpg"/></a></div>
```
```css
div.video {
        width: 100%;
        img{
            border:none;
            height:200px;
        }
        .crop{
            float:left;
            margin:.5em 10px .5em 0;
            overflow:hidden;  this is important
            border:0px solid #ccc;
            }
        /* input values to crop the image */
        .crop img{
            margin:-25px -0px -25px 0px;
        }
    }
```
img를 crop으로 감싸 요리 죠리 이동하고 자르는 방법이다.
하지만 예쁘고 깔끔하지 못해서 조금 더 찾아봤다.

## 그냥 16:9로 가져오기
```html
<img src="http://img.youtube.com/vi/<insert-youtube-video-id-here>/mqdefault.jpg">
<img src=http://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg>
```
그냥 이렇게 하면 된다...
이 <a href="http://stackoverflow.com/questions/13220715/removing-black-borders-43-on-youtube-thumbnails">스택오버플로우</a>를 참고하였다.
위는 320x180, 아래는 (가능하면)1500x900를 준다.
<img src="http://img.youtube.com/vi/JnxwbY07jmY/mqdefault.jpg">
<img src=http://img.youtube.com/vi/JnxwbY07jmY/maxresdefault.jpg>
이런식으로.
