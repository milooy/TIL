# Two scoops of Django

## 김승진님 역자 만남
- FANCY 개발자는 15명
- 쿼리최적화랑 캐시만 잘해도 반은 먹고간다
- 국제화&현지화=> 프로젝트 시작할때 해야한다
- 질문
    - 서버 업데이트 시간
    - 인기순 정렬 // 실시간이라는건 존재하지 않아요(?)
        + 캐시로 해라. 유연하게 생각.
    - FANCY 디지털 노마드 근무시간: 5~6시 퇴근
    - 소통 방법

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
 ㅉ # 운영 서버에서 실제로 운영되는 세팅 파일
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

___

## 6. 장고에서 모델 이용하기
- 유용한 패키지들
    + django-model-utils: TimeStampedModel같은 일반적인 패턴 처리 이용
    + django-extensions: 모든 앱에 모델 클래스를 자동으로 로드해 주는 `shell_plus`라는 관리 명령 제공. 단점은 너무 다양한 기능 포함
- 시작하기
    + 모델이 너무 많으면 앱을 나눈다
        * 각 앱이 가진 모델의 수는 5개 넘지 말아야 한다
    + 모델 상속에 주의하자
        * 상속을 이용하지 않는다
            - 공통 필드 있을 때 그 모델 모두에 필드 만듦.
            - pros: 한눈에 보기 쉬움
            - cons: 모델 간 중복되는 테이블 많으면 지속적 관리 어려움
        * 추상화 기초 클래스(Abstract base class)
            - 오직 상속받아 생성된 모델들의 테이블만 생성
            - pros: 추상화된 클래스에 공통 부분 추려둬서 한 번만 타이핑
            - pros: 추가 테이블 생성 x, 여러 테이블에 걸쳐 조인 함으로써 발생하는 성능 저하도 없다
            - cons: 부모 클래스를 독립적으로 이용 불가
        * 멀티테이블 상속(multi-table inheritance)
            - 부모와 자식 모델에 대해서 모두 테이블 생성. OneToOne필드는 부모와 자식 간에 적용
            - pros: 각 모델에 대해 매칭되는 테이블이 생성. 부모 또는 자식 모델 어디로든지 쿼리 할 수 잇다
            - cons: 자식 테이블에 대한 각 쿼리에 대해 부모 테이블로 조인 필요해서 부하 발생. 이용하지 말기를 권한다.
        * 프락시 모델(proxy model)
            - 원래 모델에 대해서만 테이블 생성.
            - pros: 각기 다른 파이썬 작용(behavior)을 하는 모델들의 별칭을 가질 수 있다
            - cons: 모델의 필드 변경 불가

### 모델 상속해보기
```python
class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
```
아래 `class Meta`를 달면 추상화 기초 클래스로 변경해준다.
그럼 마이그레이션 실행할 때 이 테이블이 생성되지 않는다.

### 데이터베이스 마이그레이션
- 생성되는 마이그레이션 갯수에 연연하지 마라. 너무 많아진다면 `squashmigrations`를 이용하는 것도 방법.
- 배포 전에 마이그레이션을 rollback할 수 있는지 확인해보자.
- 테이블에 수백만 개의 데이터가 이미 존재한다면 운영서버에서 돌리기 전에 스테이징 서버에서 비슷한 크기의 데이터에 대해 충분히 테스트하자
- MySQL을 이용한다면
    + 스키마 변환 전 데이터베이스를 반드시 백업해둔다. MySQL은 스키마 변경에 대해 트랜잭션을 지원 x. 따라서 롤백이 불가능 <- `?`
    + 가능하다면 데이터베이스를 변환하기 이전에 프로젝트를 read-only모드로 변경한다 <-`?`
    + 상당히 큰 테이블의 경우 주의하지 않으면 스키마 변경에 상당한 시간이 걸릴 수 있다. 몇 시간이 걸릴 수도 있음.

### 장고 모델 디자인
- 정규화하기
    + Database Normalization에 익숙해져야 한다.
    + 장고 모델 디자인은 항상 정규화로부터 시작. 충분한 시간을 가지고 이미 모델에 포함된 데이터들이 중복되어 다시 다른 모델에 포함되지 않도록 신경써야 함.
- 캐시와 비정규화
    + 적절한 위치에서 캐시를 세팅하는 건 모델을 비정규화 할 때 발생하는 문제점들을 상당 부분 해결.
- 반드시 필요한 경우에만 비정규화를 하도록 하자
    + 비정규화 생각하기 이전에 캐시에 대해 좀 더 연구
