# Django + Bower + Grunt

## 상황
재고/창고관리 웹페이지를 만들려고 한다. 
전체적으로 `django`와 `docker`로 돌아가고, 화면은 6개 정도 되는 크지 않은 admin페이지다.
나는 프론트엔드 담당이다.

## 생각하기
앞단을 짜는 것엔 두 가지 방법이 있다. 
1. django템플릿을 써서 서버사이드 렌더링을 한다. 
2. api를 받아와서 ajax로 만든다.

관리자 페이지니 봇이 긁어가야 할 필요도 없고, 이미 api들이 만들어지고 있는 상태라 2번을 사용하기로 했다. 기간이 2주뿐이라 조금이나마 익숙한 angular를 쓰기로 했다(리액트 써보고 싶다 힝).

## 구조 잡기
현재 디렉토리 구조는
- api
    + migrations
    + serializers
    + test
    + views
    + (등등 django REST Framework기반의 api서버이다.)
- conf
    + development
    + production
    + testing
- etc
    + (docker들어가있음)
- stock
    + (django 메인 앱)
    + __init__.py
    + settings.py
    + urls.py
    + wsgi.py
- web
    + (여기다 웹 프론트를 짜면 된다)
- manage.py 등 장고 관련 파일들

로 되어있다. 나는 web에다 프론트를 짜면 된다.
`angularjs`로 `one page web`을 만들 예정이라 루트(/)로 접속했을 때 `web/base.html`로 연결되도록 `stock/urls.py`에 명시해주어야 했다.

## static file 사용하기
### urls.py
```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^$',
        TemplateView.as_view(template_name='base.html'),
        name='main'),
    url(r'^api/', include('api.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```
base.html을 템플릿뷰로 연결해주었다. 하지만 그냥 url만 적어주면 web폴더 내의 base.html은 템플릿파일로 인식을 못하기에 뒤에 static을 연결해준다.

### settings.py
```python
TEMPLATES = [
    {
        ...
        'DIRS': [
            'web'
        ],
        ...
    },
]

...

STATICFILES_DIRS = [
    ("web", os.path.join(BASE_DIR, "web")),
]
```
`settings.py` TEMPLATES내부의 DIRS에 폴더명을 적어준다.
그리고 밑의 `STATICFILES_DIRS`엔 `web`이란 이름으로 `BASE_DIR`랑 `web`폴더를 연결해둔 패스를 지정해준다. 그 후로부턴 저 BASE_DIR/web폴더 내부 staticfile을 사용할 때 앞에 'web'이란 이름을 적어주면 된다.

### web/base.html
```html
{% load staticfiles %}
```
base.html위에 staticfiles를 로드해주고

```html
<link rel="stylesheet" href="{% static 'web/dist/css/base.css' %}">
```
불러올 땐, 폴더를 아까 정해준 이름(web)으로 호출하면 된다.

## 의존성 관리 - Bower
의존성 관리 툴은 bower와 npm을 사용하였다.
최상위 폴더에 bower 설정파일을 만들어준다.
### bower.json
```json
{
  "name": "sandi",
  "dependencies": {
    "admin-lte": "latest",
    "fastclick": "latest"
  }
}
```
이름과 dependencies만 적어주었다.
`admin-lte`라는 admin사이트 만드는 곳에 특화된 부트스트랩 템플릿과, 모바일에서 touch evnet를 도와주는 fastclick을 설치하였다.
콘솔에서 `bower install`하면 이들이 `bower_componenets`폴더 내에 설치된다.
이도 staticfile로 접근해야하니, `settings.py`에 한번 더 명시해준다.

### settings.py
```python
STATICFILES_DIRS = [
    ("components", os.path.join(BASE_DIR, "bower_components")),
    ("web", os.path.join(BASE_DIR, "web")),
]
```
`components`란 이름으로 연결해주었다.

```html
<link rel="stylesheet" href="{% static 'components/admin-lte/bootstrap/css/bootstrap.min.css' %}">
```
이는 아까와 같이 사용할 수 있다(web대신 componenets라고 명시)

## 프론트엔드 태스크 자동화 - grunt
태스크 자동화는 grunt로 하였다. 저번 프로젝트는 gulp로 했었는데, `admin-lte`가 준 grunt파일이 좋아보여 얘로 결정!

### web/package.json
```json
{
  "name": "sandi",
  "version": "0.1.0",
  "repository": {
    "type": "git",
    "url": `https://github.com/haha`
  },
  "devDependencies": {
    "R2": "^1.4.3",
    "grunt": "~0.4.5",
    "grunt-contrib-clean": "^0.6.0",
    "grunt-contrib-csslint": "^0.5.0",
    "grunt-contrib-cssmin": "^0.12.2",
    "grunt-contrib-jshint": "^0.11.2",
    "grunt-contrib-less": "^0.12.0",
    "grunt-contrib-uglify": "^0.7.0",
    "grunt-contrib-watch": "~0.6.1",
    "grunt-cssjanus": "^0.2.4",
    "grunt-image": "^1.0.5",
  }
}
```
npm 설정파일을 만들어 필요한 grunt파일들을 넣어준다.

### web/Gruntfile.js
```javascript
module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    watch: {
      files: ["static/less/*.less", "build/less/skins/*.less", "static/js/app.js"],
      tasks: ["less", "uglify"]
    },
    /* LESS Compile */
    less: {
      development: {
        options: {
          compress: false
        },
        files: {
          "dist/css/base.css": "static/less/base.less",
        }
      },
      production: {
        options: {
          compress: true
        },
        files: {
          "dist/css/base.css": "static/less/base.less",
        }
      }
    },
    /* Javascript Uglify */
    uglify: {
      options: {
        mangle: true,
        preserveComments: 'some'
      },
      my_target: {
        files: {
          'dist/js/app.js': ['static/js/app.js']
        }
      }
    },
    /* Image Compression */
    image: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'static/img/',
          src: ['**/*.{png,jpg,gif,svg,jpeg}'],
          dest: 'dist/img/'
        }]
      }
    },

    // Validate JS code
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      core: {
        src: 'static/js/app.js'
      }
    },

    csslint: {
      options: {
        csslintrc: 'static/less/.csslintrc'
      },
      dist: [
        'dist/css/base.css',
      ]
    },

    /* Compression 전 이미지 삭제 */
    clean: {
      build: ["static/img/*"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-image');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-csslint');

  grunt.registerTask('default', ['watch']);
};
```
`web/static`폴더에 less, js, img를 넣고,
grunt를 돌리면 `web/dist`폴더 minify되고 컴파일되고 compression된 css, js, img가 들어가도록 해두었다.(+ validation)

### gitignore
```
dist

### Frontend ###
node_modules
bower_components
```
`distribution`에서 사용하는 `dist`폴더와,
`npm`으로 설치한 `node_modules`와 `bower`로 설치한 `bower_components`는 git에서 제외시켜뒀다.
이로서 깨끗한 깃헙이 되었다!!! >.<

## 돌리자!
다른 개발자들을 위해 README.md에 써준다.
```
bower install
cd web
npm install
grunt
```

