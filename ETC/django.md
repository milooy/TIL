# django girls
## 웹사이트 동작 방식
- 편지 보내고 받는거랑 비슷
    + 편지(데이터패킷) 보내면 각기 다른 우체국(라우터)를 통해 전달되어 주소지에 최종도착
    + 주소: IP주소
    + 컴퓨터가 DNS(도메인 주소 시스템)가서 djangogirls.org의 IP주소 뭔지 물어본다.
        * 전화번호부에서 이름 찾고 전화번호 알아내는거랑 비슷
    + 규칙을 지켜야 제대로 배달됨
        * 데이터패킷도 규칙 잘 지켜야 웹사이트 볼 수 있다.
            - HTTP(하이퍼텍스트 전송 프로토콜)라는 프로토콜 사용.
        * 서버에서 요청(편지)를 받으면 다시 웹사이트(답장)으로 돌려줌
- 그렇다면 장고는?
    + 답장 보낼 때 받는 사람에 따라 각각 다른 답장 보낼 수 있게 해줌.

## 장고란?
- 웹사이트 만들때 비슷한 유형 요소들 항상 필요하다(회원가입, 로그인, 관리자 패널, 파일 업로드 등등)
- 웹서버: Request가 도착했는지 확인해주는 Port
    + 받은 request를 읽고 웹 페이지와 함께 답장을 준다.
    + 그 request 안의 내용을 만들 수 있는 역할을 한다. 장고가!
- 누군가 서버에 웹사이트를 요청한다!
    + 웹서버에 요청이 오면 장고로 전달
    + 장고는 실제로 어떤 요청이 들어왔는지 확인
        * **urlresolver**: 웹페이지의 주소를 가져와 무엇을 할지 확인
            - 우편배달부
            - 위에서 아래로 그 패턴 확인해봐서 일치하면 그 요청을 관련 함수(view)에 넘겨줌.
    + **view함수**
        * 재밌는 일들 처리
        * 특정 정보를 DB에서 찾을 수 있다.
        * 사용자가 수정 요청 "데이터를 바꿔주세요"
            - view함수: 수정할 수 있는 권한 있는지 확인
            - 수정하고 "완료했다!"라고 답장 준다.
            - 장고가 그 답장을 사용자의 웹브라우저에 보내준다.

## 가상 환경
원하는 디렉토리에서 아래 명령을 치면 myvenv라는 디렉토리 만들어짐.
```shell
python3 -m venv myvenv
```
그리고 그 디렉토리에 우리가 사용할 가상환경이 들어있음.
이렇게 가상환경 실행하면 된다.
```shell
source myvenv/bin/activate
```

## 장고 설치하기
```shell
pip install django==1.8
```

## 장고 프로젝트
- 장고에선 디렉토리나 파일 이름 매우 중요. 이름 변경하거나 옮기면 안됨. 
- 중요한 것들을 찾을 수 있게 특정한 구조를 유지해야 함.

앞에 가상환경이 실행되어있어야 하고, 마지막에 .을 찍는걸 잊지 말자. (.: 현재 디렉토리에 장고를 설치하라고 스크립트에 알려줌)
```shell
(myvenv) ~/djangogirls$ django-admin startproject mysite .
```

django-admin.py는 스크립트로, 디렉토리와 파일을 생성. 스크립트 실행하면 이렇게 새로 만들어진 디렉토리 구조 나온다.
```
djangogirls
├───manage.py
└───mysite
        settings.py
        urls.py
        wsgi.py
        __init__.py
```
- manage.py: 스크립트. 사이트 관리를 도와줌. 이 스크립트로 다른 설치 없이 컴에서 웹서버 시작 가능.
- settings.py: 웹사이트 설정이 있는 파일
- urls.py: 앞에서 설명한 `urlresolver`가 사용하는 패턴 목록을 포함.