- 언제 null을 쓰고 언제 blank를 쓸 것인가
    + CharField, TextField, SlugField, EmailField, CommaSeperatedIntegerField, UUIDField
        * `null=True`: 안쓴다. 빈 값은 빈 문자열로 저장. 'null'이란 값이나 ''를 빈 문자열에 대해 반환
        * `blank=True`: 쓴다. 빈 값을 허용한다면.
    + FileField, ImageField
        * `null=True`: 안쓴다. 장고는 `MEDIA_ROOT`의 경로를 CharField에 파일 또는 이미지로 저장한다. 같은 패턴이 FileField에도 적용됨.
        * `blank=True`: 쓴다. CharField에 적용된 것과 같은 규칙 적용 <-`?`
    + BooleanField
        * `null=True`: 안쓴다. 대신 `NullBooleanField`이용.
        * `blank=True`: 안쓴다.
    + IntegerField, FloatField, DecimalField, DurationField 등
        * `null=True`: 해당 값이 DB에 NULL로 들어가도 문제 없다면 이용
        * `blank=True`: 위젯에서 해당 값이 빈 값을 받아와도 문제가 없다면 이용. null=True랑 같이 이용.
    + DateTimeField, DateField, TimeField 등
        * `null=True`: 해당 값이 DB에 NULL로 들어가도 문제 없다면 이용
        * `blank=True`: 위젯에서 해당 값이 빈 값 받아와도 문제없다거나 auto_now나 auto_now_add를 이용하고 있다면 이용한다.
    + ForeignKey, ManyToManyField, OneToOneField
        * `null=True`: 해당 값이 DB에 NULL로 들어가도 문제 없다면 이용
        * `blank=True`: 위젯에서 해당 값이 빈 값 받아와도(e.g. 셀렉트박스) 문제없다면 괜춘 <-`?`
    + GenericIPAddressField (*IPAddress보다 선호*)
        * `null=True`: 해당 값이 DB에 NULL로 들어가도 문제 없다면 이용
        * `blank=True`: 위젯에서 해당 값이 빈 값 받아와도 문제없다면 이용
    + IPAddressField
        * `null=True`: 사용 x
        * `blank=True`: 사용 x
- 언제 BinaryField를 이용할 것인가
    + raw binary data 또는 byte를 저장하는 필드.
    + filter, exclude, 등 SQL액션들이 적용되지 않는다.
    + 사용 예
        * 메시지팩 형태의 콘텐츠 <-`?`
        * 원본 센서 데이터
        * 압축된 데이터
    + 크기가 방대할 수 있고 그로 인해 DB가 느려질 수 있다는 것을 명시
        * 해당 데이터를 파일 형태로 저장하고 FileField에 레퍼런스만 저장하는 방법도 있음
        * BinaryField에 파일을 직접 저장하는건 피하자.
        * 데이터베이스 필드에 파일 직접 저장하는건 피하자 <- `?`
        * DB의 읽기/쓰기 속도는 항상 파일 시스템보다 느림.
        * DB백업에 드는 공간과 시간이 점점 증가
        * 파일 자체에 접근하는 데 앱(장고)레이어와 데이터베이스 레이어 둘 다를 거쳐야 한다.
- 범용 관계(generic relations) 피하기
    + generic relations와 models.field.GenericForiegnKey이용에 부정적.
    + Generic Relations: 한 테이블로부터 다른 테이블을 서로 제작 조건이 없는 외부 키(GenericForiegnKey)로 바인딩.
    + 시간이 흐르며 favorite, ratings...앱을 ForiegnKey와 M2M필드 이용 안해도 구현 <-`?`

### 모델의 `_meta API`
- 언제 필요하나 <-`?`
    + 모델 필드의 리스트를 가져올 때
    + 모델 특정 필드 클래스 가져올 때(또는 상속 관계나 상속 등을 통해 생성된 정보 가져올 때)
    + 앞으로 장고 버전들에서 이러한 정보를 어떻게 가져오게 되었는지 확실하게 상수로 남기기를 원할 때
    + 장고 모델의 자체 검사 도구
    + 라이브러리 이용해서 특별하게 커스터마이징 된 자신만의 장고 만들 때
    + 장고 모델 데이터 조정하거나 변경할 수 있는 일종의 관리 도구를 제작할 때
    + 시각화 또는 분석 라이브러리 제작할 때(e.g. 'foo'라는 단어로 시작하는 필드에 대한 분석 정보)

