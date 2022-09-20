<!--
 * @Author: fanzhouzhou
 * @Descripttion: 
 * @Date: 2022-03-01 14:26:01
-->
<template>
    <div class="login-page">
        <div class="nav-bar">
            <van-nav-bar title="登录" :left-arrow="false"> </van-nav-bar>
        </div>
        <div class="login-box">
            <div class="avator-box">
                <van-image round width="80px" height="80px" :src="avator" />
            </div>
            <div class="form-box">
                <van-form>
                    <van-field v-model="username" label="用户名" placeholder="用户名" label-width="50px" :rules="[{ required: true, message: '请填写用户名' }]" @blur="getUserAvator(username)" />
                    <van-field v-model="password" type="password" label="密码" placeholder="密码" label-width="50px" :rules="[{ required: true, message: '请填写密码' }]" />
                </van-form>
            </div>
            <div class="btn-box">
                <van-button type="info" @click.stop="login" style="margin-right: 10px">登录</van-button>
                <van-button type="info" @click.stop="register" style="margin-left: 10px">注册</van-button>
            </div>
        </div>
    </div>
</template>
<script>
    // import secret from '../utils/secret';
    import { mapMutations } from 'vuex';
    import { register, login, getInfoByName, getAvator ,createMoney} from '@/api/index';
    import { Toast } from 'vant';
    export default {
        name: 'AppLogin',
        data() {
            return {
                username: '',
                password: '',
                avator: 'https://xgpax.top/wp-content/uploads/2020/11/defaultAvator.png',
            };
        },
        computed: {},
        methods: {
            ...mapMutations(['SET_TOKEN', 'SET_USER_INFO']),
            async register() {
                let userInfo = {
                    username: this.username,
                    password: this.password,
                };
                let data = await register(userInfo).catch(() => {});
                Toast(data.data.data.message);
            },
            async login() {
                let userInfo = {
                    username: this.username,
                    password: this.password,
                };
                let data = await login(userInfo).catch((err) => {
                    console.log(err);
                });
                if (data.data.data.status == true) {
                    Toast(data.data.data.message);
                    this.SET_TOKEN(data.data.data.token);
                    let result = await getInfoByName({username:userInfo.username}).catch();
                    console.log(result);
                    if (result.data.data.isExist == true) {
                        this.SET_USER_INFO(result.data.data.userInfo[0]);
                        createMoney({userID:result.data.data.userInfo[0].userID})
                    }
                    this.$router.replace({
                        path: '/home',
                    });
                }
            },
            async getUserAvator(username) {
                let data = await getAvator({ username });
                if (data.status == 200) {
                    this.avator = data.data.data[0].avator ? data.data.data[0].avator : 'https://xgpax.top/wp-content/uploads/2020/11/defaultAvator.png';
                }
            },
        },
    };
</script>
<style lang="less" scoped>
@import '../style/login.less';
</style>