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

## useful
- [vertical timeline template](https://codyhouse.co/gem/vertical-timeline/)
- [ideabox timeline](http://codecanyon.net/item/ideabox-timeline-news-ticker/full_screen_preview/11370199?ref=jqueryrain)
