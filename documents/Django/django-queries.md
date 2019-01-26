# Django Queries

앞으로 예시들에 사용할 모델. 
글 하나에 블로그 여러 개 중 하나가 연결되어있고, author는 m2m.
```python
class Blog(models.Model): # 블로그
    name = models.CharField(max_length=100)
    tagline = models.TextField()

    def __str__(self):
        return self.name

class Author(models.Model): # 작가
    name = models.CharField(max_length=50)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Entry(models.Model): # 글
    blog = models.ForeignKey(Blog)
    headline = models.CharField(max_length=255)
    body_text = models.TextField()
    pub_date = models.DateField()
    mod_date = models.DateField()
    authors = models.ManyToManyField(Author)
    n_comments = models.IntegerField()
    n_pingbacks = models.IntegerField()
    rating = models.IntegerField()

    def __str__(self):
        return self.headline
```

## 오브젝트 만들기
```python
b = Blog(name='Beatles Blog', tagline='All the latest Beatles news.') # 모델 인스턴스화
b.save() # 디비에 저장. SQL의 INSERT를 호출한다. 이거 하기 전까지는 디비를 건들지 않는다.
```
`create()`는 create하고 save까지 한다.

## 오브젝트 바뀐거 저장
```python
>>> b5.name = 'New name'
>>> b5.save()
```
save()하면 `UPDATE` SQL문을 날린다. 

### foreignkey 필드 저장
```python
entry = Entry.objects.get(pk=1)
yoolmoo_blog = Blog.objects.get(name='유르무르 블로그')
entry.blog = yoolmoo_blog
entry.save 
```

### ManyToManyField 저장
```python
jay = Author.objects.create(name='Jay')
entry.authors.add(jay)

josh = Author.objects.create(name='Josh')
yoolmoo = Author.objects.create(name='Yoolmoo')
entry.authors.add(josh, yoolmoo)
```
add로 추가한다.

## 오브젝트 가져오기 (Retrieving objects)
오브젝트를 retrieve하면, Manager를 통해 Queryset을 만든다. Filters는 쿼리를 좁힌다. 모든 모델들은 하나 이상의 Manager를 가진다. Manager는 기본으로 `objects`라는 이름.
Queryset은 디비에서 나온 오브젝트들의 컬렉션이다.
- `QuerySet` == `SELECT`
- `filter` == `WHERE`, `LIMIT`
```python
>>> Blog.objects
<django.db.models.manager.Manager object at ...>
>>> b = Blog(name='Foo', tagline='Bar')
>>> b.objects
Traceback:
    ...
AttributeError: "Manager isn't accessible via Blog instances."
```
Managers는 모델 클래스에서만 접근 가능한다.

### 모든 오브젝트 가져오기
```python
all_entries = Entry.objects.all()
```
Manager의 all()메서드를 쓴다. 디비 모든 오브젝트의 쿼리셋을 반환한다.

## Filter로 오브젝트 걸러서 가져오기
```python
Entry.objects.filter(pub_date__year=2006) # all() 안써도 된다.
Entry.objects.all().filter(pub_date__year=2006)

>>> Entry.objects.filter(
...     headline__startswith='What'
... ).exclude(
...     pub_date__gte=datetime.date.today()
... ).filter(
...     pub_date__gte=datetime(2005, 1, 30)
... )
```
Queryset이 evaluated되기 전까진 장고는 쿼리를 돌리지 않는다.

## get()으로 싱글 오브젝트 가져오기
filter()는 싱글 오브젝트를 반환하더라도 쿼리셋으로 반환한다.
하나 오브젝트를 가져오려면 get()을써라.
```python
one_entry = Entry.objects.get(pk=1)
```
get 안에 filter처럼 쓰면 된다.
쿼리 반환값이 없을 때 get()은 `DoesNotExist` exception을 뱉는다. 반환값이 1 이상일때는 `MultipleObjectsReturned`.

