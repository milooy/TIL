# Chrome Extensions 만들기

## Overview
- HTML, CSS, JS, Images등 필요한 것을 모아놓은 압축된 번들.
- 구글 크롬 브라우저에 기능 추가
- 브라우저가 웹 페이지에 제공하는 모든 API 사용가능. (XMLHttpRequest, JSON, HTML 등...)
- 웹페이지나 서버랑 `content script`나 `cross-origin XMLHttpRequests`로 통신가능.
- 브라우저 기능들이랑 상호작용할 수도 있다(e.g. 북마크, 탭)

## Files
`manifest.json`. 익스텐션의 정보.
```javascript
{
  "name": "My Extension",
  "version": "2.1",
  "description": "Gets information from Google.",
  "icons": { "128": "icon_128.png" },
  "background": {
    "persistent": false,
    "scripts": ["bg.js"]
  },
  "permissions": ["http://*.google.com/", "https://*.google.com/"],
  "browser_action": {
    "default_title": "",
    "default_icon": "icon_19.png",
    "default_popup": "popup.html"
  }
}
```

## Architecture
다수의 extensions들은 `background page`를 가진다. 이는 익스텐션의 메인 로직을 담는 보이지 않는 페이지다.
혹은 익스텐션의 UI를 보여주는 다른 페이지를 가질 수도 있다. 

- Background page
    + `background.html`. 익스텐션을 컨트롤 할 수 있는 js를 넣을 수 있다. 두가지 종류가 있다.
    + 1. persistent background pages: 항상 열려있다.
    + 2. event pages: 필요할 때 열리고 닫힌다. 
- UI pages
    + `tabs.create`이나 `window.open()`으로 다른 HTML파일을 보여줄 수 있다.
    + 익스텐션 내부의 HTML페이지는 다른 DOM들을 완벽히 접근할 수 있다. 
- Content scripts
    + 익스텐션이 웹 페이지랑 인터랙트하기 위해 필요. content script는 loaded page의 일부지, 익스텐션의 일부가 아니다. 
    + 브라우저가 방문한 웹페이지의 디테일 정보를 읽을 수 있다. DOM을 읽을 수 있고 수정도 할 수 있다. 
    + 하지만 부모 익스텐션의 백그라우드 페이지 돔은 수정하지 못한다.

## chrome.* API들 사용하기
- Chrome-only API들을 사용할 수 있다. (e.g. window.open()말고 tabs.create메서드를 사용 가능)
- 보통 비동기다. 끝나기 전까지 기다리지 않음. 결과를 알고싶다면 콜백 함수를 넘겨야 한다. 
    + `chrome.tabs.create(object createProperties, function callback)`
- 동기 메서들은 콜백이 없다. 보통 return type이 있다.
    + `string chrome.runtime.getURL()`

### 예제 - 콜백 사용하기
현재 선택된 탭을 새로운 URL로 가고 싶을 때, 현재 탭의 아이디를 알아내고(`tabs.query`사용), 새로운 URL로 가야할텐데(`tabs.update`사용), 비동기라서 아래 함수는 작동하지 않는다.
```javascript
// 잘못된 코드
var tab = chrome.tabs.query({'active': true}); //WRONG!!!
chrome.tabs.update(tab.id, {url:newUrl});
someOtherFunction();
```

```javascript
// 맞는 코드
chrome.tabs.query({'active': true}, function(tabs) {
  chrome.tabs.update(tabs[0].id, {url: newUrl});
});
someOtherFunction();
```

## 데이터 저장하기
`storage API`나 HTML5 `web storage API`(로컬스토리지 등...)에 데이터를 저장할 수 있다. 혹은 서버에 저장할 수도 있다. 

익명 모드 브라우저로 하면 저장할 수 없다. 고려해야 함.

## Refer
https://developer.chrome.com/extensions/overview
https://developer.chrome.com/extensions/samples#email-this-page-(by-google)
