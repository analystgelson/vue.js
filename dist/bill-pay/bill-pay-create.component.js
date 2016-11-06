'use strict';

var names = ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Empréstimo', 'Gasolina'];

//let -> escopo e contexto local - variavel com ciclo de vida menor - pode em estrutura de repetição e etc
//const -> agente quer declarar um valor que vai ser apenas para leitura
//var -> escopo e contexto global

window.billPayCreateComponent = Vue.extend({
    template: '\n\t<form name="form" @submit.prevent="submit">\n\t\t<label>Vencimneto</label>\n\t\t<input type="text" v-model="bill.date_due">\n\t\t<br/><br/>\n\t\t<label>Nome</label>\n\t\t<select v-model="bill.name">\n\t\t\t<option v-for="o in names" :value="o">{{ o }}</option>\n\t\t</select>\n\t\t<br/><br/>\n\t\t<label>Valor:</label>\n\t\t<input type="text" v-model="bill.value">\n\t\t<br/><br/>\n\t\t<label>Pago?:</label>\n\t\t<input type="checkbox" v-model="bill.done">\n\t\t<br/><br/>\n\t\t<input type="submit" value="Enviar">\n\t</form>\n\t',
    data: function data() {
        return {
            formType: 'insert',
            names: names,
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function submit() {
            var self = this;
            if (this.formType == 'insert') {
                Bill.save({}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                Bill.update({ id: this.bill.id }, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-pay.list' });
                });
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };
            this.$router.go({ name: 'bill.list' });
        },
        getBill: function getBill(id) {
            var self = this;
            Bill.get({ id: id }).then(function (response) {
                self.bill = response.data;
            });
        }
    }
});