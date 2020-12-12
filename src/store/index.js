import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import { getStorage, setStorage } from '../utils/storage';

export default new Vuex.Store({
    state: {
        // user: null,  // null { token, refresh_token }
        user: getStorage('user')
    },
    
    mutations: {
        setUser(state, data){
            state.user = data;

            // 为了防止数据刷新丢失  数据本地持久化
            // window.localStorage.setItem('user', JSON.stringify(state.user));
            setStorage('user', state.user);
        }
    },

    actions: {

    },

    modules: {

    }
})
