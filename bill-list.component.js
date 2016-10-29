window.billListComponent = Vue.extend({
    template: `
	<style type="text/css">
		.pago{
			color: green;
		}
		.nao-pago{
			color: red;
		}
	</style>
	<table border="1" cellpadding="10">
		<thead>
			<th>#</th>
			<th>Vencimento</th>
			<th>Nome</th>
			<th>Valor</th>
			<th>Paga?</th>
			<th>Ações</th>
		</thead>
		<tbody>
			<tr v-for="(index,o) in bills">
				<td>{{ index + 1 }}</td>
				<td>{{ o.date_due }}</td>
				<td>{{ o.name }}</td>
				<td>{{ o.value | currency 'R$ ' 2}}</td>
				<td class="minha-class" :class="{ 'pago': o.done, 'nao-pago': !o.done }">
					{{ o.done | doneLabel }}
				</td>
				<td>
					<a href="#" @click.prevent="loadBill(o)">Editar</a>
					<a href="#" @click.prevent="deleteBill(o)">Excluir</a>
				</td>
			</tr>
		</tbody>
	</table>
	`,
    data: function(){
        return {
            bills: [
                {date_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: true},
                {date_due: '21/08/2016', name: 'Conta de água', value: 55.99, done: false},
                {date_due: '22/08/2016', name: 'Conta de telefone', value: 55.99, done: false},
                {date_due: '23/08/2016', name: 'Supermercado', value: 625.99, done: false},
                {date_due: '24/08/2016', name: 'Cartão de crédito', value: 1500.99, done: false},
                {date_due: '25/08/2016', name: 'Empréstimo', value: 2000.99, done: false},
                {date_due: '26/08/2016', name: 'Gasolina', value: 200, done: false},
            ]
        };
    },
    methods: {
        loadBill: function(bill){
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-activedview', 1);
            this.$dispatch('change-formtype', 'update');
        },
        deleteBill: function(bill){
            if (confirm('Deseja excluir essa conta?')) {
                this.bills.$remove(bill);
            }
        }
    },
    events: {
        'new-bill': function(bill) {
            this.bills.push(bill);
        }
    }
});