## 주석(annotate)
Queryset의 각 오브젝트마다 annotate하기.
```python
>>> from django.db.models import Count
>>> q = Blog.objects.annotate(Count('entry'))
# 첫 번째 블로그 이름
>>> q[0].name
'율무네 블로그'
# 첫 번째 블로그의 엔트리 숫자
>>> q[0].entry__count
10

>>> q = Blog.objects.annotate(number_of_entries=Count('entry'))
# 첫 번째 블로그의 엔트리 숫자. 지정한 이름으로 가져오기
>>> q[0].number_of_entries
42
```

## 쿼리셋 제한하기
파이썬 Array-slicing 문법을 사용해서 쿼리셋의 서브셋 가져오기.
SQL의  `LIMIT`, `OFFSET`과 비슷하다.

```python
Entry.objects.all()[:5] # 앞에서부터 5개 오브젝트
Entry.objects.all()[5:10] # 6번부터 10번까지 
Entry.objects.all()[-1] # 에러난다
Entry.objects.all()[:10:2] # 10번째까지 모든 오브젝트들의 2번째 오브젝트
Entry.objects.order_by('headline')[0]
```

## Field lookups
`field이름__lookuptype=value`이렇게 쓰면 된다.
```python
Entry.objects.filter(pub_date__lte='2006-01-01')
Entry.objects.filter(blog_id=4) # foreignkey일땐 _id 서픽스를 붙여서 primary key를 찾는다.

Entry.objects.get(headline__exact="개발자 생활백서") # headline이 '개발자 생활백서'인 것을 찾는다.

Blog.objects.get(id__exact=14)  # Explicit form
Blog.objects.get(id=14)         # __exact is implied. 위랑 같다.

Blog.objects.get(name__iexact="beatles blog") # 대소문자 구분 X

Entry.objects.get(headline__contains='Lennon') # 포함
```

## Span relationships의 Lookups
`JOIN`을 자동으로 해준다.
```python
Entry.objects.filter(blog__name='율무 블로그') # 블로그모델의 name필드가 `율무 블로그`
```

Reverse relationship도 참조 가능. 모델 이름을 소문자로 쓴다.
```python
Blog.objects.filter(entry__headline__contains='율무') # 거꾸로 참조

# 두 조건 모두 만족
Blog.objects.filter(entry__authors__isnull=False, entry__authors__name__isnull=True)
```

### Spanning multi-valued relationships
M2M필드나 reverse foreignkey를 필터링할때, 두 가지 종류의 필터가 있다. 
- Blog / Entry (one-to-many)
    + 엔트리 제목이 Lennon이면서 2008년에 발행된 블로그는 1개
    + 엔트리 제목이 Lennon이면서 2008년에 발행된 블로그를 찾고싶다.
```python
Blog.objects.filter(entry__headline__contains='Lennon', entry__pub_date__year=2008) # 엔트리 제목이 Lennon포함하면서 엔트리 발행일이 2008

Blog.objects.filter(entry__headline__contains='Lennon').filter(entry__pub_date__year=2008) # 엔트리 제목이 Lennon포함하는 블로그를 찾고, 거기서 엔트리 발행일이 2008인 블로그를 찾는다. 위의 쿼리셋과 다를 수 있다.
```

## 모델의 필드를 참조할 수 있는 필터
특정 모델 필드랑 다른 필드 값 비교할 때도 쓸 수 있다.
```python
>>> from django.db.models import F
>>> Entry.objects.filter(n_comments__gt=F('n_pingbacks')) # 커멘트가 핑백보다 수가 많은 Entry 가져오기
>>> Entry.objects.filter(rating__lt=F('n_comments') + F('n_pingbacks')) # 레이팅이 커멘트+핑백보다 적은 엔트리 가져오기
>>> Entry.objects.filter(authors__name=F('blog__name')) # 관계를 span하기 위해선 __를 쓴다. 
>>> Entry.objects.filter(mod_date__gt=F('pub_date') + timedelta(days=3)) # 발행일보다 3일 후 날짜보다 큰 수정일을 가진 엔트리를 가져와라
```

