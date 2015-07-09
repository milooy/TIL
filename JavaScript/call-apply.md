#Javascript Call
이미 정의된 함수를 호출할 때 다른 this객체를 할당. 
한번 작성한 함수를 다른 객체에 상속시킴으로써 새로운 객체에서 똑같은 함수를 재작성할 필요가 없다.

object.foo(인자들,..,...)
과
foo.call(object,인자들,..,...)
두개는 서로 완전히 일치합니다.

##객체의 생성자 호출 위해
```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0)
    throw RangeError('Cannot create product "' + name + '" with a negative price');
  return this;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}
Food.prototype = new Product();

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}
Toy.prototype = new Product();

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
```

##익명 함수 호출 위해 
```javascript
var animals = [
  {species: 'Lion', name: 'King'},
  {species: 'Whale', name: 'Fail'}
];

for (var i = 0; i < animals.length; i++) {
  (function (i) { 
    this.print = function () { 
      console.log('#' + i  + ' ' + this.species + ': ' + this.name); 
    } 
  }).call(animals[i], i);
}
```


##reference
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call
