# Vue JS - The Complete Guide

## Why vue?
- 16kb밖에 안된다: 용량만 작은게 아니고 런타임도 빠르다(앵귤러나 리액트보다)

## Vue 기본
- `{{ }}`: interpolation이나 string interpolation이라고 부른다.
- data오브젝트 안에 있는 것은 모두 `{{}}`를 통해 접근 가능. data.title 이 아니고 그냥 title
- Directives: 
- `v-bind`: vue js 인스턴스에 있는 데이터를 바인드해줘라. 다이나믹 데이터를 html attribute에 적용할 수 있는 방법임.
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>VueJS</title>
    <script type="text/javascript" src="./vue.js"></script>
  </head>
  <body>
    <div id="app">
      <input type="text" v-on:input="changeTitle">
      <p v-once>{{ title }}</p> <!-- v-once를 쓰지 않으면 "No Hello"라고 나온다. property가 바뀔때마다 re-rendering하기 때문. -->
      <p>{{ sayHello() }}</p>
      <a href="{{link}}"></a> <!-- 이러면 안 된다. HTML의 attribute 안에 있는 변수는 디코딩해서 들어가기 때문... 이상한 글자로 깨져서 나옴 -->
      <a v-bind:href="link"></a> <!-- 이렇게 v-bind해서 쓰면 원본 그대로 가져옴. 여기에는 {{}}을 쓰지 않는다. 데이터를 다이나믹하게 bind해줌 -->
      <a :href="link"></a> <!-- v-bind는 shorthand로 그냥 뗄 수 있다. -->
      <p v-html="finishedLink"></p> <!-- Cross-site문제가 안 일어난다는게 확실하면 v-html써서 태그를 그대로 렌더링할 수 있음 -->
    </div>
    <script>
      new Vue({
        el: '#app',
        data: {
          title: "Hello Jaylynn!",
          link: 'http://google.com',
          finishedLink: '<a href="https://naver.com">Naver</a>'
        },
        methods: {
          changeTitle: function(e) {
            this.title = event.target.value;
          },
          sayHello: function() {
            this.title = "No hello";
            return 'Hello!';
          }
        }
      });
    </script>
  </body>
</html>
```

## Vue 예제: counter
```html
<div id="app">
    <button v-on:click="increase(2, $event)">Click</button>
    <button v-on:click="counter++">Click</button>
    <p>{{counter}}</p>
    <p v-on:mousemove="updateCoordinates">
        {{x}} / {{y}}
        <span v-on:mousemove.stop="">DEAD SPOT</span>
        <!-- .stop하면 e.stopPropagation 된다. 여기 mouseover했을 땐 updateCoordinates이벤트 발생 안 됨. .stop.prevent하면 stopPropagation이랑 preventDefault둘 다 된다.-->
    </p>
    <input type="text" v-on:keyup.enter.space="alertMe">
    <!-- keyup이벤트면서 enter랑 space 누를 때 alertMe이벤트 발발된다.-->
    <input type="text" v-on:keydown.enter="value = $event.target.value">
    <p>{‌{ value }}</p>
</div>
<script>
    new Vue({
        el: '#app',
        data: {
            counter: 0,
            x: 0,
            y: 0,
            value: ''
        },
        methods: {
            increase: function(step, event) {
                this.counter += step;
            },
            updateCoordinates: function(e) {
                this.x = e.clientX;
                this.y = e.clientY;
            },
            alertMe: function() {
                alert('Alert!');
            }
        }
    })
</script>
```

## Vue 예제: computed, watch
```html
<div id="app">
    <input type="text" v-model="name"> <!-- Two-way binding 된다. -->
    <p>{{name}}</p>
    <button v-on:click="counter++">Click+</button>
    <button v-on:click="counter--">Click-</button>
    <button @click="counter--">Click</button> <!-- v-on:은 많이 써서 @ shorthand로 줄여쓸 수 있다. -->
    <p>Counter: {{counter}}</p>
    <p>Result: {{result()}} | {{output}}</p>

</div>
<script>
    new Vue({
        el: 'app',
        data: {
            name: 'Jay',
            counter: 0
        },
        computed: { // data에 있는 거랑 똑같이 쓸 수 있지만, 여기선 계산을 할 수 있다.
            output: function() { // 이 함수를 methods에 쓴다면, 다른 property가 바뀔때마다 re-rendering을 하겠지(필요 없는데도). 여기 놓으면 counter가 바뀔때만 re-rendering을 한다.
                return this.counter > 5 ? '5보다 큼' : '5보다 작음';
            }
        },
        watch: {
            counter: function(value) { // counter데이터가 바뀔때마다 불린다. 3초뒤에 리셋함.
                var vm = this;
                setTimeout(function() {
                    vm.counter = 0;
                }, 2000);
            }
        },
        methods: { // 여기 두면 cache하지 않고 dom이 update할때마다 매번 calculate한다.
            result() {
                return this.counter > 5 ? '5보다 큼' : '5보다 작음';
            }
        }
    })
</script>
```

## Vue 예제: Dynamic Styling
```html
<style>
    .red{
        background-color: red;
    }
    .green{
        background-color: green;
    }
</style>
<div id="app">
    <div class="demo"
        @click="attachRed = !attachRed"
        :class="{red: attachRed, blue: !attachRed}"></div>
    <div class="demo" :class="divClasses"></div>
    <div class="demo" :class="color"></div>
    <div class="demo" :class="[color, {red: attatchRed}]"></div>
    <div class="demo" :style="{'background-color': color}"></div>
    <div class="demo" :style="{backgroundColor: color}"></div>
    <div class="demo" :style="myStyle"></div>
    <input type="text" v-model="color">
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            attachRed: false,
            color: 'green',
            width: 100
        },
        computed: {
            divClasses: function() {
                return {
                    red: attatchRed,
                    blue: !attatchRed
                }
            },
            myStyle: function() {
                return {
                    width: this.width + 'px';
                }
            }
        }
    })
</script>
```

## Vue 예제: if, for
```html
<div id="app">
    <p v-if="show">이게 보이니</p>
    <p v-else>아니면 이게 보이니</p>
    <template v-if="show"> <!-- HTML5 태그. DOM에는 안 나온다. 코드에서 그루핑 용도.-->
        <h1>Heading</h1>
        <p>Inside template</p>
    </template>
    <p v-show="show">이거슨 쇼이다</p> <!-- v-if는 아예 돔을 없애버리는데 v-show는  display:none 클래스를 추가한다.-->
    <button @click="show = !show">Switch</button>
    <ul>
        <li v-for="(ingredient, i) in ingredients">{{ingredient}} ({{i}})</li>
    </ul>
    <!-- key를 안 적으면 그냥 돔의 순서만 기억하는데, key 적으면 element자체를 기억한다. 그래서 reorder등이 가능함 -->
    <template v-for="(ingredient, i) in ingredients" :key="ingredient">
        <h1>{{ingredient}}</h1>
        <p>{{i}}</p>
    </template>
    <button @click="ingredients.push('spices')">Add ingredients</button>
    <ul>
        <li v-for="person in persons">
            <div v-for="(v, k, i) in person">[{{i}}] {{k}} : {{v}}</div>
        </li>
    </ul>
    <span v-for="n in 10">{{n}}</span>
</div>
<script>
    new Vue({
        el: '#app',
        data: {
            show: true,
            ingredients: ['meat', 'fruit', 'cookies'],
            persons: [
                {name: 'Max', age: 27},
                {name: 'Anna', age: 10},
            ]
        }
    })
</script>
```

## Vue 예제: 

- passedData child component 거꾸로...

