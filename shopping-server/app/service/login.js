const Service = require('egg').Service;
const md5 = require('js-md5')
const moment = require('moment')
const MONEY_TABLE = 'money'
class LoginService extends Service {
    // 定义表格
    USER_TABLE = 'user'
    USER_DETAIL_TABLE = 'user_detail'
    /**
     *
     * 返回用户是否存在
     * @param {String} username
     * @return {object} 
     * @memberof LoginService
     */
    async getInfo(username) {
        return await this.checkLogin(username);
    }

    /**
     *
     * 用于登录 获取token
     * @param {String} username
     * @param {String} password
     * @return {message:String,status:Boolean,token?:String} 
     * @memberof LoginService
     */
    async login(username, password) {
        // 用于登录的接口
        let userInfo = await this.checkLogin(username);
        console.log(userInfo)
        if (userInfo.isExist) {
            if (userInfo.userInfo[0].password === password) {
                // 签发token 有效时长为30day
                const token = this.app.jwt.sign({ userID: userInfo.userInfo.userID }, this.app.config.jwt.secret, {
                    expiresIn: '30 days'
                });
                return {
                    message: "登录成功",
                    status: true,
                    token
                }
            } else {
                return {
                    message: "账号或者密码错误",
                    status: false
                }
            }

        } else {
            return {
                message: "账号不存在！",
                status: false
            }
        }
    }

    /**
     *
     * 通过username来检测数据库中是否存在该账户 有则返回对应数据
     * @param {String} username
     * @memberof LoginService
     */
    async checkLogin(username) {
        // 检测存在并返回相关数据
        let userInfo = await this.app.mysql.query(`select * from ${this.USER_TABLE} where username='${username}'`)
        console.log(userInfo)
        if (userInfo.length != 0) {
            return {
                isExist: true,
                userInfo
            }
        } else {
            return {
                isExist: false
            }
        }
    }

    /**
     *
     * 添加新用户（用于被注册调用）
     * @param {String} username
     * @param {String} password
     * @memberof LoginService
     */
    async addUser(username, password) {
        let userID = md5(username);
        // 同时插入user_detail表
        const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        const result = await this.app.mysql.insert(this.USER_TABLE, {
            username,
            password,
            userID
        })
        let data = await this.app.mysql.insert(this.USER_DETAIL_TABLE, {
            userID,
            avator: "https://xgpax.top/wp-content/uploads/2020/11/defaultAvator.png"
        })
        const insertSuccess = data.affectedRows === 1;
        if (insertSuccess) {
            await this.app.mysql.insert(MONEY_TABLE, {
                userID,
                date
            })
        }
        return {
            result
        }
    }
    async getAvator(username) {
        const { app } = this
        const result = await app.mysql.query(`select ${this.USER_DETAIL_TABLE}.avator from ${this.USER_TABLE} right join ${this.USER_DETAIL_TABLE} on ${this.USER_DETAIL_TABLE}.userID=${this.USER_TABLE}.userID  where ${this.USER_TABLE}.username='${username}'`)
        return result
    }
    /**
     *
     * 负责注册的业务逻辑
     * @param {String} username
     * @param {String} password
     * @return {Object} 
     * @memberof LoginService
     */
    async register(username, password) {
        // 检测是否有这个用户名 没有就准备插入
        let userStatus = await this.checkLogin(username)
        // 已经存在 返回存在结果并提示
        if (userStatus.isExist) {
            this.ctx.status = 200
            return {
                message: "用户名已经存在",
                status: false
            }
        }
        // 不存在则写入
        else {
            await this.addUser(username, password);
            return {
                message: "注册成功",
                status: true,
            }
        }
    }

}
module.exports = LoginService