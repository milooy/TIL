# Geckoboard Guide

## 개코보드가 무엇인가
https://www.geckoboard.com/
위젯들을 띄워놓은 보드이다. Google Analytics나 Adsense, GitHub, facebook, twitter등의 데이터를 모아 시각화해 위젯으로 만들 수 있다.


## 개코보드에서 GA 사용하기
GA위젯을 추가하면 된다.
[이곳](https://www.geckoboard.com/learn/help-and-support/how-to-guides/google-analytics-and-filters/#.VNmuEVOsXZY)을 보면 개코보드에서 GA를 쓰는법이랑 필터 적용하는 방법이 있다.
필터는 [이곳](https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=event_tracking)을 참조해 만든다.
예를 들어 'promotion'이란 카테고리를 지정한 이벤트 발발횟수만 알고싶다면 filter를
```
ga:eventCategory==promotion
```
라 적어주면 된다.


## 커스텀 위젯 만들기
Json이나 XML형식으로 만들어 포맷에 맞추어 쏴주면 된다. 
[이곳](https://developer.geckoboard.com/#introduction)에 자세하게 나와있다.
