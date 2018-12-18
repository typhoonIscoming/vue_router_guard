import Vue from 'vue'
import Router from 'vue-router'

import guard from '@/guard'
import store from '@/store'

import HelloWorld from '@/components/HelloWorld'

import newpage from '@/components/newpage';
import customer from '@/components/customer';
import customerA from '@/ChildRouter/customerA';
import customerB from '@/ChildRouter/customerB';
import fourth from '@/components/fourth';
import NotFound from '@/components/NotFound';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/home',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'HelloWorld',
      }
    },
    {
      path: '/index',
      name: 'HelloWorld',
      components: {
      	default: () => import(/* webpackChunkName: "HelloWorld" */  '@/components/HelloWorld')
      },
      alias: '/b',
      meta: {
      	scrollToTop: true,
      },
    },
    {
      path: '/newpage',
      name: 'newpage',
      components: {
      	default: () => import(/* webpackChunkName: "newpage" */  '@/components/newpage')
      },
      meta: {
      	auth: true,
      	params: {
	      	isShowLoading: false
	      },
	      scrollToTop: true
      },
    },
    {
      path: '/customer',
      name: 'customer',
      components: {
      	default: () => import(/* webpackChunkName: "customer" */  '@/components/customer')
  		},
//    redirect: {
//    	name: 'pageA'
//    },
      children: [
      	{path: 'pageA', name: 'pageA', components: {
      		default: () => import(/* webpackChunkName: "customerA" */  '@/ChildRouter/customerA')
      	}},
      	{path: 'pageB', name: 'pageB', components: {
      		default: () => import(/* webpackChunkName: "customerB" */  '@/ChildRouter/customerB')
      	}},
      ]
   },
   {
      path: '/fourth',
      name: 'fourth',
      components: {
      	default: () => import(/* webpackChunkName: "NotFound" */  '@/components/fourth')
      },
      meta: {
      	scrollToTop: true,
      },
    },
    {
      path: '/fifth',
      name: 'fifth',
      components: {
      	default: () => import(/* webpackChunkName: "fifth" */  '@/components/fifth')
      },
      meta: {
      	scrollToTop: true,
      },
    },
    {
    	path: '*',
    	name: 'NotFound',
    	components: {
    		default: () => import(/* webpackChunkName: "NotFound" */  '@/components/NotFound')
    	},
    },
  ],
  scrollBehavior(to, from, savedPosition) {

  	if(savedPosition) {

  		return savedPosition
  	} else {

  		let position = {}
  		if(to.hash) {

  			return position.selector = to.hash
  		} else if(to.matched.some(m => m.meta.scrollToTop)) {
  			position = { x: 0, y: 200 }

  		}
  		return position
  	}
  	
  },
})

guard(router, store)

export default router

