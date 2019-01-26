# 장고로 웹 만들기 with 핑크퐁 TV

### `settings.py`
```python
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    ...
    'tv',
    'movie',
)

STATIC_URL = '/static/'
```
- `tv`와 `movie`라는 앱을 만듦
- css, js, image는 `/static/`으로 접근

### tv> `views.py`
```python
from django.shortcuts import render
from django.views.generic import ListView
from movie.models import Video

class HomeView(ListView):
    model = Video
    template_name = 'home.html'
```
- 쓸 데이터 모델은 Video
- 보여줄 템플릿은 home.html

### tv > `urls.py`
```python
from movie.views import VideoDetailView, VideoHomeView, video_home_view, video_home_view_ajax
from tv.views import HomeView

url(r'^$', HomeView.as_view(), name='home'),
url(r'^video/$', VideoHomeView.as_view(), name='video-home'),
```
- 매칭될 url에 맞는 View를 import하고 `.as_view()`를 호출해준다.

### tv > templates > `base.html`
```html
<!doctype html>
<html class="no-js" lang="">{% load staticfiles %}
    <head>
        <meta charset="utf-8"/>
        <meta http-equiv="x-ua-compatible" content="ie=edge"/>
        <title>{{ title }}</title>
        <meta name="description" content="핑크퐁 - 어린이 동요 홈스쿨링"/>
        ...
        {% block css %}
        {% endblock %}
        <script src="{% static 'js/vendor/modernizr-2.8.3.min.js' %}"></script>
        {% block js %}
        {% endblock %}
        ...
    <nav class="header">
        ...   
    </nav>
    {% block content %}
    {% endblock %}

```
- `{% load staticfiles %}` : `static`을 쓰려면 필요함
- `{% block css %}{% endblock %}`: 여기서만 쓸 CSS를 넣어둔다는 뜻.
- `{% block content %}{% endblock %}`: 갈아낄 컨텐츠 블록. extend에 상속받은것에서 찾는다.

### tv > templates > `home.html`
```html
{% extends 'base.html' %}
{% block content %}
<div class="splash-container">
...
{% endblock %}
```
- 갈아낄 템플릿. base.html를 extends해오고, `content`라는 이름의 block 만든다.

### movie > `views.py` 
```python
from django.views.generic import DetailView, TemplateView
from movie.models import Video
from django.shortcuts import render


class AjaxChangeTemplateMixin(object):
    ajax_template_name = None
    def get_template_names(self):
        ...
        return name


class VideoDetailView(DetailView): <!-- 업뎃 필요 -->
    model = Video
    template_name = 'video/detail.html'


class VideoHomeView(AjaxChangeTemplateMixin, TemplateView):
    model = Video
    template_name = 'video/home.html'
    ajax_template_name = 'video/_home.html'



def video_home_view(request):
    template_name = 'video/home.html'
    if request.is_ajax():
    # if 'ajax' in request.GET:
        template_name = 'video/_home.html'
    return render(request, template_name, {'object_list': []})


def video_home_view_ajax(request):
    template_name = 'video/_home.html'
    return render(request, template_name, {'object_list': []})
```
- `VideoHomeView`는 AjaxChangeTemplateMixin(ajax통신에 씀)과 TemplateView를 가져옴.
    + home.html을 뿌려주고, ajax로는 _home.html을 뿌려준다.
- `video_home_view`: 얘는 어디에 쓰죠? >> 얘는 ajax통신 설명하는걸 보여줄때 썼습니다.

## movie > `home.html`
```html
{% extends 'base.html' %}
{% load staticfiles %}
{% block css %}
    <link rel="stylesheet/less" href="{% static 'less/video.less' %}">
    <link rel="stylesheet/less" href="{% static 'less/video2.less' %}">
{% endblock %}
{% block content %}
<div class="splash-container">
    ...
</div>
{% include 'video/_home.html' %}
{% endblock %}
```
- base를 뼈대로 받아오고,
- staticfiles, css, content를 넣어준다. 그리고 그 속에 또 ajax로 들어갈 것을 `{% include 'video/_home.html' %}`로 삽입.
- `_home.html`에는 별다른 python코드 없이 그냥 짜준다.


## 새로운 앱 만들기
```shell
./manage.py startapp app
```


