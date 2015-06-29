# Spring Web Custom Binder

## Custom Delimiter 

Spring @MVC 의 기본으로 맵핑되는 Query, Path 파라미터 외에 Custom delimiter 를 정의하고 싶을 때는 WebDataBinder 에 Editor 를 세팅해주면 된다.

예로, 파이프(|) 를 구분자로 하여 Search 파라미터로 쓰고 싶을 때 다음과 같이 구현한다.


```java
@InitBinder
public void initBinder(WebDataBinder binder_){
    binder_.registerCustomEditor(String[].class, new StringArrayPropertyEditor("|"));
    binder_.registerCustomEditor(Long[].class, new StringArrayPropertyEditor("|"));
}

@RequestMapping(method = RequestMethod.GET, value = "/{idComics}")
public @ResponseBody
ResultList<ComicView> getComics(@PathVariable Long[] idComics) {

    return new ResultList<ComicView>();
}
```