### 모델 매니저
- 모델에 질의 하면 장고 ORM통하게 되는데 이 때 `모델 매니저`라는 DB와 연동하는 인터페이스를 호출하게 된다.
- 기본적으로 제공하며, 스스로 제작할 수도 있다.
```python
class PublishedManage(models.Manager):

    use_for_related_fields = True

    def published(self, **kwargs):
    return self.filter(pub_date__lte==timezone.now(), **kwargs)

class FlavorReview(models.Model):
    review = models.CharField(max_length=255)
    pub_date = models.DateTimeField()

    # 커스텀 모델 매니저는 여기에 추가. 이렇게 해서 오버라이드하는게 명확
    objects = PublishedManager()
```

```python
FlavorReview.objects.count()
FlavorReview.objects.published().count() #이렇게 사용
```

### 거대 모델(fat model) 이해하기
거대 모델 개념: 데이터 관련 코드를 뷰나 템플릿에 넣기보단 모델 메서드, 클래스 메서드, 프로퍼티 혹은 매니저 메서드 안에 넣어서 캡슐화.

- 메서드 예
    + `Review.create_view(clas, user, rating, title, description)`: 리뷰를 생성하는 클래스 메서드. HTML과 REST 뷰에서 호출되는 모델 클래스, 스프레드시트를 처리하는 임포트 도구에서 호출
    + `review.product_average`: 리뷰된 프로젝트의 평균 점수를 반환하는 리뷰 인스턴스 속성.
    + `review.found_useful(self, user, yes)`: 해당 리뷰가 유용했는지 아닌지 사용자가 기록할 수 있는 메서드.

코드 재사용을 개선할 수 있는 최고의 방법. 대신 너무 커지면 이해하기 어렵고 유지보수하기도 어렵다.

- Mixin
    + 모델 행동은 믹스인을 통한 캡슐화와 구성화의 개념으로 이루어짐.
    + 모델은 추상화 모델로부터 로직들을 상속받음
- stateless한 Helper함수
    + 모델로부터 로직 떼어내 유틸리티 함수로 넣음. 독립적으로 구성하면 로직에 대한 테스트가 좀 더 쉬워짐.
    + 단점은 해당 함수들이 stateless해서 함수에 더 많은 인자를 필요로 하게 함
- 모델 행동과 헬퍼 함수

___

## 7. 쿼리와 데이터베이스 레이어
- 단일 객체에서 get_object_or_404() 이용하기
    + 단일 객체를 가져와서 작업을 하는 세부 페이지 같은 뷰에서는 get()대신에 get_object_or_404()를 이용해라.
    + 뷰에서만 이용해야 한다. 아니면 특정 데이터 지웠을때 모두 망가지는 경우가 있음.
- 예외를 일으킬 수 있는 쿼리를 주의하자
    + ObjectDoesNotExist(어떤 모델 객체에도 이용 가능), DoesnotExist(특정 모델에만 이용 가능)
    + MultipleObjectsReturned: 쿼리가 하나 이상 객체 반환되었을 예외경우
- 쿼리를 명확하게 하기 위해 지연 연산 이용
    + filter 등으로 여러 줄 된 쿼리는 분리해서 적어준다. 데이터가 정말로 필요하기 전까지는 SQL 호출하지 않기 때문.
- 고급 쿼리 도구 이용
    + `Customer.objects.filter(scopps_ordered__gt=F('store_visits))`
- 데이터베이스 함수들

**WIP**

___

## 8. 함수 기반 뷰와 클래스 기반 뷰
### URL 네임스페이스 이용하기
`tasting_detail` 대신 `tastings:detail`과 같이 명확한 이름 사용하기
```python
# urls.py
urlpatterns += [
    url(r'^tastings/', include('tasting.urls', namespace='tastings')),
]

# tastings/views.py
class TasteUpdateView(UpdateView):
    model = Tasting

    def get_success_url(self):
        return reverse("tastings:detail", kwargs={"pk": self.object.pk})

# HTML 템플릿
{% url "tastings:detail" taste.pk %}
```

### urlconf에서 view를 문자열로 지목하지 말자
```python
urlpatterns = patterns('',
    url(r'^$', 'polls.views.index', name='index'), # 이렇게 말고
    url(r'^$', views.index, name='index'), # 이렇게 써라
)
```

___

## 9. 함수 기반 뷰의 모범적 이용
### 함수 기반 뷰로 코드 작성할 때의 가이드라인
- 뷰 코드는 작을수록 좋다
- 뷰에서 절대 코드를 반복해서 사용하지 말자
- 뷰는 프레젠테이션 로직을 처리해야 한다. 비즈니스 로직은 가능한 한 모델 로직에 적용시키고 만약 해야 한다면 폼 안에 내재
- 뷰를 가능한 한 단순하게 유지
- 403, 404, 500을 처리하는 커스텀 코드를 쓰는 데 이용하라
- 복잡하게 중첩된 if 블록 구문을 피하자

