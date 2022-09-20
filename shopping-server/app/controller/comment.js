const Controller = require('egg').Controller;
class CommentController extends Controller {
    //添加商品评论
    async insertComment() {
        const { ctx } = this
        let { userID, goodsId, contentText, rate, orderID } = ctx.request.body
        const data = await ctx.service.comment.insertComment(userID, goodsId, contentText, rate)
        const commdata = await ctx.service.comment.changeCommentStatua(orderID)
        ctx.body = {
            data,
            commdata
        }
    }
    //分页获取评论
    async getCommentByPage() {
        const { ctx } = this
        let { page, goodsID, size } = ctx.request.body
        const data = await ctx.service.comment.getCommentByPage(page, goodsID, size)
        ctx.body = {
            data
        }
    }
    //删除评论
    async deleteCommentById() {
        const { ctx } = this
        let { commentId } = ctx.request.body
        const data = await ctx.service.comment.deleteShareById(commentId)
        ctx.body = {
            data
        }
    }
}
module.exports = CommentController