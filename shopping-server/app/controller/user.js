const Controller = require('egg').Controller

class UserController extends Controller {
    // 注册的路由
    async register() {
        const { ctx } = this;
        // 获取时间 用户名和密码来进行验证
        // 从data中读取数据方法 request.body
        const { username, password } = ctx.request.body
        const data = await ctx.service.login.register(username, password);
        ctx.body = {
            data
        }
    }
    // 获取用户信息
    async getInfo() {
        const { ctx } = this;
        // 获取时间 用户名和密码来进行验证
        const { username } = ctx.request.body
        const data = await ctx.service.login.getInfo(username);
        ctx.body = {
            data
        }
    }
    // 登录
    async login() {
        const { ctx } = this;
        // 获取时间 用户名和密码来进行验证
        const { username, password } = ctx.request.body
        console.log(username, password)
        const data = await ctx.service.login.login(username, password);
        ctx.body = {
            data
        }
    }
    // 根据userID获取Info
    async getInfoByUserID() {
        const { ctx } = this;
        // 获取userid
        const { userId } = ctx.request.body
        const data = await ctx.service.user.getDataByUserID(userId)
        ctx.body = {
            status: true,
            data
        }
    }
    //获取头像
    async getAvator() {
        const { ctx } = this
        const { username } = ctx.request.body
        const data = await ctx.service.login.getAvator(username)
        ctx.body = {
            data
        }
    }
    //更新userInfo
    async updateUserInfo() {
        const { ctx } = this
        const { nickName, avator, signature, gender, birthday, userID } = ctx.request.body
        const data = await ctx.service.user.updateUserInfo(nickName, avator, signature, gender, birthday, userID)
        ctx.body = {
            status: true,
            data
        }
    }
}
module.exports = UserController