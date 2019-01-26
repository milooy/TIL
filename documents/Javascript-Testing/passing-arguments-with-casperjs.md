# Casper.js에 arguments 넘기기

```javascript
var casper = require('casper').create();

casper.echo("Casper CLI passed args:");
require("utils").dump(casper.cli.args);
var foo = casper.cli.get(0);
casper.echo("foo: " + foo);
```

결과: 
```bash
▶ casperjs capture.js haha
Casper CLI passed args:
[
    "haha"
]
foo: haha
```

## Reference
http://casperjs.readthedocs.org/en/latest/cli.html?highlight=argument
