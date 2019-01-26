# Jaystagram을 django로 만들기

[튜토리얼](http://blog.hannal.com/category/start-with-django-webframework/)

## Python
소스코드 파일 안에 한글 표기 경우 파일 맨 위에
```python
# coding: utf-8

<!-- 혹은 -->

# -*- coding: utf-8 -*-
```
을 표기해야 인코딩 에러가 나지 않는다.

## Django
- Python 모듈: 파이썬 코드가 담긴 파일
- Python 패키지: 파이썬 모듈을 묶어둔 단위(디렉터리처럼)

현재 구조
```
pystagram/
    manage.py
    pystagram/
        __init__.py
        settings.py
        urls.py
        wsgi.py
```

## Admin
```python
# coding: utf-8

from django.contrib import admin

from photo.models import Photo

admin.site.register(Photo)
```
요렇게 `register`로 지정한 모델을 admin영역에서 관리하도록 등록
