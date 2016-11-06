"use strict";

window.billPayMenuComponent = Vue.extend({
    template: "\n\t<nav>\n\t\t<ul>\n\t\t\t<li v-for=\"o in menus\">\n\t\t\t\t<a v-link=\"{name: o.routeName}\">{{ o.name }}</a>\n\t\t\t</li>\n\t\t</ul>\n\t</nav>\n\t",
    data: function data() {
        return {
            menus: [{ id: 0, name: "Listar conta", routeName: 'bill-pay.list' }, { id: 1, name: "Criar conta", routeName: 'bill-pay.create' }]
        };
    }
});