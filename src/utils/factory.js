import Vue from 'vue';
import store from '../store/index';


// 判断是否登录
Vue.prototype.isLogin = ()=>{
    if(store.state.user){
        return true;
    } else {
        return false;
    }
}

