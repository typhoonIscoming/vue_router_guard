<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    	<div class="content">
	    	<transition name="fade" mode="out-in">
	    		<keep-alive>
	    			<router-view/>
	    		</keep-alive>
	    	</transition>
    	</div>
    	<div class="footer">
    		<ul>
    			<li
    				v-for="(item, index) in items"
    				:key="index"

    				:class="{activated:currentRoute === item.id}">
    				<router-link :to="{name: item.name}" event="click">{{ item.text }}</router-link>
				</li>
    			
    		</ul>
			</div>
  </div>
  
</template>

<script>
export default {
  name: 'App',
  data(){
  	return {
  		currentRoute: null,
  		items: [
	  		{name: 'HelloWorld', text: '首页', id: 1},
	  		{name: 'newpage', text: '第二页', id: 2},
	  		{name: 'customer', text: '第三页', id: 3},
	  		{name: 'fourth', text: '第四页', id: 4},
	  		{name: 'fifth', text: '第五页', id: 5},
  		]
  	}
  },
  methods:{
  	skip(n){
  		console.log(n)
  		this.$router.push({name: n})
  	},
  	tip() {
  		console.log(11111)
  	},
  },
  created() {
  	
  },
  watch: {
  	'$route': function(newroute, oldroute) {
//		console.log('newroute.name',newroute.path)
  		switch(newroute.path.slice(1)){
  			case 'index':
  				this.currentRoute = 1;
  				break;
				case 'newpage':
					this.currentRoute = 2;
					break;
				case 'customer':
					this.currentRoute = 3;
					break;
				case 'fourth':
					this.currentRoute = 4;
					break;
				case 'fifth':
					this.currentRoute = 5;
					break;
				default:
				 break;
  		}
  	}
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{margin: 0;padding: 0;}
html,body{
	width: 100%;
	height: 100%;
	margin: 0;
}
#app{
	width: 100%;
	height: 100%;
	position: relative;
}
.content{
	height: 100%;
	padding-bottom: 40px;
	box-sizing: border-box;
}
.footer{
	width: 100%;
	height: 40px;
	position:absolute;
	left:0;bottom:0;
	background-color: greenyellow;
	z-index: 99;
}
.footer ul{
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
}
.footer ul li{
	height: 40px;
	line-height: 40px;
	list-style: none;
	flex: 1;
	a{
		text-decoration: none;
	}
	
}
.activated{
	background: blanchedalmond;
}
</style>
