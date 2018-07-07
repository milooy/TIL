## Intro
CSS 속성은 보통 편한대로 적을 수 있다. 왜냐하면 -속성이 겹치면 뒤에 있는 것이 적용-된다는 것 말고는 딱히 규칙이 없으니.
그래서 다른 사람이 작성해 둔 CSS Stylesheet를 보면 속성을 찾느라 시간이 소모되곤 한다. 

지금 개발하고 있는 프로젝트엔 CSS가 꽤 많이 들어가서 아무리 LESS를 써도 더럽고 보기 불편하여 CSS 순서 코딩 컨벤션이 있나 찾아보았다.

## Mozilla
> 모질라에서 제안한 CSS속성 기술 순서

1. display `--객체의 노출여부/표현방식--`
2. list-style
3. position `--위치/좌표--`
4. float
5. clear
6. width / height `--크기/여백--`
7. padding / margin
8. border / background `--윤곽/배경--`
9. color / font `--글자/정렬--`
10. text-decoration
11. text-align / vertical-align
12. white-space
13. other text
14. content `--내용--`

`위치 선정 > 윤곽 > 외곽 디테일링 > 채색 > 타이포그래피`
와 같이 밖에서부터 안쪽으로의 흐름이다.

## Naver
1. display(표시)
2. overflow(넘침)
3. float(흐름)
4. position(위치)
5. width/height(크기)
6. padding/margin(간격)
7. border(테두리)
8. background(배경)
9. color/font(글꼴)
10. animation
11. 기타
[출처: NHN 마크업 코딩 컨벤션](http://jsunnylab.tistory.com/32)

## Refer
http://beautifulcss.com/archives/203
http://jsunnylab.tistory.com/32
