# HTML Label

https://developer.mozilla.org/ko/docs/Web/HTML/Element/label

## 개요
HTML Label 요소 (`<label>`)는 유저 인터페이스 아이템의 캡션을 나타낼 때 사용합니다. 이는 Label 안에 컨트롤 요소를 넣거나, 혹은 for 속성을 사용해 컨트롤 요소를 제어할 수 있습니다. 이는 label element의 labeled control라고 불립니다.

## 속성
이 요소는 global attributes를 포함하고 있습니다.

### accesskey
A shortcut key to access this element from the keyboard.

### for
The ID of a labelable form-related element in the same document as the label element. The first such element in the document with an ID matching the value of the for attribute is the labeled control for this label element.
Note: A label element can have both a for attribute and a contained control element, as long as the for attribute points to the contained control element.

### form
The form element that the label element is associated with (its form owner). The value of the attribute must be an ID of a `<form>` element in the same document. If this attribute is not specified, this `<label>` element must be a descendant of a `<form>` element. This attribute enables you to place label elements anywhere within a document, not just as descendants of their form elements.

## 예제
간단한 label 예제
```html
<label>Click me <input type="text" id="User" name="Name" /></label>
```

Using the "for" attribute
```html
<label for="User">Click me</label>
<input type="text" id="User" name="Name" />
```
