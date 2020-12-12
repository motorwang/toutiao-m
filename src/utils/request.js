import axios from 'axios';
import jsonBig from 'json-bigint';
import store from '../store/index';

const request = axios.create({
    baseURL: '/api'
})

// transformResponse 是 axios 提供的一个api
request.defaults.transformResponse = [function(data){
    try{
        return jsonBig.parse(data);
    }catch(err){
        return {}
    }
}]


// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 设置token
    const { user } = store.state;
    if(user){
        // 接口要求把 token 放在请求头中   接口要求的格式
        config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});







// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default request;
