Vue.filter('doneLabel', function(value){
	if ( value == 0 ) {
		return "Não paga";
	}else {
		return "Paga";
	}
});
Vue.filter('statusGeneral', function(value){
	if ( value === false ) {
		return "Nenhuma conta cadastrada";
	}

	if ( !value ){
		return "Nenhuma conta a pagar";
	}else {
		return "Existem " + value + " contas a serem pagas";
	}
});

var menuComponent = Vue.extend({
	template: `
	<nav>
		<ul>
			<li v-for="o in menus">
				<a href="#" @click.prevent="showView(o.id)">{{ o.name }}</a>
			</li>
		</ul>
	</nav>
	`,
	data: function(){
		return {
			menus: [
				{id: 0, name: "Listar conta"}, 
				{id: 1, name: "Criar conta"}
			]
		};
	},
	methods: {
		showView: function(id){
			this.$root.$children[0].activedView=id;
			if (id == 1) {
				this.$parent.formType = 'insert';
			}
		}
	}
});
Vue.component('menu-component', menuComponent);

var billListComponent = Vue.extend({
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
			this.$parent.bill = bill;
			this.$parent.activedView = 1;
			this.$parent.formType = 'update';
		},
		deleteBill: function(bill){
			if (confirm('Deseja excluir essa conta?')) {
				this.bills.$remove(bill);
			}
		}
	}
});
Vue.component('bill-list-component', billListComponent);

var billCreateComponent = Vue.extend({
	template: `
	{{ message }}
	<form name="form" @submit.prevent="submit">
		<label>Vencimneto</label>
		<input type="text" v-model="bill.date_due">
		<br/><br/>
		<label>Nome</label>
		<select v-model="bill.name">
			<option v-for="o in names" :value="o">{{ o }}</option>
		</select>
		<br/><br/>
		<label>Valor:</label>
		<input type="text" v-model="bill.value">
		<br/><br/>
		<label>Pago?:</label>
		<input type="checkbox" v-model="bill.done">
		<br/><br/>
		<input type="submit" value="Enviar">
	</form>
	`,
	props: ['bill', 'formType', 'message'],
	data: function(){
		return {
			names: [
				'Conta de luz',
				'Conta de água',
				'Conta de telefone',
				'Supermercado',
				'Empréstimo',
				'Gasolina'
			]
		};
	},
	methods: {
		submit: function(){
			if (this.formType == 'insert') {
				this.bills.push(this.bill);
			}
			this.bill = {
				date_due: '',
				name: '',
				value: 0,
				done: false
			};

			this.activedView = 0;
		}
	}
});
Vue.component('bill-create-component', billCreateComponent);

var appComponent = Vue.extend({
	template: `
	<style type="text/css">
		.red{
			color: red;
		}
		.green{
			color: green;
		}
		.gray{
			color: gray;
		}
		.minha-class{
			background-color: burlywood; 
		}	
	</style>
		<h1>{{ title }}</h1>
	<h3 :class="{ 'gray': status === false, 'green': status === 0, 'red': status > 0 }">
		{{ status | statusGeneral }}
	</h3>
	<menu-component></menu-component>
	<div v-if="activedView == 0">
		<bill-list-component></bill-list-component>	
	</div>
	<div v-if="activedView == 1">
		<bill-create-component :bill="bill" :form-type="formType" message="texto"></bill-create-component>
	</div>
	`, 
	data: function(){
		return {
			test: '',
			title: "Conta a pagar",
			activedView: 0,
			formType: 'insert',
			bill: {
				date_due: '',
				name: '',
				value: 0,
				done: false
			}
		};
	},
	computed: {
		status: function() {
			if ( !this.bills.length ) {
				return false;
			}

			var count = 0;
			for (var i in this.bills) {
				if (!this.bills[i].done) {
					count++;
				}
			}
			return count;
		}
	},
	methods: {	
	}
});
Vue.component('app-component', appComponent);
var app = new Vue({
	el: "#app",
});










