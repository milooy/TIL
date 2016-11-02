# Django Cache

## 캐시
- 캐시: 고비용의 계산 결과를 저장해둠으로써 다음 번에는 실행하지 않아도 되도록. 
- 순서
    + 1. URL이 오면, 그 페이지를 먼저 캐시에서 찾는다.
    + 2. 캐시에 있다 -> 캐시된 페이지를 보여준다
    + 3. 캐시에 없다 -> 페이지를 가져오고 캐시에 저장하고, 보여준다.

## 장고의 캐시
- 설정은 settings > CACHES에서 한다.

### Memcached
- 메모리 기반 캐시 프레임웍(메모리-캐시: 멤캐시).
- Facebook, 위키피디아에서 디비 접근 줄이기 위해 사용.
- '키-값'쌍으로 메모리에 저장하고 가져온다.
- 데몬(백그라운드로 실행되며, 사용자 인터페이스가 없는 프로그램)으로서 동작, RAM의 특정 용량을 차지.
- 모든 데이터는 메모리에 직접 저장되므로, 데이터베이스 또는 파일 시스템 사용에 오버해드가 없다.
- memcached 바인딩으로는 `python-memcached`, `pylibmc`가 많이 쓰임.
- 장점: 여러 서버에서 캐시를 공유할 수 있다. (Memcached 데몬을 여러 머신에서 실행시킬 수 있다.)
- 단점: 캐시된 데이터는 메모리에 저장되기 때문에, 만약 서버에 장애가 발생하면 데이터를 잃게 된다. (임시적으로만 사용해야 함)

### 데이터베이스 캐싱
- 캐시 백엔드로 데이터베이스 테이블 사용하기

### 파일 시스템 캐싱
- 캐시된 아이템을 파일 시스템에 저장

### 지역 메모리 캐싱
- LocMemcache
Refer: https://docs.djangoproject.com/ja/1.9/topics/cache/#local-memory-caching

### 캐시 인자
- `TIMEOUT`: 기본은 300초(5분). None으로 하면 캐시 키가 절대 만료되지 않는다.
- OPTIONS: 캐시 백엔드에 전달할 선택사항들. 각 백엔드에 따라 다름.
    + MAX_ENTRIES
    + CULL_FREQUENCY
- KEY_PREFIX: 장고 서버에서 사용되는 모든 캐시 기본 접두어
- VERSION: 장고 서버에 의해 생성된 캐시 키들의 기본 버전 번호

---

### 사이트별 캐시
settings의 middleware에 아래를 넣어준다.
```python
MIDDLEWARE = [
    'django.middleware.cache.UpdateCacheMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.cache.FetchFromCacheMiddleware',
]
```

### 뷰 별 캐시
```python
from django.views.decorators.cache import cache_page

@cache_page(60 * 15)
def my_view(request):
```
이 데코레이터를 쓰면 view의 response를 자동으로 캐시해준다.

### URLconf에서 뷰별로 캐시
위 데코레이터 방식보다 이게 더 선호
```python
from django.views.decorators.cache import cache_page

urlpatterns = [
    url(r'^foo/([0-9]{1,2})/$', cache_page(60 * 15)(my_view)),
]
```

### Template fragment caching
캐시 템플릿 태그를 쓰고 싶으면, 템플릿 코드 위에 `{% load cache %} `를 넣어줘라.
```python
{% load cache %}
{% cache 500 sidebar %} # 캐시 / 타임아웃시간 / 이름 / 동적이름(object.id)같은거 더 넣을 수 있음.
    .. sidebar ..
{% endcache %}
```


## Refer
https://django-document-korean.readthedocs.io/en/django_15_i18n/topics/cache.html
https://docs.djangoproject.com/en/1.10/topics/cache/
