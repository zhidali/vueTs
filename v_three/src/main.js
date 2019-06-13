import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.config.productionTip = false
Vue.config.devtools = true

import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/pubilc.less' // 公共样式

// publist 发布任务
// subscribe 接受任务
// import PubSub from 'pubsub-js'
// PubSub.publish('a', '参数')
// PubSub.subscribe('a', (msg, data) => {

// })

import methods from './assets/js/methods.js' // 项目公共方法封装
Vue.use(methods);
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
