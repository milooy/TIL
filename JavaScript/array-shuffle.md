# 배열 무작위 섞기

```
array.sort(function() {
    return Math.random() - .5;
});
```

기존 사용했던 코드처럼 Array.sort 함수를 무작위 섞기에 써서는 안 된다는 글

[Array.sort() should not be used to shuffle an array](http://sroucheray.org/blog/2009/11/array-sort-should-not-be-used-to-shuffle-an-array/)
