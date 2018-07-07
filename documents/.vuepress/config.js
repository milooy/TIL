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
      }, {
        title: 'Data structure and Algorithm',
        children: CONST.DataStructureAndAlgorithmList
      }, {
        title: 'DjangoList',
        children: CONST.DjangoList
      }, {
        title: 'ETC',
        children: CONST.ETCList
      }, {
        title: 'Git',
        children: CONST.GitList
      }, {
        title: 'Module Bundler',
        children: CONST.BundlerList
      }, {
        title: 'iOS',
        children: CONST.iOSList
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