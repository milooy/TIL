# Javascript DOM트리 활용하기

## 1. 요소에 접근하기
### 하나의 요소 노드를 선택하기
- getElementById(): 요소 유일한 id특성값 이용
- querySelector(): CSS선택자 이용. 일치하는 요소들 중 첫 번째 리턴
- 또한, 돔 트리 내에서 한 요소로부터 다른요소 탐색해갈수 있다.

### 여러개의 노드 선택
- getElementByClassName() 
- getElementByTagName()
- querySelectorAll() *좀 느리다*

###요소 노드 사이 탐색
- parentNode : 현재요소의 부모노드 선택 (하나만 리턴)
- previousSibling / nextSibling : 현재 돔트리내의 이전/다음 형제요소
- firstChild/lastChild : 현재 요소의 첫/마지막 자식노드

## 2. 요소 조작하기
### 텍스트 노드에 접근/수정
li요소 선택 후 firstChild속성을 사용해 텍스트 노드를 선택.
- nodeValue: 텍스트 노드의 유일한 속성. 

### HTML내용 조작
- innerHTML : 이 하나의 속성을 통해 모든 자식 요소와 텍스트 콘텐츠에 접근 가능 *보안에 취약*
- textContent : 특정 요소의 텍스트 콘텐츠에만 접근
- createElement()
- createTextNode()
- appendChild() / removeChild()

### 특성 값에 접근/수정
- className / id
- hasAttribute()
- getAttribute()
- setAttribute()
- removeAttribute()
