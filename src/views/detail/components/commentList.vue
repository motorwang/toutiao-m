<template>
    <div class="item">
        <div class="top">
            <img :src="item.aut_photo" alt="">
            <span class="name">{{item.aut_name}}</span>
            <span class="zan">赞</span>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="huifu">
            <span>{{item.pubdate | dateFilter}}</span>
            <span @click="$emit('click-reply', item)">回复 {{item.reply_count}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'commentList',
    props: ['item']
}
</script>

<style lang="less" scoped>
.item{
    padding: 15px 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #ededed;
    .top{
        overflow: hidden;
        img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
        .name{
            vertical-align: top;
            line-height: 30px;
            padding-left: 20px;
            font-size: 14px;
        }
        .zan{
            vertical-align: top;
            line-height: 30px;
            font-size: 12px;
            float: right;
        }
    }
    .content{
        font-size: 14px;
        padding: 20px 0;
    }
    .huifu{
        font-size: 12px;
        span:nth-child(1){
            padding-right: 20px;
            color: #999;
        }
        span:nth-child(2){
            border: 1px solid #ebedf0;
            padding: 2px 5px;
            border-radius: 2px;
        }
    }
}
</style>