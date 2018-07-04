## heroku casperjs
[heroku buildpack: CasperJS](https://github.com/leesei/heroku-buildpack-casperjs)
```bash
heroku run bash
```

[Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
```
heroku login
git clone https://github.com/heroku/node-js-getting-started.git
cd node-js-getting-started
heroku create
git push heroku master
heroku open
heroku logs --tail
npm install
foreman start web
npm install
foreman start
git add .
git commit -m "Demo"
git push heroku master
heroku open
heroku run node
heroku run bash
```

## Find and Kill process locking port 
http://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac
```
lsof -i :5000
kill -9 <PID>
```

## 로컬에선 되는데 서버에선 안될때!
http://stackoverflow.com/questions/23987571/node-js-app-works-locally-but-heroku-says-missing-module
`git add -A --force`로 넣어준다.

https://docs.npmjs.com/misc/faq#should-i-check-my-node_modules-folder-into-git-
http://stackoverflow.com/questions/13584852/node-js-0-8-15-npm-error-cannot-find-module-proto-list?rq=1
오오 이걸로 해결 http://stackoverflow.com/questions/8639690/app-works-locally-crashes-on-heroku-node-js


## Reference
[heroku scheduler](http://stackoverflow.com/questions/13345664/using-heroku-scheduler-with-node-js)
[heroku scheduler 2](http://www.spacjer.com/blog/2014/02/10/defining-node-dot-js-task-for-heroku-scheduler/)
[SpookyJS - Drive CasperJS from Node.js](https://github.com/SpookyJS/SpookyJS)
https://nodejs.org/api/child_process.html?hc_location=ufi#child_process_child_process_exec_command_options_callback
http://stackoverflow.com/questions/25939009/how-can-i-run-casperjs-phantomjs-tests-from-a-nodejs-express-web-app
https://groups.google.com/forum/#!topic/casperjs/7Lps6TiX-78
http://www.slideshare.net/WooGenius/nodejs-40451587
http://www.spacjer.com/blog/2014/02/10/defining-node-dot-js-task-for-heroku-scheduler/
http://yoonsy.kr/archives/tag/heroku
