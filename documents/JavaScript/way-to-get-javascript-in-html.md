# 자바스크립트 선언 방법
```
//1
<script type="text/javascript"> 
//2
<script language="javascript"> 
//3
<script> 
```
셋 다 동작하긴 한다.
- script선언은 브라우저의 기본 설정에 맞추어 동작한다.
- 그런데 안 써도, 혹은 대충 써도 동작하는 이유는 대부분의 브라우저의 script선언의 기본이 js로 파싱하라고 되어있기 때문.
- 명시적으로 쓸 때 가장 적합한 구문은 1번.
- html5부터는 디폴트로 script는 js로 쓰기 때문에 `<script>`만 써도 무방하지만, 하위버전 고려한다면 1처럼 쓴다.

## Refer
http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=qna_html&wr_id=182755
http://stackoverflow.com/questions/4243577/which-is-better-script-type-text-javascript-script-or-script-scr