## 설정 변경
- settings.py에서
    + `TIME_ZONE = 'Asia/Seoul'`을 고쳐본다!
    + 맨 밑에 `STATIC_ROOT = os.path.join(BASE_DIR, 'static')`를 추가해본다!
        * 정적파일 경로

## 데이터베이스 설정하기
많은 DB소프트웨어 중 sqlite3를 이용. settings.py에 설치되어있음. 장고 기본.
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```

콘솔에서 코드 실행해 블로그에 데이터베이스를 생성한다. 
```shell
python manage.py migrate
```

웹서버를 돌려보자
```shell
python manage.py runserver
```

## Django 모델
- 장고의 모델: 객체의 특별한 종류.
    + 이 모델을 저장하면 그 내용이 데이터베이스에 저장된다!

## 어플리케이션 제작
프로젝트 내부에 별도의 어플리케이션 만들자.
```shell
python manage.py startapp blog
```

그럼 blog디렉토리가 생성된다.
```
djangogirls
├── mysite
|       __init__.py
|       settings.py
|       urls.py
|       wsgi.py
├── manage.py
└── blog
    ├── migrations
    |       __init__.py
    ├── __init__.py
    ├── admin.py
    ├── models.py
    ├── tests.py
    └── views.py
```

- mysite/settings.py
    - 어플리케이션 생성하면 장고에게 이거 사용하라고 알려주는 역할.
    - INSTALLED_APPS밑에 `blog`추가해준다.

## 블로그 글 모델 만들기
`blog/models.py`파일에 선언해 모델 만든다.
```python
#다른 파일에 있는 것을 추가
from django.db import models
from django.utils import timezone

#모델을 정의
class Post(models.Model): #models.Model: Post(클래스첫자는 대문자)가 장고 모델(=객체)임을 나타낸다. 이 코드 덕에 장고는 Post가 DB에 저장된다 알게 됨.
    author = models.ForeignKey('auth.User') #다른 모델에 대한 링크
    title = models.CharField(max_length=200) #글자수가 제한된 텍스트
    text = models.TextField() #글자수에 제한 없는 텍스트
    created_date = models.DateTimeField(
            default=timezone.now) #날짜와 시간
    published_date = models.DateTimeField(
            blank=True, null=True)

    def publish(self): #메서드. 이름은 소문자로 시작.
        self.published_date = timezone.now()
        self.save()

    def __str__(self): #얘를 호출하면 Post모델의 title을 얻음
        return self.title
```
## DB에 모델을 위한 테이블 만들기
장고 모델에 우리가 몇가지 변화 줌을 알려준다.
```
python manage.py makemigrations blog
```

실제 DB에 모델 추가를 반영
```
python manage.py migrate blog
```

## Django 관리자
```python
from django.contrib import admin
from .models import Post #앞에서 만든 Post모델을 가져온다.

admin.site.register(Post) #만든 모델을 관리자 페이지에서 볼려면!
```

서버를 실행하고, `http://127.0.0.1:8000/admin/ `로 들어가면 administration페이지가 나온다. 여기서 superuser를 만들려면 `python manage.py createsuperuser`로 아이디를 생성해준다.

## 배포하기
.gitignore란 파일 만들고 아래 추가
```
*.pyc
__pycache__
myvenv
db.sqlite3
.DS_Store
```

pythonanywhere에 배포하기: bash에 들어가서 아래 코드를 입력한다.
```
git clone https://github.com/milooy/djangogirls-blog-tutorial
```
`tree djangogirls-blog-tutorial`라 치면 구조를 확인할 수 있다.

## PythonAnyware에서 가상환경 생성
bash콘솔에 이렇게 입력
```bash
cd djangogirls-blog-tutorial
virtualenv --python=python3.4 myvenv
source myvenv/bin/activate
pip install django whitenoise
```

## 정적 파일 모으기
- whitenose: `정적 파일`로 불리는 것들을 제공하는 프로그램.
    + 정적 파일: HTML, CSS와 같이 정기적인 수정이 없거나, 프로그래밍 코드를 실행하지 않는 파일.
    + 서버에서 정적 파일은 컴퓨터와 다르게 작동하기 때문에 정적 파일들을 제공하기 위해서 `백색소음`과 같은 프로그램 필요
