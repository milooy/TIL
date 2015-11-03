# div보다 작은 border만들기
```css
div {
  width   : 200px;
  height  : 50px;   
  position: relative;
  z-index : 1;
}

div:before {
  content : "";
  position: absolute;
  left    : 0;
  bottom  : 0;
  height  : 1px;
  width   : 50%;  /* or 100px */
  border-bottom:1px solid magenta;
}
```
pseudo 클래스로 넣어주면 된다.

## refer
http://stackoverflow.com/questions/8572952/border-length-smaller-than-div-width
