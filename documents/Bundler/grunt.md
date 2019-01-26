# Grunt

## Task Runner
- 자동화를 위해 필요.
- 반복작업 줄여줌
- minification, compilation, unit testing, linting
- 설정 -> Task runner가 작업을 대신함.

## Why grunt?
- 성장중
- grunt와 함께 쓸수있는 수백개의 플러그인으로 효율 up
- 원하는 grunt plugin 없으면 npm으로 직접 제작 배포 쉽게 하셈

## grunt plugins
http://gruntjs.com/plugins
커피스크립트, 제이드, 사스 등등

## getting started
- grunt와 grunt plugin 설치와 관리는 npm통해 한다.

### CLI 설치
- grunt-cli 전역으로 설치 -> grunt커멘드 자동추가

### CLI 동작원리
- grunt 커멘드 치면 
    + grunt-cli가 프로젝트 로컬의 grunt실행(node의 require()사용해서.)

### 이미 존재하는 Grunt Project라면
- 이미 Grunt CLI가 설치되어있고 package.json과 Grunfile을 설정했다면?
    + 루트로 이동
    + npm install
    + grunt

### 새로운 grunt project
- 플젝 새로 시작할땐 보통 밑의 두개가 있어야함
- package.json: 해당 플젝을 npm모듈로 npm에 퍼블리싱할때 사용하는 메타데이터 저장파일

## Making Custom Task

```js
// Gruntfile.js
grunt.loadTasks('path/of/customTasks');

// path/of/customTasks/doSomething.js
module.exports = function(grunt) {
  grunt.registerTask('doSomething', function() {
    // ...
  });
}
```

## 파일 제어 apis

```js
  grunt.file.read();      // return string
  grunt.file.readYAML();  // return object of yaml properties
  grunt.file.readJSON();  // return object of json properties

  // yaml write에는 yamljs module를 사용한다.
```



## Refer
[grunt 공식사이트 번역](http://gruntjs-kr.herokuapp.com/)