## pk lookup shortcut
`primary key`를 좀 더 편하게 참조할 수 있게 `pk`라고 shortcut을 만듦
```python
>>> Blog.objects.get(id__exact=14) # Explicit form
>>> Blog.objects.get(id=14) # __exact is implied
>>> Blog.objects.get(pk=14) # pk implies id__exact

# pk가 1이나 4나 7인것
>>> Blog.objects.filter(pk__in=[1,4,7])

# pk가 14보다 큰 것
>>> Blog.objects.filter(pk__gt=14)

>>> Entry.objects.filter(blog__pk=3) # entry의 blog의 pk
```

## 쿼리셋 캐싱하기
```python
>>> queryset = Entry.objects.all() # 재활용할거 할당해두기
>>> print([p.headline for p in queryset])  
>>> print([p.pub_date for p in queryset])

>>> [entry for entry in queryset] # 데이터베이스 쿼리하기
>>> print queryset[5] # 캐시 쓰기
>>> print queryset[5] # 캐시 쓰기
```

## Q 오브젝트로 복잡한 lookups 만들기
filter, exclude, get등에 쓸 수 있다.
```python
from django.db.models import Q
Q(question__startswith='What')
Poll.objects.get(
    Q(question__startswith='Who'),
    Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6)) # OR연산
)
```

## 오브젝트 삭제
```python
e.delete()
```

## 다중 오브젝트 한번에 업데이트 하기
```python
# pub_date가 2007인 모든 엔트리 헤드라인 업데이트하기
Entry.objects.filter(pub_date__year=2007).update(headline='Everything is the same')

# 모든 엔트리 업데이트
>>> Entry.objects.all().update(blog=b)
```
update 메서드는 SQL문으로 바뀌어 바로 적용된다.

## Related objects
### 다대일(One-to-many)
**Forward**
`Foreignkey`로 연결했으면 그냥 `.`으로 호출 가능
```python
>>> e = Entry.objects.get(id=2)
>>> e.blog = some_blog
>>> e.save() #이거 해야 저장됨

>>> e = Entry.objects.get(id=2)
>>> print(e.blog)  # e에서 블로그를 가져올 때 DB를 건드린다.
>>> print(e.blog)  # 캐시 써서 디비를 건드리지 않는다.

>>> e = Entry.objects.select_related().get(id=2) #select_related()
>>> print(e.blog)  # 캐시 써서 디비를 건드리지 않는다.
>>> print(e.blog)  # 캐시 써서 디비를 건드리지 않는다.
```

**Backward**
모델이 `ForeignKey`를 갖고 있으면, 
```python
>>> b = Blog.objects.get(id=1)
>>> b.entry_set.all() # 거꾸로 연결되어있던 Entry를 소문자로 바꾸고, 뒤에 _set을 붙여주면 블로그랑 연결된 모든 entry의 쿼리셋 가져온다.

>>> b.entry_set.filter(headline__contains='Lennon')
>>> b.entry_set.count()
```

`related_name`파라미터를 ForeignKey만들때 쓰면 `FOO_set`을 오버라이드 할 수 있다.
```python
# related_name 지정해두기
 blog = ForeignKey(Blog, on_delete=models.CASCADE, related_name='entries')

# related_name으로 불러오기
>>> b = Blog.objects.get(id=1)
>>> b.entries.all()
```

### 다대다(Many-to-many)
```python
e = Entry.objects.get(id=3)
e.authors.all() # Returns all Author objects for this Entry.
e.authors.count()
e.authors.filter(name__contains='John')

a = Author.objects.get(id=5)
a.entry_set.all() # Returns all Entry objects for this Author.
```

## Refer
https://docs.djangoproject.com/en/1.9/topics/db/queries/
