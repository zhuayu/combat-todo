import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import TheTodos from '@/components/TheTodos'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Root',
    component: TheTodos,
  },{
    path: '/:id',
    name: 'Filter',
    component: TheTodos
  }]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
