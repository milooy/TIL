# Browserify

node식 모듈을 브라우저용으로 컴파일 하는 도구. 브라우저만을 위한 AMD로 구현된 require.js와 반대 위치.

https://github.com/substack/browserify-handbook

## Recompile

- [watchify](https://npmjs.org/package/watchify)를 사용한다.
- grunt를 사용하면 [grunt-browserify에서 options.watch true](https://github.com/jmreidy/grunt-browserify#watch)로 watchify를 설정한다.
- grunt-contrib-watch를 쓰지 않고 watch를 좋은 방법 [bad.js](https://gist.github.com/WickyNilliams/d0fd94d84ac27feb93fe)

## Paritioning Bundles

https://github.com/substack/browserify-handbook#partitioning

factor-bundle를 사용해서 메뉴 별로 쪼갤 수 있다. grunt는 [factor-bundle plugin](https://github.com/jmreidy/grunt-browserify/commit/630f3df89cc6cf21084de69afda5651fb4eff13b)를 사용한다.

2015-3-13 log

이유를 알 수 없으나 grunt-browerify에서 factor-bundle를 사용하면 정상적으로 번들링이 되지 않는다. 그래서 custom task를 만들어서 사용함. (watchify는 생략)

```js
// https://github.com/substack/factor-bundle
var task = function(grunt) {
  return function() {
    this.async();

    var src = this.data.src;
    var dest = this.data.dest;
    var options = this.data.options;

    var browserify = require('browserify');

    var b = browserify(src);

    if (typeof options.factor === 'object') {
      b.plugin('factor-bundle', {
        outputs: options.factor
      });
    }

    b.bundle(function(err, buf) {
      grunt.file.write(dest, buf);
    });
  };
};

module.exports = {
  options: options,
  task: task
}
```