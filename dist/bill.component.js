"use strict";

window.billComponent = Vue.extend({
    template: "\n\t<nav>\n\t\t<ul>\n\t\t\t<li v-for=\"o in menus\">\n\t\t\t\t<a v-link=\"{name: o.routeName}\">{{ o.name }}</a>\n\t\t\t</li>\n\t\t</ul>\n\t</nav>\n\t<router-view></router-view>\n\t",
    data: function data() {
        return {
            menus: [{ name: "Contas a pagar", routeName: 'bill-pay.list' }, { name: "Contas a receber", routeName: 'bill-receive' }]
        };
    }
});