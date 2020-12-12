import axios from 'axios';
import jsonBig from 'json-bigint';

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


// 请求拦截器


// 响应拦截器


export default request;