### HTTPRequest객체 전달하기
미들웨어나 context processors같은 글로벌 액션에 연동되어 있지 않은 경우 재사용에 문제 생김.
프로젝트 전체를 아우르는 유틸리티 함수 만드는 것을 추천
```python
# sprinkles/utils.py
from django.core.exceptions import PermissionDenied

# 사용자의 권한을 체크하고 없으면 HTTP 403을 사용자에게 반환
def check_sprinkle_rights(request):
    if request.user.can_sprinkle or request.user.is_staff:
        request.can_sprinkle = True
        return request

    raise PermissionDenied

# sprinkles/views.py
def sprinkle_list(request):
    request = check_sprinkles(request)

    return render(request,
        "sprinkles/sprinkle_list.html",
        {"sprinkles": Sprinkle.objects.all()}
        )

# template
{% if request.user.can_sprinkle or request.user.is_staff } # 이거 대신
{% if request.can_sprinkle } # 요렇게 쓸 수 있다.
```

### 데코레이터
꼭 필요한 것이 아닌, 코드를 더 간결하게 해주는 것.

```python
# sprinkles/decorators.py
from functools import wraps

from . import utils

def check_sprinkles(view_func):
    @wraps(view_func)
    def new_view_func(request, *args, **kwargs):
        request = util.can_sprinkle(request) # request객체를 utils.can_sprinkle()에 넣는다
        response = view_func(request, *args, **kwargs) # 뷰 함수 호출
        return response
    return new_view_func

# views.py
from .decorators import check_sprinkles

@check_sprinkles
def sprinkle_detail(request, pk):
    sprinkle = get_object_or_404(Sprinkle, pk=pk)

    return render(request,
        "sprinkles/sprinkle_detail.html",
        {"sprinkle": sprinkle}
        )
```
데코레이터 남용하지 않아야 한다.

___

## 10. 클래스 기반 뷰의 모범적 이용
함수 기반 뷰에서는 뷰 함수 자체가 내장 함수이고,
클래스 이반 뷰에서는 뷰 클래스가 내장 함수를 반환하는 as_view() 클래스 메서드를 제공한다.
django.views.generic.View에서 해당 메커니즘 구현. 모든 클래스 뷰는 이걸 상속받아서 이용.

### 클래스 기반 뷰 이용할 때 가이드라인
- 뷰 코드 양은 적을수록 좋다
- 뷰 안에서 DRY
- 뷰는 프레젠테이션 로직에서 관리. 비즈니스 로직은 모델에서. 매우 특별한 경우에는 폼에서 처리
- 뷰는 간단 명료해야 한다
- 403, 404, 500에러 핸들링에 CBV는 이용X. 대신 FBV이용.
- 믹스인은 간단 명료해야 한다.

### CBV와 믹스인 이용하기
믹스인: 실체화된 클래스가 아니라 상속해 줄 기능들을 제공하는 클래스 의미. (실체화(instatiation)되기 전 단계)

```python
class FreshFruitMixin(object):
    def get_context_data(self, **kwargs):
        context = super(FreshFruitMixin, self).get_context_data(**kwargs)
        context["has_fresh_fruit"] = True
        return context

class FruityFlavorView(FreshFruitMixin, TemplateView):
    template_name = "fruity_flavor.html"
```
`TemplateView`가 장고 제공하는 기본 클래스이기 때문에 가장 오른쪽.
- 장고 제공 기본 뷰는 오른쪽에 놓는다
- 믹스인은 왼쪽에 놓는다
- 믹스인은 파이썬의 기본 객체 타입을 상속해야 한다

### 장고 CBV 종류
- View: 기본 뷰
- RedirectView: 다른 URL로 리다이렉트
- TemplateView: 장고 HTML 템플릿 보여줄 때
- ListView: 객체 목록
- DetailView: 객체 보여줌
- FormView: 폼 전송
- CreateView: 객체를 만들 때
- UpdateView: 객체 업데이트
- DeleteView: 객체 삭제
- generic date view: 시간 순으로 객체 나열해 보여줄 때. 블로그에서 일반적으로 이용

### 인증된 사용자에게만 접근 가능하게 하기
`django-braces`가 제공하는 `LoginRequiredMixin`

