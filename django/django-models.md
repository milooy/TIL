# Django Models

## 필드(Fields)
```python
from django.db import models

class Musician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    instrument = models.CharField(max_length=100)

class Album(models.Model):
    artist = models.ForeignKey(Musician, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    release_date = models.DateField()
    num_stars = models.IntegerField()
```

### Verbose field names
ForeignKey, ManyToManyField, OneToOneField빼고 모든 필드는 첫 인자로(옵션) `Verbose name`을 받는다. 따로 지정하지 않으면 필드명으로 대신한다(언더스코어를 스페이스로 바꾸어서) 
```python
first_name = models.CharField("성", max_length=30)
```

ForeignKey, ManyToManyField, OneToOneField는 첫 인자가 모델 클래스이므로, `verbose_name` 키워드 인자를 줄 수 있다.
```python
dogs = models.ManyToManyField(Dog, verbose_name='개 리스트')
```

## 관계(Relationships)
1. Many-to-one
```python
class Kind(models.Model):
    # 개 종류

class Dog(models.Model):
    kind = models.ForeignKey(Kind, on_delete=models.CASCADE) # 개마다 종류가 있음

```

2. Many-to-many
```python
class Food(models.Model):
    # 음식
    # 음식에 dogs가 있을 수도 있겠지만, Dog에 foods가 있는 것이 더 명확하므로 그렇게 한다.

class Dog(models.Model):
    foods = models.ManyToManyField(Food) # 개마다 먹을 수 있는 여러가지 음식. 복수 형태.
    
```

좀 더 복잡한 M2M관계를 표현하기 위해서는 별도의 argument를 넣는다.
```python
class Person(models.Model): #인간
    name = models.CharField

class Group(models.Model): #뮤직 그룹
    name = models.CharField
    # 그룹엔 멤버십으로 연결된 멤버들이 있다.
    members = models.ManyToManyField(Person, through='Membership') #멤버스는 멤버십을 통해 생긴다.

class Membership(models.Model): #뮤지컬 멤버십
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_joined = models.DateField()
    invite_reason = models.CharField(max_length=64)
```

```python
>>> ringo = Person.objects.create(name="Ringo Starr")
>>> paul = Person.objects.create(name="Paul McCartney")
>>> beatles = Group.objects.create(name="The Beatles")

# 멤버십에 person, group 넣어서 만들면 그 그룹에 person이 들어가서 생긴다.
>>> m1 = Membership(person=ringo, group=beatles, 
...     date_joined=date(1962, 8, 16),
...     invite_reason="Needed a new drummer.")
>>> m1.save()
>>> beatles.members.all()
[<Person: Ringo Starr>]
>>> ringo.group_set.all()
[<Group: The Beatles>]

>>> m2 = Membership.objects.create(person=paul, group=beatles,
...     date_joined=date(1960, 8, 1),
...     invite_reason="Wanted to form a band.")
>>> beatles.members.all()
[<Person: Ringo Starr>, <Person: Paul McCartney>]

# 아래 3개처럼 추가는 안된다.
>>> beatles.members.add(john)
>>> beatles.members.create(name="George Harrison")
>>> beatles.members = [john, paul, ringo, george]

# intermediate model로 만들었어도, 쿼리 아래처럼 평범하게 날릴 수 있다.
>>> Group.objects.filter(members__name__startswith='Paul')
[<Group: The Beatles>]

# intermediate model 만들때 attribute로도 쿼리 날릴 수 있다.
>>> Person.objects.filter(
...     group__name='The Beatles',
...     membership__date_joined__gt=date(1961,1,1))
```

3. One-to-one
다른 오브젝트를 extend받을 때 유용하다.

## Meta 옵션
모델 필드가 아닌 데이터들을 담는다.

```python
class Ox(models.Model):
    horn_length = models.IntegerField()

    class Meta:
        ordering = ["horn_length"] # 순서 정의
        verbose_name_plural = "oxen"
```

## Model Attributes - objects
모델의 가장 중요한 특징은 `Manager`이다. 디비의 인스턴스를 반환. 
커스텀 Manager를 써주지 않으면, 기본은 'objects'라고 잡힌다.
```python
class Person(models.Model):
    people = models.Manager()
```
위와 같이 써주면 `Person.objects`는 AttributeError를 반환하지만,
`Person.people.all()`은 모든 Person오브젝트들을 반환한다.

## 모델에 메서드 추가하기
```python
class Person(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth_date = models.DateField()

    def baby_boomer_status(self):
        "사람의 베이비 부머 status를 보여준다."
        import datetime
        if self.birth_date < datetime.date(1945, 8, 1):
            return "Pre-boomer"
        elif self.birth_date < datetime.date(1965, 1, 1):
            return "Baby boomer"
        else:
            return "Post-boomer"

    def _get_full_name(self):
        "사람의 풀네임을 반환한다."
        return '%s %s' % (self.first_name, self.last_name)
    full_name = property(_get_full_name)
```
- `__str__() `: python3의 메서드.
- `__unicode__() `: python2에서 위와 같다.
- `get_absolute_url()`: 오브젝트의 URL. 어드민이나 오브젝트에 url이 필요할 때 쓰인다.

## 미리 정의된 메서드 오버라이드
종종 `save()`랑 `delete()`를 오버라이드 할 일이 생긴다.
```python
class Blog(models.Model):
    name = models.CharField(max_length=100)
 
    def save(self, *args, **kwargs):
        do_something()
        super(Blog, self).save(*args, **kwargs) # 원래 save() method 부르기
        do_something_else()
```
superclass method를 부르는거 중요. 안그러면 디폴트 행동이 불리지 않고, 디비가 touched되지 않을것이다.

## 모델 상속(Inheritance)
### Abstract base classes
공통적 정보를 다수의 모델에 넣고 싶을 때 유용.
```python
class CommonInfo(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()

    class Meta:
        abstract = True #abstract = True로 해준다.

class Student(CommonInfo): #여기에 상속
    home_group = models.CharField(max_length=5)
```

related_name이 겹치지 않도록 unique한 reverse_name을 적어준다.
```python
from django.db import models

class Base(models.Model):
    m2m = models.ManyToManyField(OtherModel, related_name="%(app_label)s_%(class)s_related")

    class Meta:
        abstract = True

class ChildA(Base): # related_name: common_childa_related
    pass

class ChildB(Base): # related_name: common_childb_related
    pass
```

## refer
https://docs.djangoproject.com/es/1.9/topics/db/models/
