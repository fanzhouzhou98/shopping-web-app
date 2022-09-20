<template>
    <div class="show-comment">
        <div class="nav-bar">
            <van-nav-bar title="查看评论" :left-arrow="true" @click-left="onClickLeft"> </van-nav-bar>
        </div>
        <!-- <div class="zw"></div> -->
        <div class="goodsCommentShow">
            <div class="no-comment" v-if="commentList.length == 0">
                <h3>暂无评价~~</h3>
            </div>
            <div class="comment-box" v-for="item in commentList" v-else>
                <div class="user">
                    <van-image round width="40px" height="40px" :src="item.avator" />
                    <span class="user-name">{{ item.nickName }}</span>
                </div>
                <div class="comment">{{ item.contentText }}</div>
                <div class="rate">
                    <span>评分：</span>
                    <van-rate v-model="item.rate" />
                </div>
                <div class="time">{{ formatTime(item.date) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getCommentPage } from '@/api/index';
    import { formatTime } from '@/utils/deepclone';
    export default {
        data() {
            return {
                commentList: [],
                goodsID: '',
                page: 1,
                size: 10,
            };
        },
        created() {
            let { goodsId } = this.$route.query;
            this.goodsID = goodsId;
            this.getCommentPage(this.page, this.goodsID, this.size);
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
                console.log(this.$route);
            },
            async getCommentPage(page, goodsID, size) {
                let data = await getCommentPage({ page, goodsID, size }).catch(() => {});
                if (data.status == 200) {
                    this.commentList = data.data.data.result ? data.data.data.result : [];
                }
            },
            formatTime(time) {
                return formatTime(time);
            },
        },
    };
</script>

<style lang="less">
@import '../style/showComment.less';
</style>