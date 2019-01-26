# [Django] 서버사이드 이미지 크롭/리사이징 하기

> 프론트엔드에서 Javascript로 온갖 삽질을 하다가, 그냥 서버사이드에서 처리하기로 했다.
훨씬 깔끔하게 끝났다(물론 이것도 삽질했지만 ^^).
HTML Canvas로 한 프론트 리사이징은 이미지 퀄리티도 안좋게 떨어진다. 웬만하면 파일 처리는 서버사이드에서 하는 것을 추천한다.

## 상황
내 모임 정보를 업로드 할 때, 썸네일을 올리면 자동으로 정사각형으로 크롭, 리사이징 시켜서 서버에 업로드 하고싶다.
Django Form에서 `save()`함수를 오버라이드 해서 전처리하는 방식으로 해결하자.

## Forms.py
```python
class MeetupEditForm(forms.ModelForm):
    desc = forms.CharField(widget=SummernoteWidget())

    class Meta:
        model = Meetup
        exclude = ('created_date', 'modified_date', )
        fields = ('title', 'desc', 'image_file', 'location', 'meetup_date', 'lat', 'lon', 'tags', )

    # (선택) 아래의 save함수에서 self.request.user를 쓰기 위해 views.py에서 전달해주었다.
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request')
        super(MeetupEditForm, self).__init__(*args, **kwargs)

    # form이 save될때 불리는 함수. 오버라이드해서 원하는 기능을 넣는다.
    def save(self, commit=True):
        instance = super(MeetupEditForm, self).save(commit=False)
        instance.author = self.request.user
        instance.published_date = timezone.now()

        # 이미지파일이 있으면, 리사이즈/크롭 한다.
        if instance.image_file:
            instance.image_file = self.rescale(self.cleaned_data.get('image_file'), 600, 600, force=True)
        if commit:
            instance.save()
        return instance
```
form save를 할 때, `commit=False`로 디비에 쓰는걸 잠시 막아두고, 전처리를 한다.
form에서 받은 이미지 파일과 원하는 width, height를 넘기면 리사이즈된 이미지파일이 넘어오는 함수를 짠다.

```python
def rescale(self, data, width, height, force=True):
        from io import BytesIO
        from PIL import Image as pil
        """
        Rescale the given image, optionally cropping it to make sure the result image has the specified width and height.
        https://djangosnippets.org/snippets/224/
        """
        max_width = width
        max_height = height

        input_file = BytesIO(data.read())
        img = pil.open(input_file)
        if not force:
            img.thumbnail((max_width, max_height), pil.ANTIALIAS)
        else:
            src_width, src_height = img.size
            src_ratio = float(src_width) / float(src_height)
            dst_width, dst_height = max_width, max_height
            dst_ratio = float(dst_width) / float(dst_height)

            if dst_ratio < src_ratio:
                crop_height = src_height
                crop_width = crop_height * dst_ratio
                x_offset = int(src_width - crop_width) // 2
                y_offset = 0
            else:
                crop_width = src_width
                crop_height = crop_width / dst_ratio
                x_offset = 0
                y_offset = int(src_height - crop_height) // 3
            img = img.crop((x_offset, y_offset, x_offset+int(crop_width), y_offset+int(crop_height)))
            img = img.resize((dst_width, dst_height), pil.ANTIALIAS)

        image_file = BytesIO()
        img.save(image_file, 'JPEG')
        data.file = image_file
        return data
```
MeetupEditForm클래스에 넣어준다.

https://djangosnippets.org/snippets/224/ 를 python3버전으로 바꿨다.
- `StringIO`를 `BytesIO`로 변경
- offset계산시 나눌 때 `/`말고 `//`로 변경
- return하는 데이터 변경

`force`옵션을 켜면 지정한 width, height비율로 크롭되고, 끄면 max width, max height로만 적용된다.

## views.py
```python
class MeetupFormView(FormView):
    template_name = "meetup_edit.html"
    form_class = MeetupEditForm

    def get_success_url(self):
        return reverse('meetup_list')

    # form.py에 kwargs 넘기기 위함
    def get_form_kwargs(self):
        kw = super(MeetupFormView, self).get_form_kwargs()
        kw['request'] = self.request
        return kw

    def form_valid(self, form):
        form.save(self.request)
        return super(MeetupFormView, self).form_valid(form)
```
view에서 save가 호출되면, form에서 우리가 지정한 함수들이 실행된다.

## Refer
https://djangosnippets.org/snippets/224/
