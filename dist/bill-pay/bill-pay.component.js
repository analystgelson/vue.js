'use strict';

window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: '\n\t<style type="text/css">\n\t\t.red{\n\t\t\tcolor: red;\n\t\t}\n\t\t.green{\n\t\t\tcolor: green;\n\t\t}\n\t\t.gray{\n\t\t\tcolor: gray;\n\t\t}\n\t\t.minha-class{\n\t\t\tbackground-color: burlywood; \n\t\t}\t\n\t</style>\n\t\t<h1>{{ title }}</h1>\n\t<h3 :class="{ \'gray\': status === false, \'green\': status === 0, \'red\': status > 0 }">\n\t\t{{ status | statusGeneral }}\n\t</h3>\n\t<h3> {{ total | currency \'R$ \'}}</h3>\n\t<menu-component></menu-component>\n\t<router-view></router-view>\n\t',
    data: function data() {
        return {
            title: "Conta a pagar",
            status: false,
            total: 0
        };
    },
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus: function calculateStatus(bills) {
            if (!bills.length) {
                this.status = false;
            }

            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function updateStatus() {
            var self = this;
            Bill.query().then(function (response) {
                self.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var self = this;
            Bill.total().then(function (response) {
                self.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});