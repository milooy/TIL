## nodejs
자바스크립트로 서버 애플리케이션을 구현할 수 있게 해주는 서버 플랫폼.
### 간단한 시나리오
1. 사용자: 조회를 위한 요청을 보냄 -> 서버: 결과를 응답
2. 사용자: 데이터 생성/저장 요청 -> 서버: 데이터 받고 처리
3. 모든 요청이나 응답은 HTTP 프로토콜을 사용.
```javascript
var http = require("http"); //내장되어 있는 http모듈 사용

http.createServer(function(request, response) {//서버 인스턴스 생성:http모듈의 createServer함수 사용
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);
```
- 파일 저장하고 `nodejs server.js`친 다음에 `localhost:8888`들어가보면 "Hello World"
- 서버 인스턴스의 listen()함수는 http서버를 시작하게 하며 여기서 사용자의 요청을 받도록 대기.
- 이 서버는 클라의 요청에 응답하기 위하여 Callback함수가 등록되었고 response객체로 응답하게 됨.

```javascript
var http = require('http');

function onRequest(request, response) {
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.write('Hello World');
    response.end();
}

http.createServer(onRequest).listen(8888);
```
- 위 코드를 `기명 함수`로 변경한 것

```javascript
var http = require('http');

var server = http.createServer();

server.addListener('request', function (request, response) {
    console.log('requested...');
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.write('Hello nodejs');
    response.end();
});

server.addListener('connection', function(socket){
    console.log('connected...');
});
server.listen(8888);
```
- addListener()로 등록

## nodejs on heroku
https://devcenter.heroku.com/articles/deploying-nodejs  
heroku 라는 클라우드 서비스가 있습니다 amazon과 달리 git 명령으로 push해서 배포하는 서비스로, 
node.js 로 서버를 만들수 있습니다.  

mongodb는 직접 heroku에 설치하지 않고,  mongodb를 제공해주는 saas 서비스인 mongolab 에서 db를 free 버전으로 만든다음에 heroku랑 연동을 하면 돈을 들지 않고 여러분만의 간단한 서비스를 만들수 있습니다. -> 부하가 많지 않다는 전제하에. 

https://mongolab.com/
node.js + heroku + mongolab + (웹 페이지가 필요할 경우 jade 추가) 
참고하세요!! 

## zsh bower install에서 command not found나오면?
http://stackoverflow.com/questions/12369390/bower-command-not-found
1시간 삽질
[grunt 버젼](http://stackoverflow.com/questions/18940333/how-to-install-grunt)

## 여러 파일 하나로 합치기
https://www.npmjs.com/package/concat

## reference
[Node.js: Hello로 시작하는 Web 애플리케이션](http://www.nextree.co.kr/p8574/)
[The Node Beginner Book](http://www.nodebeginner.org/index-kr.html)
[making nodepad](http://blog.doortts.com/207)
[AngularJS Tutorial for Beginners With NodeJS ExpressJS and MongoDB (Part I)](AngularJS Tutorial for Beginners With NodeJS ExpressJS and MongoDB (Part I))
[REST API 설계](https://speakerdeck.com/leewin12/rest-api-seolgye)
[MEAN Stack Tutorial](https://thinkster.io/mean-stack-tutorial/)
[MEAN.io](http://mean.io/#!/)
[Mean stack 소개](http://mobicon.tistory.com/384)
[nodejs runtime에서 지켜야할 필수 조건들](http://nodeqa.com/nodejs_ref/65)
[node.js 템플릿엔진 jade](http://blog.outsider.ne.kr/588)
[Jade](https://github.com/jadejs/jade)
[jade 간단예제](http://uiandwe.tistory.com/964)
