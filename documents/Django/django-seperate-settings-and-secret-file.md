# 장고 settings 파일 & 설정 변수 분리

`Two scoops of django` 책의 5장, 'settings와 requirements 파일'을 보고 개인 프로젝트에 두 가지를 리팩토링해야겠다는 생각이 들었다.

1. 비밀 값(e.g. OAuth 토큰) 코드에서 분리
2. 환경별로 settings 파일 분리

제일 급한 OAuth 토큰부터 분리해보겠다.
책에선 환경변수를 이용하는 것을 추천했지만, 나는 차선책인 'json'파일 만드는 방법을 선택했다.
아직 shell에 익숙하지 않은 것도 있고, 다른 개발자와 json으로 공유하는게 한 눈에 보기 편할 것 같아서다.

## 비밀 값 코드에서 분리시키기
`secret.json`이란 비밀 값들을 저장하는 파일을 만든다. 나는 장고 `SECRET_KEY`와 facebook OAuth 키 값들을 넣었다. 이 파일은 코드 저장소에 저장되면 안되기에, `.gitignore`에 추가해준다.
```json
{
  "SECRET_KEY": "m-4#rp68ffwi어쩌구",
  "SOCIAL_AUTH_FACEBOOK_KEY": "12312345678",
  "SOCIAL_AUTH_FACEBOOK_SECRET": "asdf123asdf123"
}
```

이는 settings파일에서 다음과 같이 불러올 수 있다.
```python
import json

from django.core.exceptions import ImproperlyConfigured

with open("secrets.json") as f:
    secrets = json.loads(f.read())


# Keep secret keys in secrets.json
def get_secret(setting, secrets=secrets):
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {0} environment variable".format(setting)
        raise ImproperlyConfigured(error_msg)

SECRET_KEY = get_secret("SECRET_KEY")
```

## 환경별로 settings 파일 분리
이것도 어렵지 않다. 
프로젝트 폴더 내의 메인 앱 내부(기존에 settings.py가 있던 곳)에 `/settings` 폴더를 만들어준다.
나는 기본(base), 로컬(local), 운영 서버(production) 세 개로 분리했다. `__init__.py`도 추가해주어야 한다(settings의 app에 추가할 필요는 없다).

```
project_name
    settings
        __init__.py
        base.py
        local.py
        production.py
```

`base.py`에는 기존에 `settings.py`에 있던 것들을 옮겨주면 된다.
`local.py`에선 base를 상속받아준 다음, 개발 환경에서 원하는 세팅들을 추가해주면 된다.

```python
from .base import *

DEBUG = True
```

실행은 다음과 같이 하면 되는데,
```shell
# settings/local.py세팅 파일로 셸 시작 
python manage.py shell --settings=twoscoops.settings.local

# settings/local.py세팅 파일로 서버 구동
python manage.py runserver --settings=twoscoops.settings.local
```

그럼 `ImproperlyConfigured: The SECRET_KEY setting must not be empty` 에러가 날 것이다. 찾아보니 이렇게 바꾼 후에는 `project_name/wsgi.py`와 `manage.py`에 기본 구동 세팅을 설정해줘야 한단다.[참고 링크](http://stackoverflow.com/questions/19128540/django-improperlyconfigured-the-secret-key-setting-must-not-be-empty)

```python
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project_name.settings.local")
```

이렇게 바꾸면, 한번 migrate를 해주어야 한다. (기존 db가 날아간다 ㅠㅠ)
```
./manage.py migrate
```

## Pycharm에서 settings별로 서버 실행 변수 바꾸기
![Pycharm Settings](../img/django-seperate-settings-and-secret-file/1.png "Pycharm Settings")
일단 `Run > Edit configurations`에 좌측 `+`버튼으로 장고 서버를 추가해준다.
원하는 이름을 지정하고, 
`Environment variables` 옆에 `...`을 눌러 `DJANGO_SETTINGS_MODULE`이란 key로 원하는 세팅 파일 경로를 잡아준다. 나같은 경우엔 `cart.settings.local`을 추가해주었다.

virtualenv로 의존성 관리를 하고 있다면, 하단의 `Python interpreter`도 알맞은 것으로 바꿔주어야 한다. 원하는 것이 없으면 `Pycharm > Preferences > Project Interpreter`에서 추가해준다. [참고](https://www.jetbrains.com/help/pycharm/2016.1/configuring-python-interpreter-for-a-project.html)

## Refer
- Two scoops of django
- https://dayone.me/20Tcz1k
