# hobbycoding을 hobbycoding으로 만들기

## django 프로젝트 시작하기
- 가상환경 세팅(virtualenv, autoenv)
- 장고 설치 `pip install django`
- hobbycoding 프로젝트 개설
    -  `django-admin.py startproject hobbycoding`
    -  하면 현재 위치에 hobbycoding이란 장고 프로젝트 루트 폴더가 만들어짐.
- 서버 돌리기
    + `./manage.py runserver`
- bower, grunt로 의존성 관리
    + https://milooy.wordpress.com/2016/01/20/django-bower-grunt/
- 디비 동기화
    + `./manage.py migrate`
- 슈퍼유저 만들기
    + `./manage.py createsuperuser`
- 앱 만들기
    + `./manage.py startapp meetup`
- `requirements.txt`만들기
    + django랑 Pillow넣어둠
- `pip install -r requirements.txt`
- meetup 모델 만들기
    + `model.py`에 모델 짜기
- `settings.py`의 `INSTALLED_APPS`에 `meetup`추가하기
- 만든 모델 디비 마이그레이션
    + `./manage.py makemigrations `
- meetup의 `admin.py`에 밋업 모델 등록하기
    + `from meetup.models import Meetup`
    + `admin.site.register(Meetup)`

## static파일 관리하기
settings.py에 static url이 기본으로 명시되어있다.
웹 페이지에서 사용할 정적 파일의 최상위 URL경로.
이 최상위 경로 자체는 실제 파일이나 디렉토리가 아니며, URL로만 존재하는 단위.
이용자 마음대로 정해도 무방.
```python
STATIC_URL = '/static/'
```

이는 템플릿에서 `static`이란 워드로 호출해서 쓸 수 있다.
앱마다(혹은 최상위에 하나) `static`디렉토리를 만들어서 그 안에 필요한 스태틱파일들을 미리 넣어준다.(아닌가? 자동으로 static디렉토리는 읽어오는건가?)
```python 
{% load staticfiles %} #스태틱파일 불러오기
<img src="{% static "my_app/myexample.jpg" %}" alt="My image"/>
```

`static asset`을 별도로 추가해 줄 수도 있다.
`bower`로 추가해준 컴퍼넌트 디렉토리를 `components`라는 워드로 추가해줬다.
`./manage.py findstatic`을 하면 `STATICFILES_DIRS`에 설정한 경로에서 지정한 정적 파일을 찾음.
```python 
STATICFILES_DIRS = (
    ("components", os.path.join(BASE_DIR, "bower_components")),
)
```

`STATIC_ROOT`는 django프로젝트에서 사용하는 모든 정적 파일을 한 곳에 모아넣는 경로.
`./manage.py collectstatic`명령어로 한 곳에 모은다.
각 django앱 디렉터리에 있는 static디렉터리랑 STATICFILES_DIR에 지정된 경로에 있는 모든 파일을 모음.
개발과정(settings.py의 DEBUG가 True)에선 `STATIC_ROOT`설정은 작용 않으며, 실 서비스 배포를 위한 설정 항목.
```python
STATIC_ROOT = os.path.join(BASE_DIR, "collected_static")
```

개발 단계에서 정적 파일을 제공하려면 `static`함수를 import하고 urlpatterns에 추가한다.
이는 DEBUG=True인 경우에만 동작.
근데 static file은 이런 처리 안해도 개발 단계에선 잘 제공됨(django app중 `django.contrib.staticfiles`가 해줌). media file은 urls.py에서 처리해줘야함.

정리하자면, 정적 파일이 있는 경로를 `STATICFILES_DIRS`에 지정하면 개발 단계에선 더 신경쓸 것이 없다.

## Media file관리하기
이용자가 웹에서 업로드한 정적 파일.
미리 준비해두고 제공하는 static file과 달리 언제 어떤 파일이 추가될 지 모르므로 `findstatic`이나 `collectstatic`같은 명령어는 media file에 대해선 무방함.