```python
# flavors/views.py
from braces.views import LoginRequiredMixin

class FlavorDetailView(LoginRequiredMixin, DetailView):
    솰라라라
```
질문: @login_required대신 이 믹스인을 쓰는 이유

### 뷰에서 유효한 폼을 이용해 커스텀 액션 구현
```python
class FlavorCreateView(LoginRequiredMixin, CreateView):
    model = Flavor
    fields ('title', 'slug', 'scoops_reaining')

    def form_valid(self, form):
        # 이미 체크된 폼에 대해 커스텀 로직 적용. 원하는 일 한다
        return super(FlavorCreateView, self).form_valid(form)

    def form_invalid(self, form):
        return super(FlavorCreateView, self).form_invalid(form)
```

### 뷰 객체 이용하기
자체적 메서드/속성 제공하는 뷰 객체로 다른 메서드/속성에서 호출이 가능하게 하는 방법 쓸 수 있다.
이 뷰 객체들은 템플릿에서도 호출 가능
```python
from .tasks import update_users_who_favorited

class FavoriteMixin(object):
    @cached_property
    def likes_and_favorites(self):
        likes = self.object.likes()
        favorites = self.object.favorites()
        return {
            "likes": likes,
            "favorites": favorites,
            "favorites_count": favorites.count()
        } # likes와 favorites의 딕셔너리를 반환


class FlavorUpdateView(LooginRequireMixin, FavoriteMixin, UpdateView):
    model = Flavor
    fields = ('title', 'slug', 'scoops_remaining')

    def form_valid(self, form):
        update_users_who_favorited(
            instance=self.object,
            favorites=self.likes_and_favorites['favorites']
            )
        return super('FlavorCreateView', self).form_valid(form)
```

```
<li>likes: {{view.likes_and_favorites.likes}}</li>
<li>Favorites: {{view.likes_and_favorites.favorites_count}}</li>
```

질문: 어떻게 쓰는지 헷갈린다. context넘기는거랑 어떻게 다른지

### 제네릭 클래스 기반 뷰와 폼 사용하기
```python
from django.contrib import messages

class FlavorActionMixin(object):
    fields = ('title', 'slug', 'scoops_remaining')

    @property
    def success_msg(self):
        return NotImplemented

    def form_valid(self, form);
        messages.info(self.request, self.success_msg)
        return super(FlavorActionMixin, self).form_valid(form)

class FlavorCreateView(LoginRequiredMixin, FlavorActionMixin, CreateView):
    model = Flavor
    success_msg = "Flavor 만들어짐"

class FlavorUpdateView(LoginRequiredMixin, FlavorActionMixin, UpdateView):
    model = Flavor
    success_msg = "Flavor 업데이트됨"

class FlavorDetailView(DetailView):
    model = Flavor
```

---

## 11. 장고 폼의 기초

장고 폼에 대해 기억해야 할 가장 중요한 점은 어떠한 데이터든 간에 입력 데이터라고 한다면 장고 폼을 이용하여 유효성 검사를 해야 한다는 것이다.

### 장고 폼으로 모든 입력 데이터 유효성 검사
장고 폼은 파이썬 딕셔너리 유효성 검사시 최상 도구.
다른 프로젝트로부터 CSV파일 받아 모델에 업데이트하는 장고 앱

```python
def add_csv_purchases(rows):
    rows = StringIO.StringIO(rows)
    records_added = 0

    for row in csv.DictReader(rows, delimiter='.'):
        # 절대 따라하지 말것. 유효성 검사 없이 바로 모델로 데이터 입력
        purchase.objects.create(**row)
        records_added += 1
    return records_added
```

```python
class PurchaseForm(forms.ModelForm):
    class Meta:
        model = Purchase

    def clean_seller(self):
        seller = self.cleaned_data['seller']
        try:
            Seller.objects.get(name=seller)
        except Seller.DoesNotExist:
            msg = "{0}은 purchase #{1}에 없습니다".format(
                seller,
                self.cleaned_data['purchase_number']
                )
            raise forms.ValidationError(msg)
        return seller
```

### 장고의 폼 인스턴스 속성 추가하기
```python
class TasterUpdateView(UpdateView):
    model = Taster
    form_class = TasterForm

    def get_form_kwargs(self):
        # 키워드 인자로 폼 추가하기
        kwargs = super(TasterUpdateView, self).get_form_kwargs()
        kwargs['user'] self.request.user
        return kwargs
```

