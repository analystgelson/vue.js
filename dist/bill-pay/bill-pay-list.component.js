'use strict';

window.billPayListComponent = Vue.extend({
	template: '\n\t<style type="text/css">\n\t\t.pago{\n\t\t\tcolor: green;\n\t\t}\n\t\t.nao-pago{\n\t\t\tcolor: red;\n\t\t}\n\t</style>\n\t<table border="1" cellpadding="10">\n\t\t<thead>\n\t\t\t<th>#</th>\n\t\t\t<th>Vencimento</th>\n\t\t\t<th>Nome</th>\n\t\t\t<th>Valor</th>\n\t\t\t<th>Paga?</th>\n\t\t\t<th>A\xE7\xF5es</th>\n\t\t</thead>\n\t\t<tbody>\n\t\t\t<tr v-for="(index,o) in bills">\n\t\t\t\t<td>{{ index + 1 }}</td>\n\t\t\t\t<td>{{ o.date_due }}</td>\n\t\t\t\t<td>{{ o.name }}</td>\n\t\t\t\t<td>{{ o.value | currency \'R$ \' 2}}</td>\n\t\t\t\t<td class="minha-class" :class="{ \'pago\': o.done, \'nao-pago\': !o.done }">\n\t\t\t\t\t{{ o.done | doneLabel }}\n\t\t\t\t</td>\n\t\t\t\t<td>\n\t\t\t\t\t<a v-link="{ name: \'bill-pay.update\', params: {id: o.id} }">Editar</a>\n\t\t\t\t\t<a href="#" @click.prevent="deleteBill(o)">Excluir</a>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t</tbody>\n\t</table>\n\t',
	data: function data() {
		return {
			bills: []
		};
	},
	created: function created() {
		var self = this;
		Bill.query().then(function (response) {
			self.bills = response.data;
		});
	},
	methods: {
		deleteBill: function deleteBill(bill) {
			var _this = this;

			if (confirm('Deseja excluir essa conta?')) {
				(function () {
					var self = _this;
					Bill.delete({ id: bill.id }).then(function (response) {
						self.bills.$remove(bill);
						self.$dispatch('change-info');
					});
				})();
			}
		}
	}
});