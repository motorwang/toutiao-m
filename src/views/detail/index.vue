<template>
    <div class="detail">
        <van-nav-bar
            title="详情"
            left-arrow
            fixed
            @click-left="$router.back()"
        />

        <van-loading class="loading" vertical v-if='loading'>加载中...</van-loading>

        <div class="article" v-else>
            <h3>{{article.title}}</h3>
            <div class="author">
                <div class="left">
                    <img :src="article.aut_photo" alt="">
                    <div class="info"> 
                        <p class="name">{{article.aut_name}}</p>
                        <p class="time">{{article.pubdate | dateFilter}}</p>
                    </div>
                </div>
                <div class="right">关注</div>
            </div>

            <div class="content" v-html='article.content'></div>
        </div>

        <van-list
            v-model="comments.loading"
            :finished="comments.finished"
            finished-text="没有更多了"
            @load="onLoad"
        >   
        <div class='comments'>
            <h3>全部评论</h3>
            <commentList v-for="(item, index) in comments.list" 
                :key="index" 
                :item='item'
                @click-reply="replyClick"
            ></commentList>
        </div >
            
        </van-list>

        <div class="footer">
            <div @click="show=true">写评论</div>
            <span>
                <van-icon name="comment-o" />
            </span>
            <span>
                <van-icon name="star-o" />
            </span>
            <span>
                <van-icon name="good-job-o" />
            </span>
            <span>
                <van-icon name="share-o" />
            </span>
        </div>

        <!-- 发布评论 -->
        <van-popup v-model="show" position="bottom">
            <div class="inner">
                <van-field
                    v-model="message"
                    rows="2"
                    type="textarea"
                    maxlength="200"
                    placeholder="请输入评论内容"
                    autosize
                    show-word-limit
                />
                <van-button type="primary" size='mini' @click="show=false">发布</van-button>
            </div>
        </van-popup>

        <!-- 回复评论 -->
        <van-popup
            v-if="replyShow"
            v-model="replyShow"
            position="bottom"
            style="height: 90%"
        >
            <commentReply @click-close='replyShow=false' :commentReply='commentReply'></commentReply>
        </van-popup>

    </div>
</template>

<script>
import { getArticlesDetail, getComments } from '@/api/article';
import commentList from './components/commentList';
import commentReply from './components/commentReply';
export default {
    name: 'detail',
    components: {
        commentList,
        commentReply
    },
    data(){
        return {
            art_id: '',
            loading: true,
            article: {},
            comments: {
                list: [],
                loading: false,
                finished: false,
                last_id: null,
            },
            show: false,// 发布评论
            message: '',  
            replyShow: false,  // 回复评论
            commentReply: {},

        }
    },

    created() {
        this.art_id = this.$route.query.id;
        this.get_articles();
    },

    methods: {
        async get_articles(){
            let {data} = await getArticlesDetail(this.art_id);
            this.article = data.data;
            this.loading = false;
        },


        async onLoad() {
            // 1. 获取数据
            // 2. 设置 loading false
            let { data } = await getComments({
                type: 'a',	// a或c	评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
                source: this.art_id,	// 源id，文章id或评论id
                offset: this.comments.last_id,	// 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
                limit: 10,	 // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
            })

            let results = data.data.results;
            this.comments.list.push(...results);
            this.comments.loading = false;

            // console.log('测试', data.data)

            if(results.length){
                this.comments.last_id = data.data.last_id;
            } else {
                this.comments.finished = true;
            }
        },

        // 评论回复
        async replyClick(item){
            this.commentReply = item;
            this.replyShow = true;
        }
    }
}
</script>

<style lang='less' scoped>
@import './index.less';
</style>