```python
class TasterForm(forms.ModelForm):
    class Meta:
        model = Taster

    def __init__(self, *args, **kwargs):
        self.user kwargs.pop('user')
        super(TasterForm, self).__init__(*args, **kwargs)
```
이렇게 주입하는거 꽤 빈번하게 이루어짐.

### 폼이 유효성을 검사하는 방법
- 순서
    + 폼이 데이터 받음 -> `form.is_valid()`가 `form.full_clean()`메서드 호출
    + 


---

## 16. REST API 구현하기
REST API: 다양한 환경과 용도에 맞는 데이터를 제공하는 디자인을 정의
- django-rest-framework: 장고 기본 CBV를 바탕으로 브라우징 가능한 편리한 API 등을 제공. 가장 많이 쓰임
- django-tastypie
- django-braces(클래스 기반 뷰), django-jsonview(함수 기반 뷰): 단순하고 빠름

(질문) GET, POST말고 써본적 있나
- 용도
    + 읽기전용만: GET만 구현해도 됨
    + 읽기/쓰기: POST도 구현. PUT과 DELETE도 고려
    + 단순화하기 위해 때떄로 GET, POST만으로도 구현
    + GET, PUT, DELETE는 여러 번 실행해도 그 결과가 변하지 않는 멱등(item-potent)관계이며 POST와 PATCH는 그러지 않다 (<-질문)
- HTTP 상태 코드
    + 200 OK: [GET]리소스 반환, [PUT]상태 메시지 제공/리소스 반환
    + 201 Created: [POST]상태 메세지/새로 생성 리소스 반환
    + 204 No Content: [DELETE] 성공적으로 삭제된 요청의 응답
    + 304 Unchanged: (Redirect). 이전 요청으로부터 아무런 변화 없음.
    + 400 Bad Request: 에러 메세지 반환
    + 401 Unauthorized: 인증 요청 했으나 사용자가 인증 요건 제공 ㄴㄴ
    + 403 Forbidden: 사용자가 허용되지 않은 콘텐츠로 접근 시도
    + 404 Not Found: 리소스 없음
    + 405 Method Not Allowed: 허가되지 않은 HTTP 메서드로 시도
    + 410 Gone: 더는 제공되지 않는 메서드로 호출. 새버전 API제공 위해 기존 API서비스 중지할 떄 이용. 모바일 앱에서 해당 결과에 대해 사용자에게 애플리케이션 업그레이드 요청하는 방법 쓰기도 한다.
    + 429 Too many requests: 제한 시간 내에 너무 많은 요청을 보냄. 접속 제한을 이용할 때 쓰인다.

### 간단한 JSON API 구현하기
질문: Serializer가 모냐

### REST API 아키텍쳐
- 프로젝트 코드들은 간결히 정리되어있어야 한다
    + API만 전담해서 처리하는 앱을 따로 구성하는게 적절하기도 함.
    + 이 앱의 이름에 해당 API버전을 포함시켜야 한다. e.g. apiv4
    + 단점: 해당 API앱이 너무 커지거나 각 api를 지원하는 개별 앱으로부터 해당 API앱이 단절될 수도 있다는 점.
- 앱의 코드는 앱 안에 두자
    + REST API는 단순한 뷰의 모음.
    + 단점: 작게 나뉜 상호 연관되는 앱이 너무 많이 존재.
- 비지니스 로직을 API뷰에서 분리
    + 모델 메서드, 매니저 메서드 등에 분리
- API Url을 모아두기
    + 루트 urls.py에 `url(r"^api/", include("core.api", namespace="api")),`으로 추가.
- API 테스트하기
- API 버저닝하기
    + API의 URL에 버전 정보를 나타내는 것은 매우 유용하다. e.g. /api/v1/users

### 서비스 지향 아키텍처
SOA관점에서 웹 애플리케이션은 독립적이고 분리된 컴포넌트로 구성된다.
각 컴포넌트는 독립된 서버 혹은 클러스터에서 구동. 이러한 컴포넌트 사이 커뮤니케이션에 REST API사용.

### 외부 API 중단하기
- 사용자들에게 예고
- 401 에러 뷰로 API 교체
    + 새 API 엔드포인트 링크
    + 새 API 문서의 링크
    + 서비스 중지에 대한 세부 사항을 알려주는 문서로의 링크

### REST 프레임워크들에 대한 평가
- django-rest-framework가 현실적인 표준으로 자리 잡고 있다
- 보일러플레이트를 얼마나 쓸 것인가? (요즘은 최소화하는 방향으로 변하고 있음)
- RPC구현이 쉬운가? 특정 메서드를 클라이언트 측에 RESTful API로 제공. e.g. `icecream.pour_syrup(syrup)`

