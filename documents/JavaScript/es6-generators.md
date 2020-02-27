# ES6 제너레이터(Generators)

```js
function* quips(name) {
  yield "hello " + name + "!";
  yield "i hope you are enjoying the blog posts";
  if (name.startsWith("X")) {
    yield "it's cool how your name starts with X, " + name;
  }
  yield "see you later!";
}
```
- `function*` 키워드로 시작
- `yield`: `return`과 비슷하지만, 이건 여러번 실행된다. 다음번 실행엔 다음줄부터 시작할 수 있도록.

```js
> var iter = quips("jorendorff");
  [object Generator]
> iter.next()
  { value: "hello jorendorff!", done: false }
> iter.next()
  { value: "i hope you are enjoying the blog posts", done: false }
> iter.next()
  { value: "see you later!", done: false }
> iter.next()
  { value: undefined, done: true }
```
- 제너레이터 함수는 호출해도 바로 실행되지 않고 멈춰진 제너레이터 객체를 리턴.
- 제너레이터는 쓰래드와 완전히 다름. 호출하는 코드와 같은 쓰래드에서 실행됨. 여러 코드가 동시 실행 X

```js
function *myGen() {
    const x = yield 1;       // x = 10
    const y = yield (x + 1); // y = 20
    const z = yield (y + 2); // z = 30
    return x + y + z;
}

const myItr = myGen();
console.log(myitr.next());   // {value:1, done:false}
console.log(myitr.next(10)); // {value:11, done:false}
console.log(myitr.next(20)); // {value:22, done:false}
console.log(myitr.next(30)); // {value:60, done:true}
```

## Refer
- http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/
- http://meetup.toast.com/posts/73
