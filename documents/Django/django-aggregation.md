# Django Aggregation

> ag·gre·ga·tion [æ̀ɡriɡéiʃən]
> 명사
> 1. [U] 집합, 집성(集成), 집적(集積)

## 예제로 쓸 모델
```python
from django.db import models

class Author(models.Model): # 작가
    name = models.CharField(max_length=100)
    age = models.IntegerField()

class Publisher(models.Model): # 출판사
    name = models.CharField(max_length=300)
    num_awards = models.IntegerField()

class Book(models.Model): # 책
    name = models.CharField(max_length=300)
    pages = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.FloatField()
    authors = models.ManyToManyField(Author) # 다수 작가
    publisher = models.ForeignKey(Publisher) # 한 출판사
    pubdate = models.DateField()

class Store(models.Model): # 상점
    name = models.CharField(max_length=300)
    books = models.ManyToManyField(Book) # 다수 책
    registered_users = models.PositiveIntegerField()
```

## Cheat Sheet
```python
# 책 다 세기
>>> Book.objects.count()
2452

# 출판사가 지앤선인 책들 세기
>>> Book.objects.filter(publisher__name='지앤선').count()
73

# 모든 책들의 가격 평균
>>> from django.db.models import Avg
>>> Book.objects.all().aggregate(Avg('price'))
{'price__avg': 34.35}

# 모든 책들 중 가장 비싼 가격
>>> Book.objects.all().aggregate(Max('price'))
{'price__max':  Decimal('81.20')}

# 'price_per_page'란 이름으로, 장당 가격을 구한다.
>>> Book.objects.all().aggregate(
...    price_per_page=Sum(F('price')/F('pages'), output_field=FloatField()))
{'price_per_page': 0.4470664529184653}

# All the following queries involve traversing the Book<->Publisher
# foreign key relationship backwards.

# 출판사마다 reverse해서 book을 가져오고, 그거 갯수 샌다.
>>> pubs = Publisher.objects.annotate(num_books=Count('book'))
>>> pubs
[<Publisher BaloneyPress>, <Publisher SalamiPress>, ...]
>>> pubs[0].num_books
73

# 출판사 reverse book 갯수가 많은 탑 5개
# The top 5 publishers, in order by number of books.
>>> pubs = Publisher.objects.annotate(num_books=Count('book')).order_by('-num_books')[:5]
>>> pubs[0].num_books
1323
```

## 쿼리셋에 aggreates하기
장고에선 두 가지 방식으로 aggreates를 만들 수 있다. 

### 1. 전체 쿼리셋에 Summary values 만들기
e.g. 모든 책에 대한 평균 가격 구하기
```python
>>> Book.objects.aggregate(Avg('price'))
{'price__avg': 34.35}

>>> Book.objects.aggregate(average_price=Avg('price'))
{'average_price': 34.35} # 이름 명시

>>> Book.objects.aggregate(Avg('price'), Max('price'), Min('price'))
{'price__avg': 34.35, 'price__max': Decimal('81.20'), 'price__min': Decimal('12.99')} # 다중 반환
```
aggreate()는 Queryset의 Terminal clause로, 키-밸류 쌍을 반환한다.

### 2. 쿼리셋 각 요소에 aggregates하기
e.g. 책 리스트가 있을 때, 각 책마다 저자가 몇 명 있는지 계산.
이는 `annotate()`으로 만들 수 있다. `aggreate()`랑은 다르게 terminal clause가 아니고 QuerySet을 반환한다. 
Book과 Authors는 M2M 관계이다. 
```python
# 책마다 저자가 몇 명 있는지 계산된 책 리스트 반환
>>> q = Book.objects.annotate(Count('authors'))

>>> q[0]
<Book: The Definitive Guide to Django>
>>> q[0].authors__count
2

# 이름 지어주기
>>> q = Book.objects.annotate(num_authors=Count('authors'))
>>> q[0].num_authors
2
```

## Joins and aggregates
Store마다 책들의 min, max 가격 표기
Store에 M2M으로 연결되어있는 books를 찾아, books모델의 price를 비교.
더블 언더스코어로 관계된 모델을 찾아갈 수 있다.
```python
>>> Store.objects.annotate(min_price=Min('books__price'), max_price=Max('books__price'))
```

### 역참조
Publisher엔 Book이 거꾸로 Foriegn key로 연결되어있다. Lowercase로 역참조를 할 수 있다.
```python
>>> Publisher.objects.annotate(Count('book'))
```

## Refer
https://docs.djangoproject.com/en/1.9/topics/db/aggregation/
http://raccoonyy.github.io/conditional-annotate-with-django-query/
http://raccoonyy.github.io/django-annotate-and-aggregate-like-as-excel/
