## Django Aggregation

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
{'price__max': Decimal('81.20')}

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


## Refer
https://docs.djangoproject.com/en/1.9/topics/db/aggregation/
http://raccoonyy.github.io/conditional-annotate-with-django-query/
http://raccoonyy.github.io/django-annotate-and-aggregate-like-as-excel/
