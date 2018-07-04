## 서버 시작하기
```
ci.balbum.net
dev.balbum.net
www.balbum.net (default)
도메인연결에 문제가 있으므로 지금은 host 각자 등록해서 쓰기

vi /etc/hosts
125.209.198.149 ci.balbum.net
125.209.198.149 dev.balbum.net
125.209.198.149 www.balbum.net
일단 dev에 api-server 배포

git 에서 소스 파일 받기

git clone https://github.com/NHNNEXT/2015-03-REAL-BNB
git pull https://github.com/NHNNEXT/2015-03-REAL-BNB
git checkout dev
war 압축 파일 만들기

mvn clean package
mvn package -DskipTests
tomcat 위치로 보내기

cd apache-tomcat-8.0/webapps
mv ROOT ROOT.bak
mv /(git)/apiserver/target/bnb-0.0.1-SNAPSHOT webapps/ROOT
tomcat 실행

./bin/shutdown.sh
./bin/startup.sh
```

## TODO
- gulp
- yeoman: 파일구조 잡아줌
- sass / less
- bower: 각종 라이브러리 다운

## Gulp
### gulp 설치
```shell
# package.json 생성(처음 한번)
$ npm init 
# gulp다운 (전역으로 되어있으면 됨.)
$ npm install gulp -g
```

## 서버 API
```
http://dev.balbum.net/api/card
```

## useful
- [vertical timeline template](https://codyhouse.co/gem/vertical-timeline/)
- [css login form](http://bashooka.com/coding/interesting-css-login-form-designs/)
- [landing page](http://bashooka.com/html/best-landing-page-design-templates/)
- [material design icon](https://www.google.com/design/icons/)
- [semantic ui](http://semantic-ui.com/)
- [semantic이랑 react같이쓰기 ](http://mobicon.tistory.com/471)
- [bootsnipp timeline bar](http://bootsnipp.com/search?q=timeline&page=3)
    + http://bootsnipp.com/snippets/3qr0q
    + http://bootsnipp.com/snippets/featured/timeline-with-images-and-tooltip
    + http://bootsnipp.com/snippets/yBo8
- [dropzone 이미지 업로더 npm](https://www.npmjs.com/package/dropzone)
- [dropzone 이미지 업로더 홈피](http://www.dropzonejs.com/)
- 모달
    + [모달 인 모달](http://foundation.zurb.com/sites/docs/v/5.5.3/components/reveal.html)
    + [모달 ajax처리, full width 모달](http://jschr.github.io/bootstrap-modal/bs3.html)
    + [uikit dialog 모달](http://getuikit.com/docs/modal.html)
    + [signup signin 모달](https://codyhouse.co/gem/loginsignup-modal-window/)
    + [step by step modal with bootstrap](http://www.jqueryscript.net/other/Create-Step-By-Step-Modal-with-jQuery-Bootstrap.html)
    + [jquery bootstrap modal step](https://github.com/orige/jquery-bootstrap-modal-steps)
