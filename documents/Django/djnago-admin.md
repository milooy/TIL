# Django admin

## Admin Form 커스터마이즈하기
```python
class QuestionAdmin(admin.ModelAdmin):
    fields = ['pub_date', 'question_text'] # 필드 순서 조정

admin.site.register(Question, QuestionAdmin) # 두 번째 인자로 위에 만든 model admin class를 넘긴다.
```

```python
class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['question_text']}),
        ('날짜 정보', {'fields': ['pub_date']}),
    ]

admin.site.register(Question, QuestionAdmin)
```
이렇게 하면
- 헤더 없이: question_text 필드 보여짐
- '날짜 정보'헤더: pub_date 필드 보여짐

처럼 admin을 커스터마이즈 할 수 있다.

## Related objects 추가하기
Question마다 related model인 Choices들이 있는데, admin page에선 안 보이니까 추가해준다.
```python
from .models import Choice, Question


class ChoiceInline(admin.StackedInline): # admin.TabularInline로 하면 더 컴팩트하게 보여준다
    model = Choice
    extra = 3 # 3세트의 Choice 필드를 보여준다


class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['question_text']}),
        ('날짜 정보', {'fields': ['pub_date'], 'classes': ['collapse']}),
    ]
    inlines = [ChoiceInline] # Choice오브젝트가 Question 어드민 페이지에서 edit될것이다

admin.site.register(Question, QuestionAdmin)
```

## Admin List 커스터마이즈하기
기본적으로, 장고는 각 오브젝트의 `str()`를 보여준다. 
```python
class QuestionAdmin(admin.ModelAdmin):
    # ...
    list_display = ('question_text', 'pub_date') # 리스트에 이 필드들 추가
    list_filter = ['pub_date'] # 리스트에 필터 추가
    search_fields = ['question_text'] # 검색 필터 추가
```

## Refer
https://docs.djangoproject.com/en/1.9/intro/tutorial07/
