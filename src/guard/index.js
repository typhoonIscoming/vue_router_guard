import Vue from 'vue'



export default (router, store, needAuth = true) => {
	
	router.beforeEach((to, from, next) => {

		next()
	})
	
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevPage = router.getMatchedComponents(from)

        const activited = matched.filter((item, index) => {

            return prevPage[index] !== item
        })

        const asyncHook = matched.map(i => i.asyncData).filter(_ => _)
        if(asyncHook.length){
            Promise.all(matched.map(item => item.asyncData())).then(() => {
                console.log('执行完毕')
                next()
            })
        } else {
        	const timer = setTimeout(function(){
        		clearTimeout(timer)
        		next()
        	},0)
            
        }
    })
    
    
    router.afterEach((to, from) => {
    	if(window.ga) {
    		window.ga('set', 'page', to.fullPath)
    		window.ga('send', 'pageview')

    		
    	} else {
    		console.log('meiyou')
    	}

    })
}