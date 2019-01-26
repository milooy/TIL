# Django Migration Conflict

## 상황
근 한 달 이상 `Review`브랜치에서 리뷰 개발을 하고 있다.
너무 옛날 코드라 `Master`의 최신 코드와 Rebase했다.
바뀐 쿼리들을 적용하려고 `./manage.py migrate`를 치니
```shell
▶ ./manage.py migrate
CommandError: Conflicting migrations detected (0035_merge, 0033_add-ondemand in product).
To fix them run 'python manage.py makemigrations --merge'
```
migrations가 충돌났다는 에러가 떴다.

여기서 `python manage.py makemigrations --merge`를 하면 해결 될테지만, 그러면 또 `Master`브랜치에서 다시 작업할 때 끊임없이 충돌이 날 수도 있다.

`Master`브랜치의 `migrations`들은 깨끗이 두고 해결하는 방법을 찾아보자.

## 에러1 - Conflicting migrations detected!
![branch image](../img/django-migration-conflict/1.png "branch image")
`Master`, `Review` 브랜치 두 군데에서 Point모델의 수정이 일어나, 같은 넘버로 다른 수정이 일어나 넘버링이 겹치는 문제가 생겼다. 

1. `Review`브랜치에서 `0030_review.py`부터 마지막까지 migrations 파일들을 삭제
2. review앱의 migrations폴더에 있는 파일들도 모두 삭제
3. `Master`브랜치에서 최신 상태를 Pull 땡겨온다
4. 최신 코드로 `./manage.py makemigrations`를 다시 돌려준다.

그러면 Master의 migrations 파일들 밑에 내가 새로 짠 디비 파일이 깔끔하게 붙게 된다.

## 에러2 - Table already exists!
그런데 만든 ORM을 디비에 migration하려고, `./manage.py migrate`을 돌리니
```shell
django.db.utils.OperationalError: table "point_point" already exists   
```
에러가 뜨는거였다.

장고 database에서 `django_migrations`테이블을 까보니, `point`앱에서 이미 `0002_auto_어쩌구저쩌구`로 이미 migration을 진행했던 것이다.

현재 point는 migrations파일을 다 지우고 0001_initial.py로 통합시켜놔서, 장고가 이미 0002까지 migrate를 진행한 것으로 판단해 테이블을 만들지 않은 것이다!
(영원히 고통받는다)

```shell
./manage.py dbshell #디비 쉘에 접속한다
> .tables; # 테이블을 본다 -> point테이블이 있다!
> drop table point_point # 괴롭히던 테이블을 지운다
```

마지막으로 migrate을 한다.
```shell
./manage.py migrate
```

성공! 기쁘다.

