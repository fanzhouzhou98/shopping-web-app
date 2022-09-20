const Controller = require('egg').Controller;
class OrderController extends Controller {
    //创建订单
    async createOrder() {
        const { ctx } = this
        let { orderList } = ctx.request.body
        const data = await ctx.service.order.createOrder(orderList)
        ctx.body = {
            data
        }
    }
    //分页查询订单
    async getOrderByUserId() {
        const { ctx } = this
        let { userId } = ctx.request.body
        const data = await ctx.service.order.getOrderByUserId(userId)
        ctx.body = {
            data
        }
    }
    //通过订单id查看订单详情
    async getOrderDetailById() {
        const { ctx } = this
        let { orderId } = ctx.request.body
        const data = await ctx.service.order.getOrderDetailById(orderId)
        ctx.body = {
            data
        }
    }
    //支付
    async changeOrderPayStatus() {
        const { ctx } = this
        let { orderID } = ctx.request.body
        const data = await ctx.service.order.changeOrderPayStatus(orderID)
        ctx.body = {
            data
        }
    }
    //删除订单
    async deleteOrder() {
        const { ctx } = this
        let { orderID } = ctx.request.body
        const data = await ctx.service.order.deleteOrder(orderID)
        ctx.body = {
            data
        }
    }
}
module.exports = OrderController