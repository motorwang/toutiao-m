import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 设置rem基准值 (html标签字体大小)
import 'amfe-flexible';

// 注册vant 组件
import './utils/register-vant';

// 加载全局样式
// 一定要放在第三方样式之后
import './styles/index.less';

// 加载表单验证插件初始化配置项
import './utils/validation';


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
