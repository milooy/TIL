#Google Tag Manager
(2.0 beta ver.) https://tagmanager.google.com/#/home
(기존 ver.) https://www.google.com/tagmanager/

##무엇인가?
만든 목적: 사용자의 Custom HTML 태그 사용을 줄이기
- 사이트 코드를 수정하지 않고도 구글 외부의 태그를 추가 및 업데이트 할 수 있다.
    + =>오류를 줄일 수 있고, 웹마스터에게 요청하지 않아도 되며, 사이트에 태그를 빠르게 삽입 가능 
- 태그
    + Google과 같은 제3자에게 정보를 전송하는 자바스크립트 코드.
    + GTM같은걸 사용하지 않으면 이런걸 사이트의 소스코드에 직접 추가해야 한다.
    + GTM의 인터페이스에서 실행하려는 태그와 실행을 원하는 시점을 지정하면 됨.
- 러닝커브가 좀 있습니다 ^^ 

##설치방법
http://mindthelog.com/2015/02/%EA%B5%AC%EA%B8%80-%ED%83%9C%EA%B7%B8%EB%A7%A4%EB%8B%88%EC%A0%80/
1. <body>시작하는 태그 바로 뒤에 스니펫을 붙여넣는다.
2. home > 새태그 > Google Analytics > Universal Analytics > 태그이름설정 > 추적아이디입력([도움](https://support.google.com/tagmanager/answer/3281379?hl=en)) > 페이지뷰 > 모든페이지 > 완료
3. 태그가 추가되면, 컨테이너 버전을 새로 만들어서 저장(우측상단) (게시까지 하지 않으면 계속 오류나니까 주의!)

##Trigger Guide
- How tags are fired(and blocked)
- 예전버전에선 rules라고 했다.
- Click, Link click, form submit, error, history event, timer 이벤트들을 specify한다.
- 이 트리거를 만들면, GTM이 자동으로 그 이벤트들을 listening한다.
- All pages는 전체에서, Some pages는 특정 조건에서 트리거된다.
- filter를 추가할수 있다. (ex. Session alive equals true, Page path matches RegEx ^/contacts-us/$)

##Variable Guide
- {{varible name}} 이렇게 쓴다.
- tip: GA Tracking Code도 저장해두면 좋다.
    -변수> 사용자 정의 변수 새로 만들기> 유형:상수> 값: UA-3108...-2
- 변수 이름 바꾸면 reference하고있는것들도 자동업데이트 된다.

###Pages
- **Page URL** – 주소 반환 (http://www.simoahava.com/article?parameter=true#anchor)
- **Page Hostname** – 호스트네임 반환 (www.simoahava.com)
- **Page Path** – 패스 반환 (/article)
- **Referrer** – returns a string containing the URL of the page which brought the visitor to the current page (http://www.simoahava.com/home/), from document.referrer

####Utilities

- **Event** – returns a string containing the value stored in the ‘event’ dataLayer key
- **Container ID** – 컨테이너 아이디 반환 (GTM-XXXXXX)
- **Container Version** – 컨테이너 버젼 반환
- **Random Number** – 0 에서 2147483647까지 랜덤넘버

####Errors
- **Error Message**- JavaScript Error Trigger로 나온 에러메세지
- **Error Line** – 에러난 라인넘버
- **Error URL** – 에러난 스크립트 url
- **Debug Mode** – 유저가 GTM Debug mode에 있는지 Boolean리턴

####Clicks
- **Click Element** – returns an HTML element that was the target of an auto-event action; this object is retrieved from the gtm.element key in dataLayer
- **Click Classes** – returns a string contained in the className attribute value of the auto-event element
- **Click ID** – returns a string contained in the id attribute value of the auto-event element
- **Click Target** – returns a string contained in the target attribute value of the auto-event element
- **Click URL** – returns a string contained in the href or action attribute value of the auto-event element
- **Click Text** – returns a string contained in the textContent / innerText attribute value of the auto-event element

####Forms
These are exactly the same as the Click Variables. I’m not sure why we need two sets of variables, when one generic “Auto-Event” type would suffice.

####History
- **New History Fragment** – returns a string containing the new URL fragment after a page history change auto-event action is registered
- **Old History Fragment** – returns a string containing the previous URL fragment
- **New History State** – returns an object containing the new history state after a pushState() has been registered
- **Old History State** – returns an object containing the old history state
- **History Source** – returns a string describing the event that initiated the history change (e.g. popstate or pushState)

##Tips
- 맨 처음에 **게시**를 하지 않으면 스니펫을 추가하여도 계속 404에러가 난다.
- 변수 탭에서 원하는 것들을 클릭해두지 않으면 안보여서 당황할 수도 있다.
- jquery쓰는법: $대신 jQuery('.top')이런식으로 쓴다.
    + 자바스크립트: return {{Click Element}}.parentElement.parentElement.parentElement.getAttribute(‘id’); 
    + 제이쿼리: return jQuery({{Click Element}}).closest('div').attr('id');

##Youtube Video
[Google Tag Manager: Key Concepts](http://youtu.be/7FXbsCWsEi8)
<iframe width="560" height="315" src="https://www.youtube.com/embed/7FXbsCWsEi8" frameborder="0" allowfullscreen></iframe>
[Event Tracking in Google Analytics Universal through Google Tag Manager](http://youtu.be/-H_TikHFfso)
<iframe width="560" height="315" src="https://www.youtube.com/embed/-H_TikHFfso" frameborder="0" allowfullscreen></iframe>
[Auto Event Tracking in the new version of Google Tag Manager](http://youtu.be/dArRMR1YuCY)
<iframe width="560" height="315" src="https://www.youtube.com/embed/dArRMR1YuCY" frameborder="0" allowfullscreen></iframe>

## Tagmanager CSS Selector
http://www.simoahava.com/analytics/matches-css-selector-operator-in-gtm-triggers/

## Load order of GTM events
`…gtm.js… > …gtm.dom… > …gtm.load`

If you want your tags to fire on the earliest possible moment, use either {{event}} equals gtm.js or {{url}} matches regex .*.

If you want your tags to fire after the DOM has loaded, for example if you know you have important variables processed at the very bottom of your page template, use {{event}} equals gtm.dom.

If you want to wait for the window to load, meaning all initial requests have to be processed first, use {{event}} equals gtm.load.

Note! I strongly recommend against leaving any critical tags to wait for gtm.load, since any hitches or timeouts in loading your page might lead to the tag never firing.

##reference
https://support.google.com/tagmanager/answer/6102821
https://support.google.com/tagmanager/answer/2574305?hl=ko&ref_topic=3441530
http://social-insight.co.kr/?p=842#axzz3SY9JTNFO
http://www.simoahava.com/analytics/trigger-guide-google-tag-manager/
[Auto-Event Tracking In Google Tag Manager](http://www.simoahava.com/analytics/auto-event-tracking-google-tag-manager/)
[Tracking Clicks Using Custom Data Attributes, Google Tag Manager, and Google Analytics](http://www.lunametrics.com/blog/2014/05/08/tracking-clicks-custom-data-attributes-google-tag-manager-google-analytics/)
[Macro Magic For Google Tag Manager](http://www.simoahava.com/analytics/macro-magic-google-tag-manager/)
[Variable Guide For Google Tag Manager](http://www.simoahava.com/analytics/variable-guide-google-tag-manager/)
[Trigger Guide For Google Tag Manager](http://www.simoahava.com/analytics/trigger-guide-google-tag-manager/)
[track banner impressions](http://marketlytics.com/tracking-banner-impressions-using-google-tag-manager-and-universal-analytics/)
[Google Analtyics 삽질냠냠 #2 이벤트, 그리고 Google Tag Manager](https://milooy.wordpress.com/2016/01/14/google-analtyics-2-google-tag-manager/)
