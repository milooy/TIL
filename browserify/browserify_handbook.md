 # Browserify Hand book

다음 페이지의 정리

https://github.com/substack/browserify-handbook


## browserify auto-recompile

watchify, beefy, browserify-middleware, enchilada, directly api


`package.json`을 이용해서 build와 watch `scripts` 등록해서 `npm run build`로 사용하기.

[task automation with npm run](http://substack.net/task_automation_with_npm_run)

```js
{
  "build": "browserify browser.js -o static/bundle.js",
  "watch": "watchify browser.js -o static/bundle.js --debug --verbose",
}
```


[beefy](https://www.npmjs.com/package/beefy)를 사용하면 dist/bundle.js를 생성하지 않고도 개발할 수 있을 듯.


```js
var browserify = require('browserify');
var http = require('http');

http.createServer(function (req, res) {
    if (req.url === '/bundle.js') {
        res.setHeader('content-type', 'application/javascript');
        var b = browserify(__dirname + '/main.js').bundle();
        b.on('error', console.error);
        b.pipe(res);
    }
    else res.writeHead(404, 'not found')
});
```

grunt는 플러그인이 있지만, gulp는 직접 짜야함.

[gulp/fast-browserify-builds-with-watchify.md at master · gulpjs/gulp](https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md)


## Builtins

node core lib를 bowser에서 구현함. `events`, `stream`, `url`, `path`, `querystring`이 좀 유용함.

Buffer, process, global, __filename, __dirname를 자동으로 추츨함.



node의 Buffer를 모르겠다. [Buffer Node.js Manual & Documentation](http://nodejs.sideeffect.kr/docs/v0.10.35/api/buffer.html)

## Transform

최대 장점은 `--debug`를 하면 원본 파일로 소스맷을 걸어준다는 사실. (커피스크립트나, typescript로)

transform 파일을 만들면, replace등을 할 수 있다.

transform은 simple stream inteface.  다음을 참조. [substack/stream-handbook](https://github.com/substack/stream-handbook)
