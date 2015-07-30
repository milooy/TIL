## 안쓰는 CSS 제거
http://www.labnol.org/internet/remove-unused-css/28635/
https://unused-css.com/
https://github.com/addyosmani/grunt-uncss

## 미디어쿼리에 em 단위를 쓰는 이유
브라우저 zoom 사용 시에도 적절히 반응하게 하기 위해
https://css-tricks.com/zooming-squishes/

작업하다 보면 zoom 사용자에 대한 이슈도 꽤 있는편이라 이런 방법이 있다 정도로 알아두시면 좋을 것 같습니다.

저도 예전에 미디어쿼리에 em을 사용한 소스를 보고 왜 em을 썼을까 생각한 적이 있었는데 이 이슈 때문이었던 것 같네요.

대개 90% 축소 ~ 125% 확대의 범위에서 zoom을 쓰시는 분들이 많지만, 스크린에 아주 가까이 눈을 대고 사용하시는 저시력 장애인들을 생각하면 zoom에 대한 처리도 될 수 있다면 좋겠지요.
