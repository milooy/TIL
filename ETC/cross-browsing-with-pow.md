## 서론
드디어 크로스 브라우징을 할 때가 되었다.
나는 매우 의욕이 없어지고 집에 가고 싶어지며 기분이 다운되었다.
테스트 폰 / 윈도우 노트북을 구할 생각에 막막해졌으며,
인터넷 익스플로러를 켜서 내 더러운 코드를 돌려 깨지는 것들을 다 디버깅할 생각을 하니 심장이 내려앉았다.

무거운 VMWare를 설치해 나의 청순한 맥에 윈도우를 들여놓기도 싫었고(미안 윈도우)
[Browser Stack](https://www.browserstack.com/)이란 솔루션으로 브라우저 내에서 가상머신을 돌리는 것을 free trial로 24시간만 써볼까 했더니, 그것도 IE 8, 9는 유료 버전만 되는 등 생각처럼 되지 않았다.

그런 절망 속에서 Pow가 나타났다!

## Pow
예전에 로컬 서버를 이름으로 관리해주는 툴인 [pow 사용법 글](https://milooy.wordpress.com/2015/08/23/less-less-error-less-failed-to-execute-send-on-xmlhttprequest%EC%9D%84-anvil%EB%A1%9C-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0/)을 올렸었는데, 그 곳에서 지원해주는 기능이 있다.

예를 들어, pow로 돌린 내 앱 url이 
```
http://pinkfong-china-apps.dev/
```
라면, 원하는 다른 기기를 같은 망에서 접속하고(동일 와이파이를 사용한다던지...)
```
http://pinkfong-china-apps.10.0.12.100.xip.io/
```
란 url로 들어가주면 
<a href="https://milooy.files.wordpress.com/2015/09/s__12828781.jpg"><img src="https://milooy.files.wordpress.com/2015/09/s__12828781.jpg?w=577" alt="S__12828781" width="577" height="1024" class="alignnone size-large wp-image-2260" /></a>

OH            OH
 아름답게 접속 된다
OH            OH

이는 장고나 npm 등등에서도 많이 지원해 주는데, pow를 사용하면 쉽고 엘레강스하게 돌릴 수 있다.

## 결론
1. pow와 anvil은 참 좋다.
2. 두근두근하며 IE와 안드로이드 기본 브라우저에서 돌려보았는데 transition이 되지 않는 것만 빼곤 아름답게 동작해서 한시름 덜었다.
