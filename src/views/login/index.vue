<template>
    <div class="login">
        <van-nav-bar title="登录" />

        <van-form  @submit="()=>{return false;}">
            <van-field
                v-model="user.mobile"
                clearable
                label="手机号"
                placeholder="请输入手机号"
                type='number'
                maxlength='11'
            />
            <van-field
                v-model="user.code"
                required
                label="验证码"
                placeholder="请输入验证码"
                type='number'
                maxlength='6'
            >
                <template #button>
                    <van-button size="mini" round type="primary" v-if="isShow">
                        <van-count-down format='ss s' :time="time" @finish='isShow=false'></van-count-down>
                    </van-button>
                    <van-button size="mini" round type="primary" v-else @click="sendCode">发送验证码</van-button>
                </template>
            </van-field>
        </van-form>

        <div class="login_btn">
            <van-button type="info" @click="onLogin">登录</van-button>
        </div>
        
    </div>
</template>

<script>
import { login, getCode } from '@/api/user';
// import store from '../../store/index';

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
            if(!this.verify_mobile(mobile)){
                this.$toast({
                    duration: 1000, // 为0 表示持续展示 toast
                    message: '请输入正确的手机号',
                });

                return;
            }
            return;
            
            this.isShow = true;

            try {
                let res = await getCode(mobile);
                console.log(res)
            } catch (err) {
                console.log(err)
                
                this.isShow = false; // 发送失败 关闭倒计时
                if(err.response.status === 429){
                    this.$toast('请勿频繁操作');
                    return;
                } else{
                    this.$toast('发送失败');
                }
            }
        },


        // 手机号校验
        verify_mobile(val) {
            return /^1\d{10}$/.test(val);
        },

        // 验证码 校验
        verify_code(val) {
            return /\d{6}$/.test(val);
        },
        
        // 登录
        async onLogin(){
            let data = {
                    refresh_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDg5ODQ4MjEsInVzZXJfaWQiOjEzMzcwNTIyNDY5MTA2OTc0NzIsInJlZnJlc2giOnRydWV9.DxPjWNLR75z10ouAaKXPfngJXBv8hNXWPhErrnJM6EM",
                    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDc3ODI0MjEsInVzZXJfaWQiOjEzMzcwNTIyNDY5MTA2OTc0NzIsInJlZnJlc2giOmZhbHNlfQ.mezZeX1QxaIbWXStQcbYK7LobfFv8zF_WohQXPNsilg"
                }
                
            this.$store.commit('setUser', data);
            this.$router.push('/my')
            return;


            let { mobile, code } = this.user;
            if(!this.verify_mobile(mobile)){
                this.$toast({
                    duration: 1000, // 为0 表示持续展示 toast
                    message: '请输入正确的手机号',
                });
                return;
            }
            if(!this.verify_code(code)){
                this.$toast({
                    duration: 1000, // 为0 表示持续展示 toast
                    message: '请输入正确的验证码',
                });
                return;
            }

            this.$toast.loading({
                duration: 0, // 为0 表示持续展示 toast
                message: '请输入正确的验证码',
            });

            try{
                let res = await login(this.user);
                console.log(res);

                this.$store.commit('setUser', res.data.data);
                
                this.$toast({
                    duration: 1000, // 为0 表示持续展示 toast
                    message: '登录成功!',
                });
            } catch(err){
                this.$toast({
                    duration: 1000, // 为0 表示持续展示 toast
                    message: '登录失败!',
                });
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