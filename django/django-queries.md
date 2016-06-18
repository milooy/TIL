# Making Queries
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
.save하면 `UPDATE` SQL문을 날린다. 


## Refer
https://docs.djangoproject.com/en/1.9/topics/db/queries/
