# Snippet 만들기

http://docs.sublimetext.info/en/latest/extensibility/snippets.html

Menu > Tools > Snippet...

````xml
<snippet>
    <content><![CDATA[
    function($1) {
      ${0:$TM_SELECTED_TEXT}
    }
    ]]></content>
    <!-- Optional: Tab trigger to activate the snippet -->
    <tabTrigger>xyzzy</tabTrigger>
    <!-- Optional: Scope the tab trigger will be active in -->
    <scope>source.python</scope>
    <!-- Optional: Description to show in the menu -->
    <description>My Fancy Snippet</description>
</snippet>
```

key binding으로 snippet를 실행하면 `$TM_SELECTED_TEXT`에 selected text가 들어간다.


## snippet key binding

- `Perference > Key binding-User` 메뉴에서 다음과 같은 형식.
- snippet은 `command`이 `insert_snippet` `args.name`에 path 입력.


```json
[
  { "keys": ["ctrl+f"], "command": "insert_snippet", "args": {"name": "Packages/JavaScript/function.sublime-snippet"} },
  { "keys": ["ctrl+s"], "command": "show_overlay", "args": {"overlay": "command_palette", "text": "Snippet: "} }
]
```

### 원하는 command, args 찾기.

`View > show console`로 콘솔을 열고 `sublime.log_commands(True)`를 입력.
원하는 액션을 취하면 console에 command가 찍힘.


````bash
command: show_overlay {"overlay": "command_palette", "text": "Snippet: "}
```
