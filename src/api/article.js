// 文章相关的请求模块
import request from '@/utils/request';

// 频道新闻推荐
export const getArticles = (params)=>{
    return request({
        mmethod: 'GET',
        url: '/app/v1_1/articles',
        params
    })
}


// 获取所有频道
export const getChannels = ()=>{
    return request({
        mmethod: 'GET',
        url: '/app/v1_0/channels'
    })
}