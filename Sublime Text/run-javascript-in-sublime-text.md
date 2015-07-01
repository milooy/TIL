# 서브라임 텍스트에서 자바스크립트 콘솔로 돌리기

1. sublime text의 메뉴바에서 `Tools`>`Build System`>`New Build System`을 누른다.
2. 그리고 나온 파일에 이 코드를 붙여넣어준다.
```shell
{
    "cmd": ["node", "$file", "$file_base_name"],
    "working_dir": "${project_path:${folder}}",
    "selector": "*.js"
}
```
3. 이름을 node나 javascript 등으로 저장해준다.
4. `Tools`>`Build System`를 아까 만든 이름으로 지정하고
5. `cmd`+`b`를 누르면
6. 짱 편하게 빌드가 된다!
7. 코드워즈 풀때 유용하다. 

## Refer
http://logicmason.com/2013/adding-a-js-build-system-to-sublime/
