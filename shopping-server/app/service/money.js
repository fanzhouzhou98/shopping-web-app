const Service = require('egg').Service;
const await = require('await-stream-ready/lib/await');
// 时间处理库
const moment = require('moment')
const MONEY_TABLE = 'money'
const USER_TABLE = 'user'
class MoneyService extends Service {
    /**
     * 用户钱包创建
     * @param {String} userID 
     * @returns 
     */
    async createMoney(userID) {
        const { app } = this
        const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        const result = await app.mysql.insert(MONEY_TABLE, {
            userID,
            date
        })
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess) {
            return {
                message: '钱包创建ok',
                status: true
            }
        }
    }
    /**
     * 付款操作
     * @param {String} userID 
     * @param {Float} money 
     * @returns 
     */
    async updateMoney(userID, money, moneyPassword) {
        const { app } = this
        let data = await app.mysql.query(`select moneyFound,moneyPassword from ${MONEY_TABLE} where userID='${userID}'`)
        console.log(data)
        const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        let totalMoney = parseFloat(data[0].moneyFound)
        money = parseFloat(money)
        console.log()
        if (data[0].moneyPassword != moneyPassword) {
            return {
                message: '密码错误',
                status: false
            }
        }
        if (totalMoney < money) {
            return {
                message: '金额不足',
                status: false

            }
        } else {
            let data = app.mysql.update(MONEY_TABLE, {
                money: totalMoney - money,
                date
            }, {
                where: {
                    userID
                }
            })
            const updateSuccess = data.affectedRows === 1;
            if (updateSuccess) {
                return {
                    message: '付款成功',
                    status: true
                }
            }
        }
    }
    /**
     * 账户充值
     * @param {String} userID 
     * @param {Float} moneyFound 
     * @param {String} password 
     * @returns 
     */
    async rechargeMoney(userID, moneyFound, password) {
        const { app } = this
        let data = await app.mysql.query(`select password from ${USER_TABLE} where userID='${userID}'`)
        const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        if (data[0].password != password) {
            return {
                message: '密码错误!',
                status: false
            }
        } else {
            let result = await app.mysql.query(`select moneyFound from ${MONEY_TABLE} where userID='${userID}'`)
            moneyFound = parseFloat(result[0].moneyFound) + parseFloat(moneyFound)
            let data = await app.mysql.update(MONEY_TABLE,
                {
                    moneyFound,
                    date
                },
                {
                    where: {
                        userID
                    }
                })
            return {
                message: '充值成功',
                status: true
            }
        }

    }
    /**
     * 获取用户钱包金额
     * @param {String} userID 
     * @returns 
     */
    async getUserMoney(userID) {
        const { app } = this
        const data = await app.mysql.query(`select moneyFound from ${MONEY_TABLE} where userID='${userID}'`)
        return {
            data
        }
    }
}

module.exports = MoneyService