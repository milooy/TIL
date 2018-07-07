var CONST = require("./const");

module.exports = {
  title: `Today Yurim Learned`,
  description: `Yurim's Personal Wiki (Today I Learned)`,
  base: "/TIL/",
  dest: 'docs',
  head: [
    ['link', {
      rel: 'icon',
      href: '/logo.png'
    }]
  ],
  themeConfig: {
    sidebar: [
      {
        title: 'React',
        children: CONST.ReactList
      },{
        title: 'Daily Coding',
        children: CONST.DailyCodingList
      },{
        title: 'JavaScript',
        children: CONST.JavaScriptList
      },{
        title: 'Angular',
        children: CONST.AngularList
      }, {
        title: 'Javascript Testing',
        children: CONST.JsTestingList
      }, {
        title: 'CSS',
        children: CONST.CSSList
      }, {
        title: 'Google Analytics',
        children: CONST.GoogleAnalyticsList
      }
    ],
    nav: [{
        text: 'GitHub',
        link: 'https://github.com/milooy/'
      }, {
        text: 'Blog',
        link: 'https://milooy.wordpress.com/'
      }
    ]
  },
}