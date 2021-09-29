# Amplitude

https://blog.ab180.co/posts/amplitude-101

## 워크샵

- 2012년 설립, 500+명 근무. 포춘 100대기업 중 amplitude고객사비율 20%
- 크게 3축
  - Analytics: PA
  - Recommend엔진, Expirement(A/B테스트)
- 과제
  - https://analytics.amplitude.com/login/my-demo -> 두번째 customer? 로 과제 시작
  - Customer Journey 탐색
  - Conversion Drivers 찾기
  - Retention 분석

## Event segmentation

- User sign up 이벤트, Purchase song or video 이벤트 두개 보면 후자는 주기적으로 주말에 떨어지는걸 볼 수 있다.
  - `인사이트` 주말에 더 푸시를 보내야 하는가?

## Funnel Analysis

- 전환율 보기. 두가지 이벤트에 연결점/관계를 보여줌.
- 21만명 sign up 중 3.9만명이 purchase 했다.
- completed within N days: 전환을 기대하는 기간 수정 가능
- `워크샵`: 유저저니 순서 조정해서 가장 높은 전환율 찾기 - User sign up > Search song > Play song > Download song > Purchase song...
- User sIgnup, Purchase song 두개 이벤트 놓고 두번째 차트에서 오른쪽버튼 > Conversion driver 클릭 (안뜨면 refresh눌러)
  - converted > correlation
    - 'Add content to cart'란 이벤트가 관련성이 높다. 보통 카트에 담고 결제하기 때문이지. 상관관계는 높지만 인사이트는 얻을 수 없음
    - 'Join community', 'share song or video'가 은근 구매에 영향이 있는걸 볼 수 있다. 이건 생각치 못했던 인사이트지.
  - dropped off
    - 이탈에 영향을 준 이벤트
    - 'View ad'가 있는걸 보면 광고를 보여주는게 전환율을 떨어뜨리는데 영향이 있는걸 볼 수 있다.
  - `워크샵` 두가지 이벤트를 보고 전환율에 영향을 미친 특이한 이벤트를 찾아내라
    - e.g. 좋아요를 누르고 구매전환시 프로필 수정의 연관성이 높게 나타남

## Retention analytics

- 1. User sign up 2.Any active event 하면 첫가입 100%대비 다음날이벤트가 29%로 떨어진것을 볼 수 있다.
- 아까 얻은 인사이트 바탕으로 오른쪽탭에서 who performed 'Share song or video' >= 1 time으로 하면 리텐션이 72%로 높아진걸 볼 수 있다
- `워크샵` 임의의 User property를 선택해보고 리텐션이 높은 그룹을 찾아보자
  - e.g. 프로필을 한번 이상 수정한 사람이 한번도 수정하지 않은 사람보다 리텐션이 훨씬 높다
