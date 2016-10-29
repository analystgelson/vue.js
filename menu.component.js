window.menuComponent = Vue.extend({
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
            this.$dispatch('change-activedview', id); //'$dispatch' de filho para pai
            if (id == 1) {
                this.$dispatch('change-formtype', 'insert');
            }
        }
    }
});