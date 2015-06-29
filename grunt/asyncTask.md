# building grunt task

비동기 task는 `async()`를 호출하고, 비동기 작업이 모두 끝났을 때 `done()`를 호출해야 한다.

그렇지 않으면 multi Task나, aliase task의 경우 다음 task로 넘어가질 않는다.

```js
function task(grunt) {
  return function() {
    var done = this.async();
    setTimeout(function() {
      if(isFinish){
        done();
      }
    }, 2000);
  }
}
```