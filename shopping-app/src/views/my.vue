<template>
    <div class="my">
        <div class="art">
            <div class="bg">
                    <div class="add-share"><van-icon name="edit" /></div>
                <div class="userInfo">
                    <van-uploader :after-read="afterRead">
                        <van-image round width="60px" height="60px" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                    </van-uploader>
                    <div class="nick-name">
                        <span>{{ '昵称:' }}</span>
                        <span>xb</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="share-list">
            <div class="share">
                <div class="share-user">
                    <van-image round width="40px" height="40px" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                    <span class="share-user-name">{{ '发展中' }}</span>
                </div>
                <div class="share-context">{{ '指数低开代码为零目的的哦' }}</div>
                <div class="share-imgs">
                    <div>
                        <van-image width="100%" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                    </div>
                </div>
                <div class="start">
                    <span>
                        <van-icon name="good-job-o" />
                        {{ 20 }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        name: 'AppMy',
        data() {
            return {
                msg: '我是my 组件',
            };
        },
        methods: {
            async afterRead(file) {
                //   此时可以自行将文件上传至服务器
                console.log(file); //file文件如下图
                var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
                formData.append('file', file.file); //接口需要传的参数
                axios
                    .post('/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((res) => {
                        console.log(res);
                    });
            },
        },
    };
</script>
<style lang="less" scoped>
@import '../style/my.less';
</style>