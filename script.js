const citySearcherAppProps = {
	data(){
		return{
			search: {
				value: '',
				img: 'search',
				styles: {
					width: '230px',
					opacity: '80%'
				},
				focus: false,
			},
			searchWrapper: {
				styles: {
            		justifyContent: 'center'
            	}
			},
			cityList: [],
			checkedCityList: []
		}
	},
	methods: {
		focusChange(event){
			if(this.search.value == '' && event.type == 'focus'){
				this.search.focus = true;
				this.search.styles.opacity = '100%';
			}
			if(this.search.value == '' && event.type == 'blur'){
				this.search.focus = false;
				this.search.styles.opacity = '80%';
			}
		},
		mouseoverChange(event){
			if(this.search.value == '' && event.type == 'mouseover' && this.search.focus == false){
				this.search.styles.opacity = '100%';
			}
			if(this.search.value == '' && event.type == 'mouseout' && this.search.focus == false){
				this.search.styles.opacity = '80%';
			}
		},
		findCity(val){
			let checkedData = [];
			this.cityList.filter(function(city) {
				if(city.name.search(val) != -1){
					checkedData.push(city);
				}
			});
			this.checkedCityList = checkedData;
		},
		searchXClick(){
			if(this.search.value != ''){
				this.search.value = '';
			}
		}
	},
	watch: {
		'search.value': function(val){
			if (val.length == 1){
				this.search.value = val.toUpperCase();
			}
			else{
				this.search.value = val.charAt(0) + val.slice(1).toLowerCase();
			}
			if (val != ''){
				let style = getComputedStyle(this.$refs.searchWrapper);
				this.searchWrapper.styles.justifyContent = 'start';
				this.search.styles.width = style.width;
				this.search.styles.opacity = '100%';
				this.search.img = 'x';
				citySearcherApp.findCity(val);
			}
			else{
				this.searchWrapper.styles.justifyContent = 'center';	
				this.search.styles.width = '230px';
				this.search.img = 'search';
			}
		}
	},
	beforeMount(){
		axios.get('../data/city.list.json') 
			.then((response) => {
                this.cityList = response.data;
            })
            .catch((error) => {
            	console.log("Error " + error);
            });    
	}
}
const citySearcherApp = Vue.createApp(citySearcherAppProps).mount('#citySearcherApp');