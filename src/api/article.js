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

// 获取联想建议
export const getSuggestion = (q)=>{
    return request({
        mmethod: 'GET',
        url: '/app/v1_0/suggestion',
        params: {
            q
        }
    })
}
// 获取搜索结果
export const getSearch = (params)=>{
    return request({
        mmethod: 'GET',
        url: '/app/v1_0/search',
        params
    })
}


// 获取搜索历史
export const getHistories = ()=>{
    return request({
        mmethod: 'GET',
        url: '/app/v1_0/search/histories'
    })
}

// 文章详情
// /app/v1_0/articles/:article_id
export const getArticlesDetail = (article_id)=>{
    return request({
        mmethod: 'GET',
        url: `/app/v1_0/articles/${article_id}`
    })
}

// 文章评论或文章评论回复
export const getComments = (params)=>{
    return request({
        mmethod: 'GET',
        url: '/app/v1_0/comments',
        params
    })
}