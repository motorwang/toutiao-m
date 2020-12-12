/*
 * 表单验证配置
 * @Author: wangbo
 * @Date: 2020-12-12 15:12:58 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-12-12 15:29:07
 */
import Vue from 'vue';


// 加载需要使用的 验证组件
import { ValidationProvider, ValidationObserver, extend} from 'vee-validate';

// 加载内置的验证规则
import * as rules from 'vee-validate/dist/rules';

// 加载中文语言包
import { messages } from 'vee-validate/dist/locale/zh_CN.json';


// 注册全局组件
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);


// 配置验证规则 和 中文提示信息
Object.keys(rules).forEach((rule)=>{
    extend(rule, {
        ...rules[rule],
        messages: messages[rule]
    })
})

