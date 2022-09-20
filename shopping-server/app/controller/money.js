const await = require('await-stream-ready/lib/await');

const Controller = require('egg').Controller;
class MoneyController extends Controller {
    //创建用户钱包
    async createMoney() {
        const { ctx } = this
        const { userID } = ctx.request.body
        const data = await ctx.service.money.createMoney(userID)
        ctx.body = {
            data
        }
    }
    //付款操作
    async updateMoney() {
        const { ctx } = this
        const { userID, money, moneyPassword } = ctx.request.body
        const data = await ctx.service.money.updateMoney(userID, money, moneyPassword)
        ctx.body = {
            data
        }
    }
    //账户充值
    async rechargeMoney() {
        const { ctx } = this
        const { userID, moneyFound, password } = ctx.request.body
        const data = await ctx.service.money.rechargeMoney(userID, moneyFound, password)
        ctx.body = {
            data
        }
    }
    //查询用户钱包金额
    async getUserMoney() {
        const { ctx } = this
        const { userID } = ctx.request.body
        const data = await ctx.service.money.getUserMoney(userID)
        ctx.body = {
            data
        }
    }
}
module.exports = MoneyController