### API에 접속 제한하기
- 제한 없는 API 접속은 위험하다

---

## 17. REST API 이용하기
- 검색 엔진이 컨텐츠를 인덱스 할 수 있게 만들기
    + Ajax 기반 콘텐츠를 검색 가능하도록 하게
    + 직접 sitemap.xml 제작하기
    + 유료로 제공되는 brombone.com
- 실시간 서비스가 왜 어려운가(지연 Latency 문제)
    + 애니메이션을 이용해 지연 숨기기
    + 전송 성공을 위조하기 (?)
    + 지리적 위치에 기반을 둔 서버들
    + 지역적으로 이용자 제한하기
- 안티 패턴 피하기
    + 여러 페이지로 구성된 앱이 필요한 경우인데도 단일 페이지 앱으로만 구성
        * 기존의 전통적인 CMS사이트까지 이러한 구성을 정말 필요로 할까?
    + 테스트를 하지 않는 경우
    + 자바스크립트의 메모리 관리를 이해하지 않는 실수
        * 브라우저간의 객체들이 긴 시간동안 존재하다가 느려지고 충돌될 수 있음
    + jQuery가 아닐 때 DOM에 데이터 저장
- AJAX와 CSRF 토큰
    + jQuery: csrf.js를 생성해서 템플릿에 추가해줌
    + Angular: HTTP 헤더에 토큰 넣기

(아직 정리 안함)

---

## 18. 장고 코어 모듈을 교체할 때 주의점
장고 스택 코어 부분 굳이 교체할 필요 없음.

---

## 19. 장고 어드민 이용하기
- 어드민 기능은 최종 사용자를 위한 것이 아니다
- 모든 장고 모델에 대해 항상 `__str__()`메서드를 구현하자.
- 다중 사용자가 이용하는 환경에서 list_editable이용은 피하자 (수정이 겹칠 수 있음)

---

## 21. 장고의 비법 소스: 서드 파티 패키지들
- 항상 패키지 의존성에 세부 버전 번호 표시하기
- 제작되는 패키지는 반드시 테스트를 거쳐야 한다
- 다른 패키지들의 라이브러리 호환성을 위해 가능한 한 넓게 기술(e.g. `Django==1.7.2`보다는 `Django==1.8`이나 `Django>-1.5,<1.9`)
- 완성된 패키지에는 라이선스가 필요하다(MIT 추천). LICENSE.rst파일 제작
- url namespace만들기
- 휠을 생성하고 파이썬 패키지 인덱스로 배포하기 <- 뭐지
- 기본 예제 템플릿을 제공하라


---
## 22. 테스트, 정말 거추장스럽고 낭비일까?
### Question
- 263: 요청 인스턴스가 뭐지
- 265: 픽스쳐가 뭐지

---
## 24. 장고 성능 향상시키기
- django-debug-toolbar로 문제되는 쿼리 찾아내기
    + 중복된 쿼리, 예상보다 많은 양의 쿼리를 호출하는 ORM, 느린 쿼리
    + django-cache-panel도 추가
- 쿼리 수 줄이기
    + `select_related()` 이용하기
    + manytomany나 manytoone에서는 `prefetch_related()` 사용하기
    + 템플릿 하나당 하나 이상의 같은 쿼리가 호출된다면 해당 쿼리를 파이썬 뷰로 이동시켜 context를 변수로 처리하고 이 콘텍스트 변수에서 템플릿 ORM 호출
    + 키-값 형식을 이용할 수 있는 캐시 구현하거나 memcached등을 이용해보라.
- 일반 쿼리 빠르게 하기
    + 일반적으로 느린 쿼리들의 대부분을 인덱스로 최적화할 수 있다.
- ATOMIC_REQUESTS 비활성하기
    + 이게 뭐지
- 데이터베이스에서 삼가야 할 것들
    + DB에 로그 데이터를 저장하지 말아라
    + 일시적 데이터를 DB에 저장하지 마라
-  HTML, JS, CSS 압축과 최소화
-  업스트림 캐시나 CDN 이용

---
## 26. 장고 보안의 실전 방법론
- 장고 1.8의 보안 기능
    + XSS(cross-site scripting)
    + CSRF(cross-site request forgery)
    + SQL 인젝션
    + Clickjacking
    + secure cookie를 포함한 TLS, HTTPS. HSTS지원
    + 기본 설정으로 SHA256과 PBKDF2알고리즘을 이용한 안전 패스워드 저장
    + 자동 HTML 이스케이핑
    + expat파서를 통한 xml폭탄 공격 대비
    + 강력해진 JSON, YAML, XML직렬화/역직렬화 도구
