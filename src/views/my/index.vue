<template>
    <div class="my">
        <div class="top">
            <div class="has_login" v-if="isLogin()">
                <div class="info">
                    <div class="img" @click="toLogin">
                        <img src="./images/mobile.png" alt="">
                    </div>
                    <p class="name">竞彩猫粉丝</p>
                    <div class="btn">
                        <button>编辑资料</button>
                    </div>
                </div>
                <ul class="count">
                    <li>
                        <span>123</span>
                        <span>头条</span>
                    </li>
                    <li>
                        <span>123</span>
                        <span>关注</span>
                    </li>
                    <li>
                        <span>123</span>
                        <span>粉丝</span>
                    </li>
                    <li>
                        <span>13</span>
                        <span>获赞</span>
                    </li>
                </ul>
            </div>
            <div class="un_login" v-else>
                <div class="img" @click="toLogin">
                    <img src="./images/mobile.png" alt="">
                </div>
                <p @click="toLogin">点击登录</p>
            </div>
        </div>
        <div class="tt_grid">
            <van-grid column-num="3">
                <van-grid-item icon="star-o" text="我的收藏" />
                <van-grid-item icon="eye-o" text="浏览历史" />
                <van-grid-item icon="edit" text="作品" />
            </van-grid>
        </div>

        <div class="tt_cell">
            <van-cell title="消息通知" is-link />
            <van-cell title="小智同学" is-link to='/chat' />
        </div>

        <div class="logout" v-if="isLogin()" @click="logout">退出登录</div>
    </div>
</template>

<script>
import { userInfo } from '../../api/user';
import { removeStorage } from '../../utils/storage';
export default {
    dat(){
        return {

        }
    },

    created() {
        // console.log('是否登录', this.isLogin());
        if(this.isLogin()){
            // this.getUserInfo();
        }
    },

    methods: {
        toLogin(){
            this.$router.push('/login');
        },

        // 获取用户信息
        async getUserInfo(){
            try {
                let res = await userInfo();
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        },

        // 退出登录
        logout(){
            this.$dialog.confirm({
                title: '退出登录',
                message: '确定退出吗?',
            })
            .then(() => {
                this.$store.commit('setUser', null);
                removeStorage('user');

                this.$toast({
                    duration: 1,
                    message: '退出成功',
                });
            })
            .catch(() => {
                this.$toast({
                    duration: 1,
                    message: '取消退出',
                });
            });
        }


    },
}
</script>

<style lang="less" scoped>
.my{
    .top{
        padding: 40px 20px 0;
        background: url('./images/banner.png') 0 0 no-repeat;
        background-size: 100%;

        .has_login{
            padding-bottom: 15px;
            .info{
                overflow: hidden;
                .img{
                    width: 66px;
                    height: 66px;
                    float: left;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .name{
                    float: left;
                    padding-left: 12px;
                    font-size: 16px;
                    line-height: 66px;
                    color: #fff;
                }
                .btn{
                    float: right;
                    height: 66px;
                    padding-top: 25px;
                    box-sizing: border-box;
                    >button{
                        font-size: 12px;
                        line-height: normal;
                        padding: 2px 4px;
                        color: #323232;
                        border-radius: 20px;
                        box-sizing: border-box;
                        vertical-align: top;
                    }
                }
            }
            .count{
                width: 100%;
                overflow: hidden;
                padding-top: 15px;
                li{
                    float: left;
                    width: 25%;
                    span{
                        display: block;
                        font-size: 14px;
                        color: #fff;
                        text-align: center;
                    }
                }
            }
        }
        .un_login{
            padding-bottom: 40px;

            .img{
                width: 66px;
                height: 66px;
                margin: 0 auto;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            p{
                text-align: center;
                font-size: 14px;
                color: #fff;
                padding-top: 10px;
            }
        }
    }
    .tt_cell{
        margin-top: 10px;
    }

    .logout{
        width: 100%;
        height: 44px;
        color: #323232;
        font-size: 14px;
        line-height: 44px;
        text-align: center;
        margin-top: 10px;
        background-color: #fff;
    }
} 
</style>