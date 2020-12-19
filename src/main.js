import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 设置rem基准值 (html标签字体大小)
import 'amfe-flexible';

// 注册vant 组件
import './utils/register-vant';

// 引入factory
import './utils/factory';

// 加载全局样式
// 一定要放在第三方样式之后
import './styles/index.less';


// 日期格式化
var moment = require('moment');
moment.locale('zh-cn');

Vue.filter('dateFilter', (value)=> {
  // return moment(value).startOf('hour').fromNow(); // 计算相对时间   精确到小时
  return moment(value).format('YYYY-MM-DD HH:mm:ss'); // 自定义格式化时间
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
