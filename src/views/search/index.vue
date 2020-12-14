<template>
    <div class="search">
        <form action="/">
            <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch(searchText)"
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
                <van-icon name="delete" class="right" v-if='!showDelete' @click="showDelete=true"/>
                <span class="right" v-if='showDelete'>
                    <i @click="searchRecord=[]">全部删除</i>
                    <i @click="showDelete=false">完成</i>
                </span>
            </div>
            <ul>
                <li v-for="(item, index) in searchRecord" :key='index' @click="onSearch(item)">
                    <div>{{item}}</div>
                    <van-icon class="icon" name="close" v-if='showDelete' @click.stop="deleteItem(index)"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getSuggestion, getSearch, getHistories} from '../../api/article';
import {getStorage, setStorage} from '../../utils/storage'
import { debounce } from 'lodash';  // 防抖防抖
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
            searchRecord: [],
            showDelete: false,
        }
    },

    created() {
        this.searchRecord = getStorage('searchRecord') || [];
    },

    watch: {
        searchRecord(newV, oldV){
            setStorage('searchRecord', newV);
        }
    },

    methods: {
        onSearch(str){
            this.searchText = str;
            let index = this.searchRecord.indexOf(str);
            if(index != -1){
                this.searchRecord.splice(index, 1);
                this.searchRecord.unshift(str);
            } else {
                this.searchRecord.unshift(str);
            }


            this.isShow = true;
        },

        // 输入联想建议
        get_suggestion: debounce(async function(){
            if(!this.searchText){return};

            let { data } = await getSuggestion(this.searchText);
            this.suggestions = data.data.options;
        }, 500),

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

            console.log('onLoad')
            getSearch({
                page: this.page,
                per_page: 15,
                q: this.searchText
            }).then(res=>{
                if(this.page==1){
                    this.results = res.data.data.results;
                } else {
                    this.results = [...this.results, ...res.data.data.results];
                }
                
                // console.log('测试', res.data.data.results.length);
                this.loading = false;

                if(res.data.data.results.length >= 15){
                    this.page++; // 加载下一页
                    console.log('加载中');
                } else {
                    this.finished = true;  // 没有数据结束加载
                    console.log('加载结束');
                }
            })
        },

        onRecommend(str){
            this.searchText = str;
            this.page = 1;
            this.isShow = true;

            this.onSearch(str);
        },

        // 删除单条搜索记录
        deleteItem(index){
            this.searchRecord.splice(index, 1);
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