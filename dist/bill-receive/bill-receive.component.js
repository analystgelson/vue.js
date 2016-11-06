"use strict";

window.billReceiveComponent = Vue.extend({
  // components: {
  //     'menu-component': billPayMenuComponent
  // },
  template: "\n\t<!--<style type=\"text/css\">-->\n\t\t<!--.red{-->\n\t\t\t<!--color: red;-->\n\t\t<!--}-->\n\t\t<!--.green{-->\n\t\t\t<!--color: green;-->\n\t\t<!--}-->\n\t\t<!--.gray{-->\n\t\t\t<!--color: gray;-->\n\t\t<!--}-->\n\t\t<!--.minha-class{-->\n\t\t\t<!--background-color: burlywood; -->\n\t\t<!--}\t-->\n\t<!--</style>-->\n\t<h1>{{ title }}</h1>\n\t<!--<h3 :class=\"{ 'gray': status === false, 'green': status === 0, 'red': status > 0 }\">-->\n\t\t<!--{{ status | statusGeneral }}-->\n\t<!--</h3>-->\n\t<!--<menu-component></menu-component>-->\n\t<!--<router-view></router-view>-->\n\t",
  data: function data() {
    return {
      title: "Conta a receber"
    };
  }
});