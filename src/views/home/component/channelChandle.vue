<template>
    <div class="channelChandle">
        <van-cell title="我的频道" :border='false'>
            <van-button type="danger" size='mini' plain @click="isShow=!isShow">{{isShow?'完成':'编辑'}}</van-button>
        </van-cell>
        <van-grid :border='false'>
            <van-grid-item
                v-for='(item, index) in userChannels'
                :key='item.id'
                @click="onuSerChannels(index)"
            >
                <div class="customDiv" :class="{'active': value===index}">
                    <span class="text">{{item.name}}</span>
                    <van-icon name="close" v-if="isShow&&index!=0" />
                </div>
            </van-grid-item>
        </van-grid>


        <van-cell title="推荐频道" :border='false'></van-cell>
        <van-grid :border='false'>
            <van-grid-item
                v-for="item in recommendChannels"
                :key='item.id'
                @click='onAdd(item)'
            >
                <div class="customDiv">
                    <span class="text">{{item.name}}</span>
                </div>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
import { getChannels } from '../../../api/article';
import { setStorage } from '../../../utils/storage';

export default {
    name: '',
    props: {
        userChannels: {
            type: Array,
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    },

    data(){
        return {
            allChannels: [], // 所有频道
            isShow: false,  // true 编辑状态, false非编辑状态
        }
    },

    created() {
        this.get_channels();
    },

    watch: {
        userChannels(){
            setStorage('userChannels', this.userChannels);
        }
    },

    methods: {
        // 获取所有频道
        async get_channels(){
            let { data } = await getChannels();
            this.allChannels = data.data.channels;
        },

        // 添加频道
        onAdd(item){
            if(!this.isShow){
                this.userChannels.push(item);
            }
        },

        // 操作用户频道
        onuSerChannels(index){
            if(this.isShow && index!=0){
                // 编辑状态
                this.userChannels.splice(index, 1);
            } else{
                // 非编辑状态
                this.$emit('input', index);
                this.$emit('close');
            }
        }


    },

    computed: {
        recommendChannels(){
            let channels = [];

            this.allChannels.forEach(el => {
                let flag = this.userChannels.find((item)=>{
                    return item.id === el.id;
                })

                if(!flag){
                    channels.push(el);
                }
            });

            return channels;
        }
    }
}
</script>

<style lang="less" scoped>
.channelChandle{
    height: 100%;
    padding: 50px 12px 30px;
    box-sizing: border-box;

    .van-cell{
        font-size: 12px;
        line-height: normal;
        padding-left: 0;
        padding-right: 0;
        .van-cell__title{
            font-size: 14px;
        }
        .van-button--danger{
            font-size: 12px;
            height: 24px;
            vertical-align: top;
        }
    }

    .customDiv{
        position: relative;
        width: 100%;
        text-align: center;
        line-height: 24px;
        font-size: 12px;
        box-sizing: border-box;
        border: 1px solid #ededed;
        >span{
            line-height: normal;
            box-sizing: border-box;
        }
        .van-icon-close{
            font-size: 16px;
            position: absolute;
            top: -5px;
            right: -5px;
        }
    }
    .active{
        border: 1px solid #ee0a24;
        >span{
            color: #ee0a24;
        }
    }
    
}
</style>