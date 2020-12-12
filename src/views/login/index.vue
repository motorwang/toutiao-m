<template>
    <div class="login">
        <van-nav-bar title="登录" />

        <van-cell-group>
            <van-field
                v-model="user.mobile"
                required
                clearable
                label="手机号"
                placeholder="请输入手机号"
            />
            <van-field
                v-model="user.code"
                required
                label="验证码"
                placeholder="请输入验证码"
            >
                <template #button>
                    <van-button size="mini" round type="primary" v-if="isShow">
                        <van-count-down format='ss s' :time="time" @finish='isShow=false'></van-count-down>
                    </van-button>
                    <van-button size="mini" round type="primary" v-else @click="sendCode">发送验证码</van-button>
                </template>
            </van-field>
        </van-cell-group>

        <div class="login_btn">
            <van-button type="info" @click="onLogin">登录</van-button>
        </div>
        
    </div>
</template>

<script>
import { login, getCode } from '@/api/user';
export default {
    name: 'login',

    data(){
        return {
            user: {
                mobile: '18220132728',
                code: '246810'
            },
            time: 1000*60,
            isShow: false, // 是否显示倒计时
        }
    },

    methods: {
        // 发送验证码 (接口每分钟限制1次)
        async sendCode(){
            // 1. 获取手机号
            // 2. 校验手机号
            // 3. 发送验证码
            let { mobile } = this.user;
            this.isShow = true;

            try {
                let res = await getCode(mobile);
                console.log(res)
            } catch (err) {
                console.log(err)
                
                this.isShow = false; // 发送失败 关闭倒计时
                if(err.response.status === 429){
                    this.$toast('请勿频繁操作', 1);
                    return;
                } else{
                    this.$toast('发送失败', 1);
                }
            }
        },
        
        // 登录
        async onLogin(){
            this.$toast.loading('登录中...', 0);
            try{
                let res = await login(this.user);
                console.log(res);
                this.$toast('登录成功!', 1);
            } catch(err){
                this.$toast('登录失败!', 1);
                console.log('登录失败', err);
            }
        }
    },
}
</script>

<style lang='less' scoped>
@color: #3296fa;
.login{
    .login_btn{
        padding: 27px 16px;
        box-sizing: border-box;
        .van-button--info{
            width: 100%;
            color: #fff;
            background-color: @color;
            border: 1px solid @color;
        }
    }
    .van-button--primary{
        width: 80px;
        .van-count-down{
            color: #fff;
        }
    }
}
</style>