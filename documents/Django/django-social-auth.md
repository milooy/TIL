# 장고 페이스북 가입 달기

장고로 만든 개인 사이트에 소셜 가입 기능을 붙이려 한다.
[python-social-auth](http://python-social-auth.readthedocs.org/)를 써서 만들어본다.
나는 `email`을 기본 아이디로 쓰도록 User Model을 확장해두었는데, 그것때문에 많이 삽질했다. 징글징글~~~ 세륜장고... 사라져주세요... 아 아니 사라지진 말아요.

## oAuth
일단 oAuth에 대해 간단히 알고 시작한다. [네이버 D2 블로그](http://d2.naver.com/helloworld/24942)

## python-social-auth 설치하기
[공식 독스](http://python-social-auth.readthedocs.org/en/latest/installing.html)를 참고하여 설치한다. 
참고: [KwangYoun Jung님 블로그](http://initialkommit.github.io/2015/04/27/django-newbie-adding-facebook-authentication-to-a-django-app/)

```shell
pip install python-social-auth
```
핍으로 설치해주고, 센스있게 `requirements.txt`에도 써준다. `Installed_apps`에도 써준다.

```python
INSTALLED_APPS = [
    ...
    'social.apps.django_app.default',
    ...
]
```


## 환경설정
`settings.py`에 필요한 환경설정을 해준다.
[페이스북 디벨로퍼 사이트](https://developers.facebook.com/)에 들어가서 클릭클릭 해서 앱을 만들어준다. 별로 어렵지 않다. 거기서 얻은 키, 시크릿키를 넣어준다.
```python
TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.core.context_processors.static',
    'django.core.context_processors.tz',
    'django.contrib.messages.context_processors.messages',
    'social.apps.django_app.context_processors.backends',
    'social.apps.django_app.context_processors.login_redirect',
)

AUTHENTICATION_BACKENDS = (
    'social.backends.facebook.FacebookOAuth2',
    # 'social.backends.google.GoogleOAuth2',
    # 'social.backends.twitter.TwitterOAuth',
    'django.contrib.auth.backends.ModelBackend',
)

SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/'
SOCIAL_AUTH_URL_NAMESPACE = 'social'

# Facebook
SOCIAL_AUTH_FACEBOOK_KEY = '페북에서 받아온 키를 넣으세요'
SOCIAL_AUTH_FACEBOOK_SECRET = '페북에서 받아온 시크릿키를 넣으세요'

# Google
# SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = ''
# SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = ''

# Twitter
# SOCIAL_AUTH_TWITTER_KEY = ''
# SOCIAL_AUTH_TWITTER_SECRET = ''

SESSION_SERIALIZER = 'django.contrib.sessions.serializers.PickleSerializer'

SOCIAL_AUTH_FACEBOOK_SCOPE = ['email']
# FACEBOOK_EXTENDED_PERMISSIONS = ['email', 'picture']
SOCIAL_AUTH_FACEBOOK_PROFILE_EXTRA_PARAMS = {
  'fields': 'id, name, email, age_range'
}
```

이메일은 디폴트로 받아오지 않으므로, 이메일을 쓰고 싶다면 하단의 변수들을 추가해준다.
변수명은 [페이스북 사이트](https://developers.facebook.com/docs/facebook-login/permissions#reference-public_profile)를 참고한다.

> (+추가)
> `FACEBOOK_EXTENDED_PERMISSIONS`에 email을 추가해주니, 이게 기본 email을 덮어씌워서 페이스북에서 '추가 이메일'이 입력된 것을 받아오게 되어버렸다. 그래서 추가 이메일을 쓰지 않은 사람은 이메일을 받아오지 못하는 불상사가... 부들부들... 이틀 헤맸다.

## urls.py
urls.py에도 추가해준다.
```python
url(r'', include('social.apps.django_app.urls', namespace='social')),
```

## base.html
페북 앱을 만들면 생기는 스크립트를 여는 바디태그 뒤에 넣어준다.
```html
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '앱아이디',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
```

```html
<a href="{% url 'social:begin' 'facebook' %}?next={{ request.path }}">Login with Facebook</a>
```
html엔 이런 식으로 추가해주면 기본적인 동작은 한다.
기본 유저모델로 끝나면 좋겠지만, 만약 가입에 다른 절차들이 필요하다면 몇 가지 작업이 필요하다.

1. 이메일을 기본 아이디로 쓰고
2. 닉네임을 필수로 만들고
3. 프로필 사진을 받음

내 유저모델은 가입시 이런 절차가 필요한데, 페이스북하고 연동할 때에 이를 '어답터'처럼 연결할 함수가 필요하다.

## Pipeline
`python-social-auth`에선 **파이프라인**이란 개념으로 이를 해결한다.
회원가입이 진행되는 동안 수행되는 일련의 함수가 있는데, 이 함수 사이에 필요한 기능이 들어간 함수를 집어넣거나, 기존에 만들어진 함수를 덮어쓰는 식으로 제어한다.
[공식사이트](https://python-social-auth.readthedocs.org/en/latest/pipeline.html#authentication-pipeline)의 설명을 참고.

## settings.py
```python
SOCIAL_AUTH_PIPELINE = (
    'social.pipeline.social_auth.social_details',
    'social.pipeline.social_auth.social_uid',
    'social.pipeline.social_auth.auth_allowed',
    'social.pipeline.social_auth.social_user',
    'social.pipeline.user.get_username',
    # 'social.pipeline.user.create_user',
    'accounts.social.create_user', # 덮어씀
    'accounts.social.update_avatar', # 추가함
    'social.pipeline.social_auth.associate_user',
    'social.pipeline.social_auth.load_extra_data',
    'social.pipeline.user.user_details'
)
```
settings.py에 파이프라인 플로우를 적어준다.
`accounts`앱에 `social.py`를 만들어서, `create_user`함수는 덮어쓰고, `update_avatar`함수를 새로 만들어주었다.

## social.py
```python
from urllib.request import urlopen

from django.core.files.base import ContentFile
from social.utils import slugify

USER_FIELDS = ['email', 'nickname']


def create_user(strategy, details, user=None, *args, **kwargs):
    print(details)
    print(kwargs)
    if user:
        return {'is_new': False}

    fields = {'email': details.get('email'), 'nickname': details.get('username')}

    if not fields:
        return

    return {
        'is_new': True,
        'user': strategy.create_user(**fields)
    }


def update_avatar(backend, response, uid, user, *args, **kwargs):
    if backend.name == 'facebook':
        url = "http://graph.facebook.com/%s/picture?type=large" % response['id']
        avatar = urlopen(url)
        user.avatar.save(slugify(user.email + " social") + '.jpg', ContentFile(avatar.read()))
        user.save()

```
`create_user`함수에서, 원래는 `USER_FIELDS`가 들어가던 것을, email과 nickname이 들어가도록 교체해줬다.
`update_avarter`는 create_user다음에 불리는 함수인데, 페이스북 아바타를 저장하고 user model에 넣어주는 기능을 한다.

## 끝~
끝났다. 모쪼록 less 삽질에 도움이 되었으면 좋겠습니다.
예제는 [공식 깃허브](https://github.com/omab/python-social-auth/tree/master/examples/django_example/example)에서 참고하시면 됩니다.

## Refer
http://initialkommit.github.io/2015/04/27/django-newbie-adding-facebook-authentication-to-a-django-app/

http://codingdojang.com/scode/280
https://github.com/omab/django-social-auth
http://django-social-auth.readthedocs.org/en/latest/installing.html

http://javaguirre.net/2013/11/06/creating-a-user-profile-in-python-social-auth-in-django/
https://gist.github.com/revolunet/5104376

http://i5on9i.blogspot.kr/2016/01/django-social-log-in-library.html
