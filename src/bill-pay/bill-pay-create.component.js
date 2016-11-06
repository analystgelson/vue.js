const names = [
    'Conta de luz',
    'Conta de água',
    'Conta de telefone',
    'Supermercado',
    'Empréstimo',
    'Gasolina'
];

//let -> escopo e contexto local - variavel com ciclo de vida menor - pode em estrutura de repetição e etc
//const -> agente quer declarar um valor que vai ser apenas para leitura
//var -> escopo e contexto global

window.billPayCreateComponent = Vue.extend({
    template: `
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
    data: function(){
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
    created: function () {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function(){
            let self = this;
            if (this.formType == 'insert') {
                Bill.save({}, this.bill).then(function(response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-pay.list'});
                });
            }else{
                Bill.update({id : this.bill.id}, this.bill).then(function(response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-pay.list'});
                });
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };
            this.$router.go({name: 'bill.list'});
        },
        getBill: function(id) {
            let self = this;
            Bill.get({id : id}).then(function(response){
                self.bill = response.data;
            });
        }
    }
});