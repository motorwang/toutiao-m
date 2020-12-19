<template>
    <div class="commentReply">
        <div class="top">
            <van-icon name="cross" @click="$emit('click-close')" />
            <span>{{commentReply.reply_count}}条回复</span>
        </div>

        <div class="original">
            <div class="info">
                <img :src="commentReply.aut_photo" alt="">
                <span class="name">{{commentReply.aut_name}}</span>
                <span class='zan'>
                    <van-icon name="good-job-o" />&nbsp;
                    <i>{{commentReply.reply_count>0?commentReply.reply_count:'赞'}}</i>
                </span>
            </div>
            <div class="content">{{commentReply.content}}</div>
            <p>{{commentReply.pubdate|dateFilter}}</p>
        </div>


        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <ul class="ul">
                <h3>所有回复</h3>
                <li v-for="(item, index) in list" :key="index">
                    <div class="info">
                        <img :src="item.aut_photo" alt="">
                        <span class="name">{{item.aut_name}}</span>
                        <span class='zan'>
                            <van-icon name="good-job-o" />&nbsp;
                            <i>{{item.reply_count>0?item.reply_count:'赞'}}</i>
                        </span>
                    </div>
                    <div class="content">{{item.content}}</div>
                    <p>
                        <span>{{item.pubdate|dateFilter}}</span>
                        <span>回复 {{item.reply_count}}</span>
                    </p>
                </li>
            </ul>
        </van-list>

    </div>
</template>

<script>
import { getComments } from '@/api/article';
export default {
    props: ['commentReply'],
    data(){
        return {
            list: [],
            loading: false,
            finished: false,
            offset: null,
        }
    },

    // created() {
    //     console.log('测试', this.commentReply)
    // },

    // 
    methods: {
        async onLoad() {
            // 1. 请求数据
            // 2. 将数据添加到列表中
            // 3. 关闭loading
            // 4. 判断数据是否加载完成

            let { data } = await getComments({
                type: 'c',
                source: this.commentReply.com_id.toString(),
                offset: this.offset,
                limit: 10,
            })

            let { results } = data.data;

            this.list.push(...results);
            this.loading = false;
            if(results.length){
                this.offset = data.data.last_id;
            } else {
                this.finished = true;
            }
        },
    },
}
</script>

<style lang="less" scoped>
.commentReply{
    width: 100%;
    box-sizing: border-box;
    .top{
        width: 100%;
        height: 45px;
        text-align: center;
        line-height: 45px;
        position: relative;
        border-bottom: 1px solid #ededed;
        .van-icon-cross{
            line-height: 45px;
            position: absolute;
            top: 0;
            left: 15px;
            font-size: 20px;
        }
        span{
            font-size: 14px;
            vertical-align: top;
        }
    }
    .original{
        padding: 10px;
        overflow: hidden;
        box-sizing: border-box;
        border-bottom: 1px solid #ededed;
        .info{
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
                font-size: 12px;
                float: right;
                i{
                    font-size: 12px;
                    line-height: 30px;
                    vertical-align: middle;
                    color: #999;
                }
                
            }
        }
        .content{
            font-size: 14px;
            padding: 10px 0;
        }
        >p{
            color: #999;
            font-size: 12px;
        }
    }

    .ul{
        h3{
            padding: 0 10px;
            box-sizing: border-box;
            line-height: 30px;
            font-size: 14px;
        }

        li{
            padding: 10px;
            border-bottom: 1px solid #ededed;

            .info{
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
                    font-size: 12px;
                    float: right;
                    i{
                        font-size: 12px;
                        line-height: 30px;
                        vertical-align: middle;
                        color: #999;
                    }
                }
            }
            .content{
                font-size: 14px;
                padding: 10px 0;
            }
            >p{
                color: #999;
                font-size: 12px;
                span:nth-child(1){
                    padding-right: 20px;
                }
                span:nth-child(2){
                    padding: 2px 4px;
                    border-radius: 2px;
                    box-sizing: border-box;
                    border: 1px solid #ededed;
                }
            }
        }
    }
}
</style>