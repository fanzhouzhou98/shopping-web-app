const Service = require('egg').Service;

// 继承Service
class User extends Service {
    USER_TABLE = 'user'
    FRIEND_TABLE = 'friendship'
    USER_DETAIL = 'user_detail'
    /**
     *
     * 通过userID[] 获取用户detail信息
     * @param {string[]} userIDList
     * @return {data:用户信息} 
     * @memberof Friends
     */
    async getDataByUserID(userId) {
        const { app } = this;
        let sql = `select ${this.USER_TABLE}.username,${this.USER_TABLE}.userID,${this.USER_TABLE}.userType,${this.USER_DETAIL}.nickName,${this.USER_DETAIL}.avator,${this.USER_DETAIL}.signature,${this.USER_DETAIL}.gender,${this.USER_DETAIL}.birthday from ${this.USER_TABLE} Right JOIN ${this.USER_DETAIL} ON ${this.USER_TABLE}.userID = ${this.USER_DETAIL}.userID where ${this.USER_TABLE}.userID = '${userId}'`
        const result = await app.mysql.query(sql)
        return {
            result,
            status: true
        }
    }
    /**
     *
     * 更新用户detail信息
     * @param {object{}} data
     * @return {result:用户信息} 
     * @memberof User
     */
    async updateUserInfo(nickName, avator, signature, gender, birthday, userID) {
        const { app } = this;
        const row = {
            nickName,
            avator,    // any other fields u want to update
            signature,
            gender,
            birthday,
            userID
        };

        const options = {
            where: {
                userID
            }
        };
        const result = await app.mysql.update(this.USER_DETAIL, row, options); // 更新 posts 表中的记录

        // 判断更新成功
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess) {
            return result
        }
    }

}
module.exports = User