#Rebase with sourcetree

##현재상황
>브랜치를 따서 열심히 코딩하고 있었는데
>시간이 흘러 기존 코드가 많이 바뀌었다.
>머지하기에 앞서 이 묵은 커밋들을 최신코드에 적용시키고 싶은데
>그럼 어떻게 해야할까?

##Tutorial
1 master브랜치에서 원본코드 코딩 후 commit한다.
```html
//rebase_test1.html
<ul class="master">
    <li>m1</li>
    <li>m2</li>
    <li>m3</li>
</ul>
```
```html
//rebase_test2.html
<tr class="trgood">
    <td>m1</td>
    <td>m2</td>
    <td>m3</td>
</tr>
```

2 branch2를 만들고 rebase_test1 코드를 수정 후 commit한다.(branch add1)
```html
<ul class="master branch2">
    <li>m1</li>
    <li>m2</li>
    <li>m3</li>
    <li>m4</li>
</ul>
```

3 rebase_test2 코드를 마음껏 수정 후 commit한다.(branch add2)
```html
<tr class="trgood excellent">
    <td>b1</td>
    <td>m2</td>
    <td>m3</td>
    <td>b4</td>
</tr>

<b>oh my god</b>
```

4 master브랜치로 checkout한 후 원본코드를 신나게 수정하고 커밋한다.
```html
//rebase_test1.html
<ul class="master original">
    <li>m1</li>
    <li>m2</li>
    <li>m3</li>
    <li>m4</li>
    <li>m5</li>
</ul>

//rebase_test2.html
<tr class="trgood">
    <td>m1</td>
    <td>m2</td>
    <td>m3</td>
    <td>m4</td>
    <td>m5</td>
    <td>m6</td>
</tr>

<b>haha good</b>
<b>haha excellent</b>
```

5 현재 브랜치 상황<br>
![view branch](../img/rebase-with-sourcetree/1.png)

6 branch2로 체크아웃하고, 베이스로 삼기 원하는 브랜치(master)에서 우측클릭->Rebase->OK 클릭<br>
![rebase](../img/rebase-with-sourcetree/2.png)

7 그러면 Merge Conflicts가 난다.<br>
![Merge Conflicts](../img/rebase-with-sourcetree/3.png)

8 Uncommitted changes에서 conflict를 확인한다. <br>
![conflicts](../img/rebase-with-sourcetree/4.png)

9 rebase_test1.html을 확인한다. 이건 branch2를 만들고 처음 한 'branch add 1'커밋을 최신 master코드에 적용시켰을때 나오는 충돌이다!
```html
<<<<<<< HEAD
<ul class="master original">
=======
<ul class="master branch2">
>>>>>>> branch add 1
    <li>m1</li>
    <li>m2</li>
    <li>m3</li>
    <li>m4</li>
<<<<<<< HEAD
    <li>m5</li>
=======
>>>>>>> branch add 1
</ul>
```

10 원하는 방향으로 conflict를 해결해준다.
```html
<ul class="master branch2">
    <li>m1</li>
    <li>m2</li>
    <li>m3</li>
    <li>m4</li>
    <li>m5</li>
</ul>
```

11 그 파일의 충돌해결이 끝나면 staged files로 옮겨준다(체크)<br>
![to staged files](../img/rebase-with-sourcetree/5.png)

12 Menu> Actions> Continue rebase를 눌러 다음 커밋(branch add2)으로 넘어간다.<br>
![continue rebase](../img/rebase-with-sourcetree/6.png)

13 이번엔 rebase_test2.html에서 conflict가 난다. 해결해준다.
```html
<<<<<<< HEAD
<tr class="trgood">
    <td>m1</td>
    <td>m2</td>
    <td>m3</td>
    <td>m4</td>
    <td>m5</td>
    <td>m6</td>
</tr>
=======
<tr class="trgood excellent">
    <td>b1</td>
    <td>m2</td>
    <td>m3</td>
    <td>b4</td>
</tr>

<b>oh my god</b>
>>>>>>> branch add2
```

14 그럼 커밋 2개(branch add1, branch add2)가 위에 가서 붙는다.<br>
![rebase added](../img/rebase-with-sourcetree/7.png)

15 Push한다. 그러면 최신코드에 반영이 되어 merge된다.<br>
![merged](../img/rebase-with-sourcetree/8.png)

16 브랜치 상황을 더욱 잘 보기 위해 master와 branch2에 각각 커밋 하나씩을 해보았다.
first commit에서 빠져나온 브랜치2가 third commit(당시최신)에서 빠져나온 브랜치2와 머지되었다.
![final](../img/rebase-with-sourcetree/9.png)


끝~~ ^.^
