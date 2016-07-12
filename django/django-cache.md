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
- 데몬: 백그라운드로 실행되며, 사용자 인터페이스가 없는 프로그램.
- 모든 데이터는 메모리에 직접 저장되므로, 데이터베이스 또는 파일 시스템 사용에 오버해드가 없다.
- `python-memcached`, `pylibmc`가 많이 쓰임.

### Local-memory caching
Refer: https://docs.djangoproject.com/ja/1.9/topics/cache/#local-memory-caching

### Arguments
- `TIMEOUT`: 기본은 300초(5분). None으로 하면 캐시 키가 절대 만료되지 않는다.

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
