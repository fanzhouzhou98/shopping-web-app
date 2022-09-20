const Controller = require('egg').Controller;
class AdderssController extends Controller {
    //添加收货地址
    async addAddress() {
        const { ctx } = this
        let { userID, addressDetail, areaCode, city, county, postalCode, province, tel, name } = ctx.request.body
        let data = await ctx.service.address.addAddress(userID, addressDetail, areaCode, city, county, postalCode, province, tel, name)
        ctx.body = {
            data
        }
    }
    //修改收货地址
    async updateAddress() {
        const { ctx } = this
        let { userID, addressDetail, areaCode, city, county, postalCode, province, tel, name } = ctx.request.body
        let data = await ctx.service.address.upadteAddress(userID, addressDetail, areaCode, city, county, postalCode, province, tel, name)
        ctx.body = {
            data
        }
    }
    //查询收货地址
    async queryAddressByUserId() {
        const { ctx } = this
        let { userID } = ctx.request.body
        let data = await ctx.service.address.queryAddressByUserId(userID)
        ctx.body = {
            data
        }
    }
    //删除收货地址
    async deleteAddressByUserId() {
        const { ctx } = this
        let { userID } = ctx.request.body
        let data = await ctx.service.address.deleteAddressByUserId(userID)
        ctx.body = {
            data
        }
    }
}
module.exports = AdderssController