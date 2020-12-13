// 用户相关的请求模块
import request from '@/utils/request';

export const login = (data)=>{
    return request({
        // 请求方法
        mmethod: 'post',

        // 请求路径
        url: '/app/v1_0/authorizations/',

        // 请求头
        // headers: {
        //     'Content-Type': 'application/json'  //axios 默认的就是这个
        // },

        // QUery 查询参数
        // params: {},

        // 请求体参数
        data
    })
}

// 获取验证码 每分钟限制1次
export const getCode = (mobile)=>{
    return request({
        mmethod: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}

// 获取用户信息
export const userInfo = (mobile)=>{
    return request({
        mmethod: 'GET',
        url: '/app/v1_0/user/'
    })
}

// 获取用户频道列表
export const getChannels = ()=>{
    return request({
        mmethod: 'GET',
        url: '/app/v1_0/user/channels'
    })
}