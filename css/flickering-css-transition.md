# flickering CSS Transition in safari(webkit browser)
## Problem
앱 다운로드 드롭다운같은 메뉴를 만들려고 ul li요소에 CSS transition을 먹인 애니메이션 요소를 만들었는데
크롬에선 잘 나오는 반면 safari에서는 mouse hover시 불규칙적으로 깜빡거리며 잘 안보이는 것이었다. 

## Solution
`css hover safari not working`라는 키워드로 검색을 해봤더니 나랑 같은 증상(safari에서 flickering)으로 고생하는 사람들이 많았다. 
해결책은
1. `-webkit-transform: translate3d(0,0,0)`를 깜빡이는 요소에 집어넣어
2. `-webkit-backface-visibility: hidden;`를 넣어라
등등이 있었는데, 나는 모두 되지 않았고, stackoverflow에서 아무도 추천하지 않았던 답변인
3. transition을 all말고 특정지어서 해보세요^^
에서 걸렸다. 후...

## Conclusion
1. 위의 방법들을 해보셔요.
2. `transition: opacity .3s;`처럼 all말고 필요한 것만 특정지어보셔요.

## Refer
https://nathanhoad.net/how-to-stop-css-animation-flicker-in-webkit
http://www.bluepiccadilly.com/2012/01/prevent-flickering-css-transitions-and-transforms-webkit
http://stackoverflow.com/questions/2946748/iphone-webkit-css-animations-cause-flicker
