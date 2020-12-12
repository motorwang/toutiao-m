<template>
    <div class="tabBar">

        <router-view></router-view>

        <van-tabbar route>
            <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="comment-o" to="/question">问答</van-tabbar-item>
            <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
            <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    }
}
</script>

<style lang="less" scoped>
.tabBar{
    width: 100%;
    height: 100%;
    padding-bottom: 1.33333rem;
    box-sizing: border-box;
}
</style>