<template>
    <div class="search">
        <form action="/">
            <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
                @focus="isShow=false"
                @input='get_suggestion'
                background="#3296fa"
            />
        </form>

        <van-list
            v-if="isShow"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <ul class="results">
                <li v-for="(item, index) in results" :key="index">
                    {{item.title}}
                </li>
            </ul>
        </van-list>

        <!-- 联想建议 -->
        <div class="recommend" v-else-if="searchText">
            <ul>
                <li v-for="(item, index) in suggestions" :key="index" @click="onRecommend(item)">
                    <van-icon class="icon" name="search" />
                    <div v-html="highLight(item)"></div>
                </li>
            </ul>
        </div>

        <!-- 历史记录 -->
        <div class="record" v-else>
            <div class="title">
                <span class="left">历史记录</span>
                <van-icon name="delete" class="right" />
                <span class="right" >
                    <i>全部删除</i>
                    <i>完成</i>
                </span>
            </div>
            <ul>
                <li>
                    <div>历史记录</div>
                    <van-icon class="icon" name="close" />
                </li>
                <li>历史记录</li>
                <li>历史记录</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getSuggestion, getSearch, getHistories} from '../../api/article';
export default {
    name: 'search',
    data(){
        return {
            searchText: '',
            loading: false,
            finished: false,
            isShow: false, // 是否显示搜索结果
            suggestions: [],
            page: 1, // 分页
            results: [],
            // showBtn: true,  // 是否显示删除
        }
    },

    created() {
        // this.get_histories();
    },

    methods: {
        onSearch(){
            this.isShow = true;
        },

        // 输入联想建议
        async get_suggestion(){
            if(!this.searchText){return};

            let { data } = await getSuggestion(this.searchText);
            this.suggestions = data.data.options;
        },

        // 高亮处理
        highLight(str){
            let text = this.searchText;
            let reg = eval(`/${text}/gi`);  // 字符串转化成 正则表达式
            return str.replace(reg, `<span style="color: #ff4019">${text}</span>`);
        },

        // 加载更多
        onLoad() {
            // 1. 请求数据
            // 2. 将数据添加到列表中
            // 3. 设置加载状态
            // 4. 判断数据是否加载完成
            getSearch({
                page: this.page,
                per_page: 15,
                q: this.searchText
            }).then(res=>{
                this.loading = false;

                if(this.page==1){
                    this.results = res.data.data.results;
                } else {
                    this.results = [...this.results, ...res.data.data.results];
                }
                
                if(res.data.data.results.length){
                    this.page++; // 加载下一页
                    console.log('加载中');
                } else {
                    this.finished = false;  // 没有数据结束加载
                    console.log('加载结束');
                }
            })
        },

        onRecommend(str){
            this.searchText = str;
            this.page = 1;
            this.isShow = true;
            this.onLoad();
        },

        // 获取搜索历史
        async get_histories(){
            let { data } = await getHistories();

            console.log(data);
        },

        onCancel(){
            this.$router.back();
        },
    },
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>