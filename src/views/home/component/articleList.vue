<template>
    <div class="articleList">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import  { getArticles } from '@/api/article';
export default {
    name: 'ArticlelList',
    props: {
        channel:{
            type: Object,
            required: true
        }
    },
    data(){
        return {
            list: [],
            loading: false,
            finished: false,
            isLoading: true,
            timestamp: null,
        }
    },

    methods: {
        // 下拉刷新
        async onRefresh(){
            // this.$toast('刷新成功');
            // this.isLoading = false;

            let { data } = await getArticles({
                channel_id: this.channel.id,  //  频道 id
                timestamp: Date.now(),  // 	时间戳整数 单位毫秒	时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
                with_top: 1 /// 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
            })

            this.list.unshift(...data.data.results);
            this.timestamp = data.data.pre_timestamp;
            this.isLoading = false;
        },

        // 加载更多
        async onLoad(){
            // 1. 请求获取数据
            let { data } = await getArticles({
                channel_id: this.channel.id,  //  频道 id
                timestamp: this.timestamp || Date.now(),  // 	时间戳整数 单位毫秒	时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
                with_top: 1 /// 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
            })

            // console.log(data.data);
            const results = data.data.results;
            // 2. 数据拼接
            this.list.push(...results);

            // 3. 加载状态结束
            this.loading = false;

            // 4. 数据全部加载完成
            if(results.length >= 10){
                this.timestamp = data.data.pre_timestamp;
            } else {
                // 没有更多数据了, 将 finished 设置为true, 不再加载更多
                this.finished = true;
            }
        },
    }
}
</script>

<style lang="less" scoped>
.articleList{
    padding-bottom: 1.3333rem;
    box-sizing: border-box;
}
</style>