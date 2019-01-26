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
        title: '1. JavaScript',
        children: CONST.JavaScriptList
      },{
        title: '2. React',
        children: CONST.ReactList
      },{
        title: '3. Daily Coding',
        children: CONST.DailyCodingList
      },{
        title: '4. Angular',
        children: CONST.AngularList
      }, {
        title: '5. Javascript Testing',
        children: CONST.JsTestingList
      }, {
        title: '6. CSS',
        children: CONST.CSSList
      }, {
        title: '7. Google Analytics',
        children: CONST.GoogleAnalyticsList
      }, {
        title: '8. Data structure and Algorithm',
        children: CONST.DataStructureAndAlgorithmList
      }, {
        title: '9. Django',
        children: CONST.DjangoList
      }, {
        title: '10. Python',
        children: CONST.PythonList
      }, {
        title: '11. Git',
        children: CONST.GitList
      }, {
        title: '12. Module Bundler',
        children: CONST.BundlerList
      }, {
        title: '13. iOS',
        children: CONST.iOSList
      }, {
        title: '14. jQuery',
        children: CONST.jQueryList
      }, {
        title: '15. MarkUp',
        children: CONST.MarkUpList
      }, {
        title: '16. Network',
        children: CONST.NetworkList
      }, {
        title: '17. DevOps',
        children: CONST.DevOpsList
      }, {
        title: '18. ETC',
        children: CONST.ETCList
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