- 서버 bash 콘솔에 `collectstatic`실행. 
    + 장고가 서버에 있는 모든 정적 파일들을 모으는 것을 지시.
    + 관리자 페이지를 예쁘게 만들어줌

```bash
python manage.py collectstatic
```

## PythonAnywhere에서 DB생성
- 컴퓨터와 서버는 다른 DB를 사용한다!
    + 그래서 사용자 계정과 글은 서버와 내 컴이랑 다를 수 있다.

```bash
python manage.py migrate
python manage.py createsuperuser
```

## web app으로 블로그 배포
pythonAnyWhere > Web > add a new web app


## URL이란?
- URLconf(URL Configuration): 장고에서 URL과 일치하는 뷰를 찾기 위한 패턴들의 집합

mysite > urls.py
```python
from django.conf.urls import include, url
    from django.contrib import admin

    urlpatterns = [
        # Examples:
        # url(r'^$', 'mysite.views.home', name='home'),
        # url(r'^blog/', include('blog.urls')),

        url(r'^admin/', include(admin.site.urls)),
    ]
```
regex를 사용해 찾아낸다.

```
^ 문자열이 시작할 떄
$ 문자열이 끝날 때
\d 숫자
+ 바로 앞에 나오는 항목이 계속 나올 때
() 패턴의 부분을 저장할 때
```

- 밑에 `url(r'', include('blog.urls')),`를 추가해 모든 접속 요청을 blog.urls로 전송하고 추가 명령을 찾는다.
- 파이썬에서 정규 표현식 작성할땐 앞에 `r`붙인다.

## blog.urls
`blog/urls.py`를 생성하고
```python
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.post_list, name='post_list'),
]
```
- 장고의 메소드와 blog어플리케이션에서 사용할 모든 views들을 불러온다.
- 그리고 `post_list`란 이름의 view가 ^로 시작해서 $로 끝나는, 즉 문자열이 없는, 즉 `http://127.0.0.1:8000/`로 들어왔을 때 `views.post_list`를 보여주라고 한다.
- 이름짓는 이유: 뷰마다 고유한 이름을 붙여, 식별하기 쉽게 하고 많이 쓴다.

## Django 뷰 만들기
> 뷰: 모델에서 필요한 정보를 받아와서 템플릿에 전달
`blog/views.py`

```python
def post_list(request):
    return render(request, 'blog/post_list.html', {})
```
post_list메서드는 요청(request)을 넘겨받아 render메서드를 호출.
render메서드는 요청과 `blog/post_list.html`템플릿을 받아 리턴된 내용이 브라우저에 보여짐

## 템플릿
blog/tamplates/blog 디렉토리 밑에 `post_list.html`만들기
그리고 pythonanywhere다시 가서 `git pull` `python manage.py collectstatic`하면 배포된다.

## Django ORM
- 쿼리셋: 전달받은 모델의 객체 목록. DB로부터 데이터를 읽고, 필터를 걸거나 정렬함

```shell
python manage.py shell

from blog.models import Post
Post.objects.all() #하면 장고 관리자로 만든 포스트들이 출력된다.

from django.contrib.auth.models import User
```

## Refer
[간단한 블로그를 Django 이해하기](http://www.slideshare.net/perhapsspy/django-44664022?qid=7a619eb7-d359-4f72-83ac-1eddfbf23123&v=qf1&b=&from_search=1)
[Django, 저는 이렇게 씁니다](http://www.slideshare.net/perhapsspy/django-42665652)
[쉽게 씌여진 장고](http://www.slideshare.net/carpedm20/django-32473577?related=1)
[Django로 웹사이트 만들고 런칭하기](https://github.com/youngrok/startup-dev-tutor)
[django girls tutorial](http://tutorial.djangogirls.org/ko/index.html)
