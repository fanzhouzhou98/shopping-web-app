<template>
    <div class="comment-paeg">
        <div class="nav-bar">
            <van-nav-bar title="发表评价" :left-arrow="true" @click-left="onClickLeft"> </van-nav-bar>
        </div>
        <div class="comment-text">
            <textarea rows="8" cols="55" v-model="contentText"></textarea>
            <!-- <van-field v-model="contentText" rows="8" autosize label="评论" type="textarea" maxlength="50" placeholder="请输入评论" show-word-limit /> -->
        </div>
        <div class="rate">
            <span>评分：</span>
            <van-rate v-model="rate" />
        </div>
        <div class="btn">
            <van-button type="info" size="mini" @click="submit">提交评价</van-button>
        </div>
    </div>
</template>

<script>
    import { insertComment } from '@/api/index';
    import store from '@/store/store';
    import { Toast } from 'vant';
    export default {
        data() {
            return {
                rate: 5,
                contentText: '',
                userID: '',
                goodsId: '',
                orderID: '',
            };
        },
        created() {
            let { goodsId, orderID } = this.$route.query;
            let { userID } = store.state.userInfo;
            this.goodsId = goodsId;
            this.userID = userID;
            this.orderID = orderID;
        },
        methods: {
            async submit() {
                if (this.commentText == '') {
                    Notify({ type: 'warning', message: '评价内容不可为空' });
                    return false;
                }
                let data = await insertComment({ rate: this.rate, contentText: this.contentText, userID: this.userID, goodsId: this.goodsId, orderID: this.orderID });
                if (data.status == 200) {
                    Toast('商品评论提交成功！');
                    this.onClickLeft();
                }
            },
            onClickLeft() {
                this.$router.go(-1);
            },
        },
    };
</script>

<style lang="less">
.comment-paeg {
    width: 100vw;
    height: 100vw;
    .van-nav-bar {
        background-color: rgb(113, 205, 248);
    }
    .comment-text {
        width: 95vw;
        margin: 0 auto;
        margin-top: 10px;
        border: 1px dashed rgb(113, 205, 248);
        border-radius: 7px;
        textarea {
            border: none;
        }
    }
    .rate {
        height: 50px;
        width: 95vw;
        margin: 0 auto;
        line-height: 50px;
    }
    .btn {
        width: 95vw;
        height: 50px;
        margin: 0 auto;
        text-align: center;
    }
}
</style>