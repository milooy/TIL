## Making Custom Task

```js
// Gruntfile.js
grunt.loadTasks('path/of/customTasks');

// path/of/customTasks/doSomething.js
module.exports = function(grunt) {
  grunt.registerTask('doSomething', function() {
    // ...
  });
}
```

## 파일 제어 apis

```js
  grunt.file.read();      // return string
  grunt.file.readYAML();  // return object of yaml properties
  grunt.file.readJSON();  // return object of json properties

  // yaml write에는 yamljs module를 사용한다.
```
