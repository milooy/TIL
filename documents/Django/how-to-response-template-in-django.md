
# Django URL redirections

## Django shortcut functions
### render()
`render(request, template_name, context=None, context_instance=_context_instance_undefined, content_type=None, status=None, current_app=_current_app_undefined, dirs=_dirs_undefined, using=None)`
> 템플릿과 컨텍스트를 합쳐서 `HttpResponse` 오브젝트를 리턴함.

```python
from django.shortcuts import render

def my_view1(request):
    # View code here...
    return render(request, 'myapp/index.html', {"foo": "bar"},
        content_type="application/xhtml+xml")


def my_view2(request):
    # View code here...
    t = loader.get_template('myapp/index.html')
    c = {'foo': 'bar'}
    return HttpResponse(t.render(c, request),
        content_type="application/xhtml+xml")
```
(my_view1과 my_view2는 동일한 코드)

### render_to_response()
`render_to_response(template_name, context=None, context_instance=_context_instance_undefined, content_type=None, status=None, dirs=_dirs_undefined, using=None)`
> 별로 권장하지 않음. render()이랑 비슷한데 `response`에서 `request`가 불가능한 차이가 있다.

```python
return render_to_response('my_template.html',
                          my_context,
                          context_instance=RequestContext(request))
```

### redirect()
`redirect(to, permanent=False, *args, **kwargs)`
> 패스된 인자를 가지고 `HttpResponseRedirect`를 리턴한다

```python
def my_view(request):
    ...
    # return redirect('/some/url/') # 요렇게 하드코드 URL로 써도 됨.
    return redirect('some-view-name', foo='bar')

```

### get_object_or_404()
`get_object_or_404(klass, *args, **kwargs)`
> 준 모델을 get()해오지만, 모델이 `DoesNotExist`익셉션 되면 `Http404`를 raise한다.

```python
from django.shortcuts import get_object_or_404

def my_view(request):
    my_object = get_object_or_404(MyModel, pk=1)
```

## [django.core.urlresolvers utility functions](https://docs.djangoproject.com/en/1.9/ref/urlresolvers/)
### reverse()
`reverse(viewname, urlconf=None, args=None, kwargs=None, current_app=None)`
> urls.py에서 만든 url name 사용할 수 있음

```python
reverse('news-archive')

def myview(request):
    # url이 argument를 받는 경우
    return HttpResponseRedirect(reverse('arch-summary', args=[1945])) 


# kwargs를 쓰는 방법. '/admin/auth/'로 간다.
reverse('admin:app_list', kwargs={'app_label': 'auth'})
```


## HttpRespose VS HttpResponseRedirect
[링크](http://stackoverflow.com/questions/1921523/django-what-is-the-difference-b-w-httpresponse-vs-httpresponseredirect-vs-rende)
## HttpResponse
`response = HttpResponse("Here's the text of the Web page.")`
- HTTP코드가 200(ok)이고 생성자로 전달된 컨텐츠를 포함한 `HttpResponse`오브젝트를 만든다.
- 보통 작은 response에서만 쓴다. (ajax로 받은 데이터나, 작은 number 등)

## HttpResponseRedirect
`HttpResponseRedirect("http://example.com/")`
- HTTP코드가 302(Found/Moved temporarily)인 `HttpResponse`오브젝트를 만든다.
- 다른 페이지로 redirect할때만 써야한다(e.g. 폼 POST전송 성공 이후)

## 결론
`redirect`는 URL을 만들고 리다이렉트시키기 위해 `reverse`를 자동으로 호출하는 `HttpResponseRedirect`의 wrapper이다. 

```
redirect is merely a wrapper around HttpResponseRedirect that automatically calls reverse for you to create the URL to redirect to. As a result, the parameters you pass to it, aren't arbitrary, they must be same you would pass to reverse and, specifically, only those required to create the URL.

Many people seem to have troubles understanding that data can't just be arbitrarily passed to a view. HTTP is a stateless protocol: each request exists on it's own, as if user had never been to any other page of the site. The concept of a session was created to provide a sense of "state" to a cohesive unit such as a site. With sessions, data is stored in some form of persistent storage and a "key" to look up that data is given to the client (typically the user's browser). On the next page load, the client sends the key back to the server, and the server uses it to look up the data to give the appearance of state.

As a result, if you need data from one view available in another, you need to add it to the session, do your redirect, and look up the data in the session from the next view.
```

...여전히 헷갈린다.

## refer
http://makerj.tistory.com/220
http://stackoverflow.com/questions/9488874/django-redirect-with-parameters

