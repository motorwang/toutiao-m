<template>
    <div class="home">
        <!-- 顶部导航 -->
        <van-nav-bar fixed z-index='9'>
            <template #left>
                <span class="left_text">首页</span>
            </template>
            <template #right>
                <router-link class="search" tag='div' to='/search'>
                    <van-icon name="search" size="18" />
                    <span>搜索</span>
                </router-link>
            </template>
        </van-nav-bar>
        <!-- <van-nav-bar title="首页" /> -->

        <!-- 频道列表 -->
        <van-tabs v-model="active">
            <van-icon class="wap-nav"
                slot='nav-right'
                name="wap-nav"
                @click="show=true"
            />
            <van-tab v-for="item in userChannels" :key='item.id' :title="item.name">
                <!-- 文章列表 -->
                <ArticlelList :channel='item'></ArticlelList>
                
            </van-tab>
        </van-tabs>

        <!-- 频道编辑 -->
        <van-popup
            v-model="show"
            position="bottom"
            closeable
            close-icon-position="top-left"
            :style="{ height: '100%' }"
        >

            <!-- 
                让子组件双向绑定active
                在组件上使用 v-model
                默认传递一个名字叫 value 的数据给子组件  :value='active'
                默认监听名字叫 input 的自定义事件:  @input="onHandler(active)"
                当子组件内部发布:  this.$emit('input', 123) 的时候, 那么 onHandler(active) 中的 active 的值就是123
                
                v-model 还是父子通信:
                什么时候使用? 子组件和父组件之间同步一些数据的时候, 建议使用  v-model 更简洁
                它的本质还是父子通信
             -->
            <ChannelChandle
                :userChannels='userChannels'
                v-model="active"
                @close='show=false'
            ></ChannelChandle>
        </van-popup>

    </div>
</template>

<script>
import { getChannels, getArticles } from '../../api/user';
import ArticlelList from './component/articleList';
import ChannelChandle from './component/channelChandle';
import { getStorage } from '../../utils/storage';

export default {
    name: 'home',
    components: {
        ArticlelList,
        ChannelChandle
    },
    data(){
        return {
            active: 0,
            userChannels: [],
            show: false,
        }
    },

    created() {
        this.get_channels();
    },

    methods: {
        async get_channels(){
            let channels = [];
            // 如果本地存储有频道列表, 则不请求接口
            const loc_userChannels = getStorage('userChannels');
            if(loc_userChannels){
                channels = loc_userChannels;
            } else {
                let res = await getChannels();
                channels = res.data.data.channels;
            }
            
            this.userChannels = channels;
        }
    },
}
</script>

<style lang="less" scoped>
.home{
    padding-top: 90px;
    padding-bottom: 50px;
    box-sizing: border-box;
    height: 100%;
    background-color: #fff;
    .left_text{
        color: #fff;
        font-size: 15px;
    }

    .search{
        width: 160px;
        height: 24px;
        line-height: 24px;
        border-radius: 24px;
        position: relative;
        box-sizing: border-box;
        background-color: #fff;
        .van-icon-search{
            color: #323232;
            line-height: 24px;
            position: absolute;
            top: 0;
            left: 20px;
        }
        span {
            color: #323232;
            vertical-align: top;
        }

    }

    .wap-nav{
        width: 44px;
        position: fixed;
        right: 0;
        line-height: 44px;
        background: #fff;
        text-align: center;
    }
}
</style>