- 상용 환경에서 debug모드 끄기
    + allowed_host도 반드시 설정
- 보안 키 안전하게 보관하기
- HTTPS이용하기
    + 사이트의 모든 부분(정적 리소스까지) 모두 https를 통해 서비스되어야 함
    + 방문자들이 http로 접속했다면 https로 리다이렉트되어야 한다
- 안전한 쿠키 이용하기
    + 어떤 경우에도 https가 아니면 브라우저가 쿠키를 전송하지 못하도록 해야 함
- HSTS 이용하기
- https설정 도구
- ALLOWED_HOSTS설정 이용하기
- 데이터를 수정해야 하는 http 폼에 대해서는 항상 csrf 보안을 이용하자
- XSS공격으로부터 사이트 방어하기(html 이스케이프)    
    + mark_safe보다는 장고 템플릿을 이용하자
    + js에서 이용되는 데이터엔 항상 JSON 인코딩 이용

---

## 27. 로깅 - 누구를 위한 것인가
- 로깅의 종류
    + 애플리케이션 로그
    + 서버 로그
    + 데이터베이스 로그
    + 네트워크 로그
- 로깅 왜 하느냐
    + 스택 트레이스나 디버깅 도구로는 충분하지 못할 때
- 로그 레벨
    + Critical
        * 심각한 참사 일어날거같아 급하게 주의
        * e.g. 내부적으로 구동하는 웹서비스에 의존하고 있었는데 그게 접근 불가
        * 코어 장고 코드에는 쓰이지 않는다
    + Error
        * 상용 환경의 에러
        * e.g. store.pinkfong.com 에서 특정 페이지가 404뜨고 있을 때 centry로 메일 날아옴
    + Warning
        * 중요도가 낮은 문제
        * e.g. 가짜 어드민 폼으로 django-admin-honeypot이용시 사용자가 여기 들어왔을때
    + Info
        *  유용한 상태 정보, 중요한 이벤트에 대한 응답으로 일어난 상태의 변화
- 응답 메서드는 이메일, 로그 파일, 콘솔, stdout형태로 이용될 수 있다. 센트리와  같은 애플리케이션으로 HTTP 요청 푸시를 발생시킬 수도 있다.
- 예외 처리할때 해당 예외에 대해 스택 트레이스 정보를 로그로 남기는것도 도움됨
    + Logger.exception()은 ERROR레벨에서 자동으로 트레이스백과 로그를 포함한다
    + 다른 로그 레벨에 대해서는 exec_info옵션 키워드를 이용하라
- 한 모듈당 한 개의 로거 쓰기

---

## 28. 시그널: 이용 사례와 시그널을 피할 수 있는 기술들
- 시그널은 최후의 수단이다
- 시그널 이용
    + DONT
        * 시그널이 하나의 특별한 모델에 연관되어 있으며 모델 메서드 중 하나로 이전 가능할떄. save()로 호출 가능한 경우
        * 커스텀 모델 매니저 메서드를 시그널 대신 이용할 수 있을 때
        * 특정 뷰에 연관된 시그널이 해당 뷰 안으로 이동될 수 있을 떄

    + DO
    + 음 사실 뭔소린지 잘 모르겠다

---

## 29. 유틸리티들에 대해
- core 앱 만들기
    + 비추상화(non-abstract)모델 `<-차라리 abstract모델이 있어야 하는거 아닌가`
    + 어드민 자동 발견(admin auto-discovery) 적용
    + 템플릿 태그와 필터 위치
- utils.py 
    + 여러 곳에서 공통으로 쓰이는 코드 저장
    + 모델을 좀 더 간결하게 만들기 (utils.py, helpers.py)
- 장고 내장 utils.py
    + django.contrib.humanize
        * intcomma, 텍스트 프로세싱
    + django.utils.decorators.method_decorator(decorator)
        * 함수 데코레이터
        * ?
    + django.utils.decorators.decorator_from_middleware(middleware)
    + django.utils.encoding.force_text(value)
        * 장고의 무엇이든지 파이선3의 일반 str형태, 또는 파이썬2의 unicode형태로 변환

---

## 30. 배포: PaaS
- Platform as a Service
    + 절대 PaaS에 종속되지 않도록 하자. 호스팅 제공사에 따라 구조 변경이 생길 수 있는 아키텍쳐를 최대한 피하는데 좀 더 관심 두기
- 종류
    + heroku
    + pythonanywhere
