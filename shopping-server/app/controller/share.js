const Controller = require('egg').Controller;
class ShareController extends Controller {
    //添加分享
    async insertShare() {
        const { ctx } = this
        let { avator, userID, nickName, contentText, contentImgSrc } = ctx.request.body
        const data = await ctx.service.share.insertShare(avator, userID, nickName, contentText, contentImgSrc)
        ctx.body = {
            data
        }
    }
    //分页获取分享
    async getShareByPage() {
        const { ctx } = this
        let { page } = ctx.request.body
        const data = await ctx.service.share.getShareByPage(page)
        ctx.body = {
            data
        }
    }
    //删除分享
    async deleteShareById() {
        const { ctx } = this
        let { shareId } = ctx.request.body
        const data = await ctx.service.share.deleteShareById(shareId)
        ctx.body = {
            data
        }
    }
}
module.exports = ShareController