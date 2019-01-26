# Django Girls

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
- whitenoise: `정적 파일`로 불리는 것들을 제공하는 프로그램.
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

```
python manage.py shell

from blog.models import Post # Post모델을 불러온다
Post.objects.all() # 하면 장고 관리자로 만든 포스트들이 출력된다.

from django.contrib.auth.models import User # User모델을 불러온다.
User.objects.all() # 하면 슈퍼유저로 만들었던 사용자가 나온다
me = User.objects.get(username='jayjin') # 'jayjin'User 인스턴스 받아오기
Post.objects.create(author=me, title='Sample title', text="Test") # 게시물 만들기
Post.objects.all() # 잘 들어갔는지 확인한다

Post.objects.filter(author=me) # author가 me인 게시물들
Post.objects.filter(title__contains='title') # 제목에 title이란 글자가 들어간 글들. 필드이름/연산자/필터를 밑줄 2개 사용해 구분.

from django.utils import timezone
Post.objects.filter(published_date__lte=timezone.now()) # 출판날짜가 과거인 글들
post = Post.objects.get(title="Sample title") # 아까 만든 게시물 인스턴스 얻고
post.publish() # 출판한다

Post.objects.order_by('created_date') # created_date필드로 정렬
Post.objects.order_by('-created_date') # 내림차순

Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date') # 체이닝도 가능

exit() #종료
```

## 템플릿의 동적 데이터
- `views`: 모델과 템플릿을 연결한다
```python
from django.shortcuts import render
from django.utils import timezone
from .models import Post # .은 현재 디렉토리/어플리케이션을 의미. Post를 불러온다.

def post_list(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    return render(request, 'blog/post_list.html', {'posts':posts})
```

- `Django template tags`: 파이썬을 HTML로 바꿔줌
- `blog/templates/blog/post_list.html`에서 `{{posts}}`하면 객체들 목록 나온다.

```python
{% for post in posts %}
    <div>
        <p>published: {{ post.published_date }}</p>
        <h1><a href="">{{ post.title }}</a></h1>
        <p>{{ post.text|linebreaks }}</p>
    </div>
{% endfor %}
```
하면 for loop 돈다.

## CSS
- `blog/static/css/blog.css`를 만든다.
- `blog/templates/blog/post_list.html`에서 가장 위에 `{% load staticfiles %}`를 추가한다. 그럼 정적 파일이 실행됨!
- `<head>`사이에 `<link rel="stylesheet" href="{% static 'css/blog.css' %}">`를 추가한다. 
- 그럼 css가 먹는다! (안되면 서버 껏다 켜라)

## 템플릿 확장
- `blog/templates/blog/base.html`만들기

```html
{% load staticfiles %}
<html>
<head>
    <title>Django Girls blog</title>
    ...
    <link rel="stylesheet" href="{% static 'css/blog.css' %}">
</head>
<body>
    ...
    {% block content %}
    {% endblock %}
    ...
</body>
</html>
```
- `base.html`을 확장한 이 블럭에 HTML을 추가할 수 있게 해준다.

```html
{% extends 'blog/base.html' %}

{% block content %}
    {% for post in posts %}
        <div class="post">
            <div class="date">
                {{ post.published_date }}
            </div>
            <h1><a href="">{{ post.title }}</a></h1>
            <p>{{ post.text|linebreaks }}</p>
        </div>
    {% endfor %}
{% endblock content %}
```
`blog/base.html`를 확장한거고, `content`에 그걸 껴넣는다.

## 프로그램 어플리케이션 확장하기
`post_list.html`에 
```html
<h1><a href="{% url 'post_detail' pk=post.pk %}">{{ post.title }}</a></h1>
```
를 추가한다. post목록에 있는 제목에서 post내용 페이지로 가는 링크.
- `post_detail`뷰의 경로: `blog.views.post_detail`. 여기서 `views`는 views.py이다.

`urls.py`에
```python
url(r'^post/(?P<pk>[0-9]+)/$', views.post_detail, name='post_detail'),
```
을 추가한다. `post/`로 시작하고, 
`(?P<pk>[0-9]+)`: 장고가 우리가 여기 넣은 모든것을 pk변수에 넣어 뷰로 전송하겠다는 뜻. 
`http://127.0.0.1:8000/post/1234567890/`이 완벽히 매칭되겠지.
`http://127.0.0.1:8000/post/5/`를 입력하면, `post_detail`인 view를 찾고있다고 생각하고 pk가 5인 view로 정보를 보낸다.
**pk**: 프라이머리 키 라는 뜻으로 장고 프로젝트에서 자주 사용하는 변수이름.

### 404 추가
`blog/views.py`에 `from django.shortcuts import render, get_object_or_404`추가한다.
밑에는
```python
def post_detail(request, pk): # request, 그리고 urls에 지정한것과 동일한 이름인 pk를 넣어준다.
    post = get_object_or_404(Post, pk=pk) # pk가 없는 포스트라면 404페이지로 넘겨준다.
    return render(request, 'blog/post_detail.html', {'post': post})
```
을 추가한다.

### post상세페이지 템플릿 만들기
`blog/templates/blog/post_detail.html`생성하고
```html
{% extends 'blog/base.html' %}

{% block content %}
    <div class="post">
        {% if post.published_date %} <!-- published date 있다면 보여주기 -->
            <div class="date">
                {{ post.published_date }}
            </div>
        {% endif %}
        <h1>{{ post.title }}</h1>
        <p>{{ post.text|linebreaks }}</p>
    </div>
{% endblock %}
```

