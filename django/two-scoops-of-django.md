# Two scoops of django
## Intro
- 핵심 개념
    + Keep It Simple, Stupid
    + 모델은 크게, 유틸리티는 모듈로, 뷰는 가볍게, 템플릿은 단순하게
        * 뷰와 템플릿을 제외한 다른 부분에 더 많은 로직 넣는 것을 추천.
    + [12팩터 앱](https://12factor.net/ko/): 웹 기반 애플리케이션 디자인의 통합 전략.
        * 확장 가능하고 배포 가능한 앱을 만드는 방법론
        * 코드베이스 
            * 버전 관리되는 하나의 코드베이스, 다양한 배포
            * 코드베이스는 하나여야 하지만, 배포는 여러개여야 한다.
            * 배포: 앱의 실행중인 인스턴스(store-test, store, 그들 사이에도 3개 인스턴스. 아마존 ec2)
            * 배포마다 다른 버전이 활성화, 코드베이스 자체는 모든 배포에 대해 동일
        * 종속성
            * 모든 종속성 엄격히 선언
            * 시스템에 특정 패키지가 암묵적으로 존재하는 것에 절대 의존 ㄴ. 내 로컬에 페이지네이션 깔고 requirements.txt
            * gemfile
            * pip: 종속성 선언 위해 사용
            * Virtualenv: 종속성 분리 위해 사용.
            * 뉴 개발자가 종속성 설치 명령어 하나로 할 수 있다.
        * 설정
            * 배포마다 달라질 수 있는 설정을 코드 말고 환경변수에 저장
            * 어떠한 인증정보도 유출시키지 않고 코드베이스가 지금 당장 오픈 소스가 될 수 있는지?
            * 코드 저장소에 환경변수 올리지 않음.
        * 백엔드 서비스
            * 리소스는 자유롭게 배포에 연결되거나 분리될 수 있다
            * 애플리케이션 코드 수정하지 않고 로컬에서 관리되는 MySQL DB를 서드파티에서 관리되는 Amazon RDS로 전환할 수 있어야 함.
            * 설정에 있는 리소스 핸들만 변경하면 됨.
        * 빌드, 릴리즈, 실행
            * 세 단계를 엄격히 분리. 릴리즈는 추가만 될 수 있음
            * 빌드: 코드 저장소를 '빌드'라는 실행 가능한 번들로 변환
            * 릴리즈: 빌드에서 만들어진 빌드랑 배포의 현재 설정 결합. 실행환경에서 바로 실행될 수 있게 준비됨.
            * 실행 단계(런타임): 애플리케이션을 실행 환경에서 돌아가게 함.
            * 이전 릴리즈로 되돌릴 수 있는 롤백 기능을 배포 도구에서 제공.
            * 모든 릴리즈는 유니크한 아이디.
            * 한번 만들어진 릴리즈는 변경 불가. 새로운 릴리즈 만들어야 함.
        * 프로세스
            * 프로세스는 stateless하며, 아무것도 공유 X
            * 유지될 필요가 있는 모든 데이터는 DB같은 안정된 백엔드 서비스에 저장
        * 포트 바인딩
            * 실행환경에 대한 런타임 인젝션에 의존 X
            * 포트를 바인딩해 HTTP 서비스로 공개되며 그 포트로 들어오는 요청을 기다림.
        * 동시성
            * 자원이 제때제때 효율적으로 줄 수 있도록 수평적 확장
            * 인스턴스 3개씩 돌리고.
            * 뭐하고 다음에 뭐하고 하면 중간에 죽으면 다 죽음.
            * HTTP요청은 웹 프로세스가, 오래 걸리는 백그라운드 작업은 worker가
        * 폐기 가능
            * 하드웨어 에러에 의한 갑작스러운 죽음에도 견고. 작업을 큐로 되돌림.
        * dev/prod 일치
            * development, staging, production환경 비슷하게 유지
        * 로그
            - 로그: 실행중인 프로세스와 백그라운드 아웃풋 스트림으로부터 수집된 이벤트가 시간 순으로 정렬된 스트림.
            - 장기간에 걸쳐 앱의 동작을 조사할 수 있는 강력함과 유연성을 갖게 됨.
        * Admin 프로세스
            - `manage.py migrate`같은 maintenance작업을 일회성 프로세스로 실행. ssh로 뚫던가.

___

## 1. 코딩 스타일
- 읽기 쉬운 코드
    + 축약적이거나 함축적인 변수명은 피한다
    + 함수 인자의 이름들은 꼭 써 준다
    + 클래스와 메서드를 문서화한다
    + 코드에 주석은 꼭 달도록 한다
    + 재사용 가능한 함수 또는 메서드 안에서 반복되는 코드들은 리팩터링을 해둔다.
    + 함수와 메서드는 가능한 한 작은 크기를 유지한다. 어림잡아 스크롤 없이 읽을 수 있는 길이가 적합

> 한동안 잊고 지낸 코드라도 어느 순간 다시 보았을 때 쉽고 빠르게 내용 이해하기 위한 것.

- PEP8
    + 파이썬 공식 스타일 가이드
        * 들여쓰기는 스페이스 4칸
        * 최상위 함수와 클래스 선언 사이 2줄
        * 클래스 안에서 메서드간엔 한 줄
    + 한 줄 79글자?
        * 오픈 소스가 아닌 프로젝트에선 괜찮음
        * 프라이빗 프로젝트에 한해서는 99칼럼까지?
        * 79자에 맞추려고 이름 줄이지 마라.
    + 임포트 순서
        * 1. 표준 라이브러리 임포트 `from math import sqrt`
        * 2. 코어 장고 임포트 `from django.db import models`
        * 3. 장고와 무관한 외부 앱 임포트 `from django_extensions.db.models import TimeStampedModel`
        * 4. 프로젝트 앱 임포트 `from splits.models import BananaSplit`
- flake8
    + 코딩 스타일, 코드 품질, 논리적 에러 검증
- 명시적 성격의 상대 임포트 이용을 추천
```python
from cones.models import WaffleCone # 이렇게 말고
from .models import WaffleCone # 요렇게 상대경로
```
- 각기 다른 임포트 유형
```python
from core.views import FoodMixin # 절대 임포트. 외부에서 임포트해 현재 앱에서 이용.
from .models import WaffleCone # 명시적 상대. 다른 모듈에서 임포트해서 현재 앱에서 이용
from models import WaffleCone # 암묵적 상대. 종종 다른 모듈에서 임포트해 현재 앱에서 이용할 때 쓰지만 좋은 방법은 아님.
```

- `import *` 는 피하자
    + 다른 파이썬 모듈의 네임스페이스가 현재 우리가 작업하는 모듈의 네임스페이스에 추가되거나 덮이는 것을 막기 위함.
- 장고 코딩 스타일
    + [PEP8 확장](https://docs.djangoproject.com/en/1.8/internals/contributing/writing-code/coding-style/)
    + 템플릿 블록 이름에 대시 대신 밑줄
```python
patterns = [
    url(regex='^add-topping/$', blabla, name='add_topping'), # url 패턴 이름엔 언더스코어. 주소 이름에 대시 쓰는건 무방.
]
```

### HTML, CSS, Javascript 스타일 가이드
- 자바스크립트 스타일 가이드
    + https://github.com/rwaldron/idiomatic.js
    + https://github.com/madrobby/pragmatic.js
    + https://github.com/airbnb/javascript
    + http://javascript.crockford.com/code.html
- JSCS
    + 자바스크립트 코드 스타일 린터
    + http://jscs.info/ 
- HTML, CSS 스타일 가이드
    + http://codeguide.co/
    + https://github.com/necolas/idiomatic-css
- CSS Comb
    + CSS용 코딩 스타일 포맷 도구
    + http://csscomb.com/

___

## 2. 최적화된 장고 환경 꾸미기
- 같은 데이터베이스를 이용하라
    + e.g. 로컬에선 sqlite3, 실제는 MySQL 이런 예 피하기
    + 운영 데이터를 완전히 똑같이 로컬에서 구동하기 힘듦
    + 다른 종류 데이터베이스 사이엔 다른 성격의 필드 타입과 제약 조건이 존재
    + 픽스처는 마법을 부리지 않는다
    + * 많이 선호하는 조합: Django + PostgreSQL
- pip, virtualenv 이용하기
- 버전 컨트롤 시스템 이용하기
- (선택)동일한 환경 구성

___

## 3. 어떻게 장고 프로젝트를 구성할 것인가
- 기본 구성
    + `repository_root` > `django_project_root` > `configuration_root`
    + 최상위 레벨: 저장소 루트
        * 최상위 절대 루트. django project root 이외에 README, .gitignore, 배포에 필요한 파일 등 중요한 내용 위치.
    + 두 번째 레벨: 프로젝트 루트
        * 장고 프로젝트 소스들 위치.
        * 모든 파이썬 코드는 이 아래에 위치.
    + 세 번째 레벨: 설정 루트
        * settings 모듈과 기본 URLConf(urls.py)가 저장되는 장소.
        * 이 디렉터리는 유효한 파이썬 패키지 형태여야 한다 (__init__.py모듈이 존재해야 한다는 의미기도 한다.)
        * `./manage.py start-project`명령으로 생성된 파일의 일부

___

## 4. 장고 앱 디자인의 기본
- 용어 정리
    + 장고 프로젝트: 장고 웹 프레임워크를 기반으로 한 웹 애플리케이션
    + 장고 앱: 프로젝트의 한 기능을 표현하기 위해 디자인된 작은 라이브러리. 장고 프로젝트는 다수의 장고 앱으로 구성. 때때로 외부 장고 패키지를 지칭하기도 함.
        * 앱의 중심이 되는 모델 이름의 복수 형태로 네이밍함. e.g. animals, flavors...
    + INSTALLED_APPS: 프로젝트에서 이용하려고 INSTALLED_APPS 세팅에 설정한 장고 앱들
    + 서드 파티 장고 패키지: 파이썬 패키지 도구들에 의해 패키지화된, 재사용 가능한 플러그인 형태로 이용 가능한 장고 앱.
- 비공통 앱 모듈
    + behaviors.py: 모델 믹스인 위치에 대한 옵션
    + constants.py: 앱 레벨에서 이용되는 세팅을 저장하는 장소. 
    + context_processors.py
    + decorators.py
    + db/ : 여러 프로젝트에서 이용되는 커스텀 모델이나 컴포넌트
    + exceptions
    + fields.py: 폼 필드 이용에 쓰임. 
    + factories.py: 테스트 데이터 팩터리 파일
    + helpers.py: 헬퍼 함수. 뷰랑 모델에서 추출한 코드를 저장. utils.py랑 비슷.
    + managers.py: models.py가 너무 커질 경우, 일반적인 해결책으로 커스텀 모델 매니저가 여기로 이동.
    + signals.py: 커스텀 시그널을 넣기 유용
    + utils.py
    + viewmixins.py

___

## 5. settings와 requirements파일
세팅값의 새로운 적용은 서버를 재시작해야만 가능. 아래는 최선의 장고 설정 방법.

- 버전 컨트롤 시스템으로 모든 설정 파일을 관리해야 한다.
    + 날짜, 시간 등 세팅 변화에 대한 기록이 반드시 문서화되어야 함
- 반복되는 설정 없애기
    - 기본 세팅 파일로부터 상속
- 암호나 비밀 키 등은 안전하게 보관
    + 민감한 보안 관련 사항은 버전 컨트롤 시스템에서 제외

### 버전 관리되지 않는 로컬 세팅은 피하라
이전엔 `local_settings`로 보안과 관련된 세팅은 빼두었다.
`SECRET_KEY`같은 것들은 다 빼야 한다. 아마존 API 키, 비밀번호, OAuth 토큰 등 설정 변수
하지만 문제는

- 모든 머신에 버전 컨트롤에 기록되지 않는 코드가 존재하게 됨.
- 운영 환경 문제점 로컬에서 구현해보려 죽쑤다가 local_setting값 때문이란걸 알게 됨
- 여러 팀원이 서로의 local_settings.py를 복사해서 여기저기 붙여 쓴다.

### 여러 개의 settings 파일 이용하기
하나의 파일보단 `settings/` 디렉터리 아래에 여러 개의 셋업 파일을 구성하여 이용. 
(각 세팅 모듈은 그에 해당하는 독립적인 requirements파일을 필요)
```shell
settings/
    __init__.py
    base.py # 공용 세팅 파일
    local.py # 로컬 환경에서 작업할 때 쓰이는 파일. django-debug-toolbar같은 도구 활성화
    staging.py # 스테이징 서버. store-test.pinkfong.com같은거. 
    test.py # 테스트 러너, 인메모리 데이터베이스 정의, 로그 세팅을 포함
    production.py # 운영 서버에서 실제로 운영되는 세팅 파일
```

이는 다음과 같이 실행시킨다.
```shell
# settings/local.py세팅 파일로 셸 시작 
python manage.py shell --settings=twoscoops.settings.local

# settings/local.py세팅 파일로 서버 구동
python manage.py runserver --settings=twoscoops.settings.local
```

이렇게 바꾼 후에는 `project_name/wsgi.py`와 `manage.py`에 기본 구동 세팅을 설정해줘야 한다.
```python
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project_name.settings.local")
```
[참고 링크](http://stackoverflow.com/questions/19128540/django-improperlyconfigured-the-secret-key-setting-must-not-be-empty)

### 개발 환경의 settings 파일 예제
```python
# settings/local.py
from .base import * # 베이스 세팅 받아오기

DEBUG = True
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "twoscoops",
        "USER", "",
        "PASSWORD": "",
        "HOST": "localhost",
        "PORT": "",
    }
}

INSTALLED_APPS += ("debug_toolbar",)
```

### 코드에서 설정 분리하기
환경 변수 패턴.
- 걱정 없이 세팅 파일을 버전 컨트롤 시스템에 추가할 수 있다.
- 파이썬 코드 수정 없이 시스템 관리자들이 프로젝트 코드를 쉽게 배치할 수 있다.

맥이나 리눅스 배포판의 경우 다음 구문을 `bashrc`, `.bash_profile`, 또는 `.profile`의 뒷부분에 추가하면 된다.
```shell
export SOME_SECRET_KEY=1c3-sadf-123fsaf
export JAYJIN_FREEZER_KEY = weljfak-123r-1faldk
```

운영 환경에서 환경 변수를 세팅하기
히로쿠는 다음과 같이 개발 환경의 환경 변수들을 지정한다.
```shell
heroku config:set SOME_SECTRET_KEY=123-1sdfa-123
```

파이썬에서 환경 변수에 접근하려면
```shell
import os
SOME_SECRET_KEY = os.environ["SOME_SECRET_KEY"]
```

비밀 키가 존재하지 않을 때 예외 처리하기
```python
# settings/base.py
import os

from django.core.exceptions import ImproperlyConfigured

def get_env_variable(var_name):
    try:
        return os.environ[var_name]
    except KeyError:
        error_msg = "Set the {} environmental variable".format(var_name)
        raise ImporperlyConfigured(error_msg)
```

### 환경 변수를 이용할 수 없을 때
아파치, Nginx기반 환경에서도 특정 경우에 한해 환경 변수를 이용하는 방법이 작동되지 않는다.
이럴 경우 `비밀 파일 패턴`방법을 이용한다. JSON, Config, YAML 또는 XML로 작성하고 gitignore에 추가.

```json
{
    "FILENAME": "secrets.json",
    "SECRET_KEY": "비밀이당",
    "DATABASE_HOST": "127.0.0.1",
    "PORT": "5432"
}
```

settings.py엔 다음과 같이 추가.
```python
# settings/base.py
import os

from django.core.exceptions import ImproperlyConfigured

# JSON기반 비밀 모듈
with open("secret.json") as f:
secrets = json.loads(f.read())

def get_env_variable(setting, secrets = secrets):
    try:
        return os.secrets[setting]
    except KeyError:
        error_msg = "Set the {0} environmental variable".format(setting)
        raise ImporperlyConfigured(error_msg)

SECRET_KEY = get_secret("SECRET_KEY")
```

### 여러 개의 requirements.txt 추가하기
그 환경에 필요한 컴포넌트만 설치
```
requirements/
    base.txt
    local.txt
    staging.txt
    production.txt
```

base.txt예제
```
Django==1.8.0
psycopg2=2.6
```

local.txt예제
```
-r base.txt # base.txt requirements 파일 포함
coverage==3.7.1
django-debug-toolbar==1.3.0
```

ci.txt 예제
```
-r base.txt
coverage==3.7.1
django-jenkins==0.16.4
```

설치하기
```
pip install -r requirements/local.txt
```
