window.billPayListComponent = Vue.extend({
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
					<a v-link="{ name: 'bill-pay.update', params: {index: index} }">Editar</a>
					<a href="#" @click.prevent="deleteBill(o)">Excluir</a>
				</td>
			</tr>
		</tbody>
	</table>
	`,
    http: {
        root: 'http://localhost:8000/api'
    },
    data: function(){
        return {
            bills: []
        };
    },
    created: function(){
        this.$http.get('bills').then(function(response){
            this.bills = response.data;
        })
    },
    methods: {
        deleteBill: function(bill){
            if (confirm('Deseja excluir essa conta?')) {
                this.$root.$children[0].billsPay.$remove(bill);
            }
        }
    }
});