## Django 폼
```python
from django import forms # forms 모델을 import
from .models import Post # Post모델 임포트

class PostForm(forms.ModelForm): # 우리가 만들 폼의 이름, 그리고 이 폼은 `ModelForm`이란걸 알려주면 장고가 이것저것 해준다.
    class Meta:
        model = Post # 이 폼을 만들기 위해 어떤 모델이 쓰여야 하는지
        fields = ('title', 'text') # 필드를 넣는다.
```

`base.html`에 이걸 추가한다. 
```html
<a href="{% url 'post_new' %}" class="top-menu"><span class="glyphicon glyphicon-plus"></span></a>
```

`blog/urls.py`에 이걸 추가한다.
```python
url(r'^post/new/$', views.post_new, name='post_new'),
```

`blog/views.py`에 추가
```python
from .forms import PostForm
...
def post_new(request):
    form = PostForm()
    return render(request, 'blog/post_edit.html', {'form': form});
```

`templates/blog/post_edit.html`을 추가하고 아래를 적어준다.
```html
{% extends 'blog/base.html' %}

{% block content %}
    <h1>New post</h1>
    <form method="POST" class="post-form">{% csrf_token %} <!-- 폼 보안을 위함 -->
        {{ form.as_p }} <!-- 폼을 보여준다 -->
        <button type="submit" class="save btn btn-default">Save</button>
    </form>
{% endblock %}
```

`blog/views.py`에서 지금은 폼 제출시에도 동일한 뷰가 나온다. 조건문으로 분기
```python
def post_new(request):
    if request.method == "POST": # 폼에 입력된 데이터를 view페이지로 가지고 올 때. request는.POST 우리가 입력했던 데이터들 갖고있음.
        form = PostForm(request.POST)
        if form.is_valid(): # 폼에 들어있는 값들이 올바른지 확인. 잘못된 값이 있다면 저장 ㄴㄴ
            post = form.save(commit=False) # 폼을 저장하는 작업.commit=False라고 해서 넘겨진 데이터를 바로 POST모델에 저장하지 말라. 작성자 추가해야하니까.
            post.author = request.user # 작성자를 추가.
            post.published_date = timezone.now()
            post.save() # 작성자까지 추가되고 저장.
            return redirect('blog.views.post_detail', pk=post.pk)
    else: # 처음 페이지에 접속했을때. 폼이 비어있어야 한다.
        form = PostForm()
        

    return render(request, 'blog/post_edit.html', {'form': form});
```

블로그 글 작성하고 post_detail로 자동으로 가기 위해
```python
from django.shortcuts import redirect # 리다이렉트를 임포트해오고
...
return redirect('blog.views.post_detail', pk=post.pk) # pk첨부해서 post_detail로 리다이렉트
```

## 폼 수정하기
`post_detail.html`에 추가한다.
```html
<a class="btn btn-default" href="{% url 'post_edit' pk=post.pk %}"><span class="glyphicon glyphicon-pencil"></span></a>
```

`urls.py`에도 추가한다
```python
 url(r'^post/(?P<pk>[0-9]+)/edit/$', views.post_edit, name='post_edit'),
```

`views.py`에도 추가한다.
```python
def post_edit(request, pk): #url에서 pk를 받아서 처리
    post = get_object_or_404(Post, pk=pk) #수정하고자 하는 글의 Post모델 인스턴스를 가져온다. 원하는 글은 pk를 이용해 찾는다.
    if request.method == "POST":
        form = PostForm(request.POST, instance=post)
        
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.published_date = timezone.now()
            post.save()
            return redirect('blog.views.post_detail', pk=post.pk)
    else:
        form = PostForm(instance=post)
    return render(request, 'blog/post_edit.html', {'form': form});
```

## 보안
`base.html`에서 관리자로 로그인한 유저들만 링크 보이게 함.
```python
<a href="{% url 'post_new' %}" class="top-menu"><span class="glyphicon glyphicon-plus"></span></a>
```

## migration 꼬였을 때 앱의 처음부터 다시 돌리기
```shell
manage.py migrate --fake yourapp zero
# zero 옵션 안 주고 했을 때 풀리기도 한다.
```

refer: http://stackoverflow.com/questions/12364157/south-how-to-force-certain-migration

## Refer
[간단한 블로그를 Django 이해하기](http://www.slideshare.net/perhapsspy/django-44664022?qid=7a619eb7-d359-4f72-83ac-1eddfbf23123&v=qf1&b=&from_search=1)
[Django, 저는 이렇게 씁니다](http://www.slideshare.net/perhapsspy/django-42665652)
[쉽게 씌여진 장고](http://www.slideshare.net/carpedm20/django-32473577?related=1)
[Django로 웹사이트 만들고 런칭하기](https://github.com/youngrok/startup-dev-tutor)
[django girls tutorial](http://tutorial.djangogirls.org/ko/index.html)
[초심자를 위한 웹개발 - django와 회원가입 하기 등등](http://studybee.kr/beginner/8)
[Sublime Text 3 for python and django](http://www.slideshare.net/raccoonyy/sublime-text-3-for-python-and-django)
[pyenv + virtualenv + autoenv 를 통한 Python 개발 환경 구축하기](https://dobest.io/how-to-set-python-dev-env/)
[Developing Websites Using Python and Django 비디오 튜토리얼](https://mva.microsoft.com/en-US/training-courses/developing-websites-using-python-and-django-11415?l=AQdTENEJB_4004300477)
[django로 파이스타그램 만들기](http://blog.hannal.com/category/start-with-django-webframework/)
[django girls 심화](https://djangogirls.gitbooks.io/django-girls-tutorial-extensions/content/)