`MEDIA_ROOT`는 업로드가 끝난 파일을 배치할 최상위 경로를 지정하는 설정 항목. STATIC_ROOT보다 STATICFILES_DIR이랑 더 비슷하다.
`MEDIA_URL`은 STATIC_URL이랑 비슷.
```python
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

#혹은 이렇게

MEDIA_URL = '/uploads/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'uploaded_files')
```

그리고 urls.py에도 추가해준다.
```python
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

이는 models.py에서 uploade_to에서 이렇게 쓸 수 있다.
```python
class Photo(models.Model):
    image_file = models.ImageField(upload_to='%Y/%m/%d')
```

### Refer
http://blog.hannal.com/2015/04/start_with_django_webframework_06/
http://intersnipe.blogspot.kr/2015/02/django-media-file-local-s3.html

## User Model 확장
http://initialkommit.github.io/2015/05/28/extending-the-existing-user-model/
https://www.caktusgroup.com/blog/2013/08/07/migrating-custom-user-model-django/

## TODO
- meetup 모델 짜기
- migrations폴더랑 db는 gitignore에 추가해야하나?
- 메인화면, 밋업 만들기, 밋업 리스트, 밋업 디테일 사이클 만들기
- http://www.getmdl.io/index.html 적용하기

## DONE
- grunt, bower로 구조잡기
- static file, media file이해하기

## MODEL
- meetup
    + 모임 주최자
    + 모임이름
    + 모임 디테일 정보
    + 관심보인 사람 목록
    + 모임 장소
    + 댓글
    + 모임 태그
- User
    + 썸네일
    + 닉네임
    + 이메일
    + 비번


## 기능 명세
- auth
    + 가입
        * 종류
            * 그냥 가입
            * 페이스북 가입
        * 필드
            - 필수
                - 이메일(중복x)
                - 닉네임(중복x)
                - pw
                - 이메일 인증(activate)
            - 추후 입력(선택)
                + domain(태그식)(e.g. angular, javascript)
                + 사용자 썸네일
    + 로그인
        * 자동로그인(checkbox)
    + 로그아웃
    + 탈퇴
- 메인화면
    + 하코 주최
    + 다가오는 하코 리스트
        * 관심 달기(하트)
- 하코 디테일
    + 썸네일
    + 주최자 정보
    + 관심 달기(하트)
        * 하트 한 사람들이 보인다.
    + 모임 정보
        * 모임 날짜
        * 모임장소
        * 태그
    + 댓글 달기
    + 공유
        * 페북
        * 트위터
    + 페북 좋아요 달기
    + 수정
    + 삭제
- 하코 주최
    + 하코 썸네일
    + 모임 정보 (디테일이랑 같음)
    + 페북에 함께 올리기(?)
- 나
    + 내가 주최한 하코 리스트
    + 관심 표한 하코 리스트
        * 다가오는 하코
        * 지나간 하코
    + 내정보
        * 썸네일
        * ID
        * PW 변경
        * 닉네임 변경
        * 페이스북 연동
- 기타
    + 검색
    + 채팅 달까?
    + 로고
        * 하비코딩 + 고래상어
    + 도메인
        * hobbycoding.do

## 사이트맵
- 상단 네비게이션
    + 로고
    + [비로그인]로그인
    + [비로그인]회원가입
    + [로그인완료]내 정보
        * 내가 주최한 hoco
        * 내가 참석한 hoco
        * 설정
        * 로그아웃
    + 주최하기
- 메인
    + 위에 작게 사이트 설명 영역 (http://codepen.io/ 참고)
    + 다가오는 hoco 리스트
- 



- 내가 주최한 hoco
- 관심 hoco
    + 다가오는
    + 지나간


## 모델 짜기
유저 >-< 호코 -< 댓글

- 한 유저당 여러 호코 만들기
- 한 유저당 여러 호코 참여하기
- 한 호코당 여러 댓글
- 
