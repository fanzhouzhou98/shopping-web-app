import { setStore } from '@/utils/store'
export const mutations = {
    SET_COUNT(state, action) {
        state.count += action
        setStore({ name: 'count', content: state.count })
    },
    SET_TOKEN(state, action) {
        state.token = action ? `Bearer ${action}` : ''
        setStore({ name: 'token', content: state.token })
    },
    SET_USER_INFO(state, action) {
        state.userInfo = action
        setStore({ name: 'userInfo', content: state.userInfo })
    },
    SET_ACTIVE_ROUTER(state, action) {
        state.activeRouter = action
        setStore({ name: 'activeRouter', content: state.activeRouter })
    },
    SET_CART(state, action) {
        state.cart = action
        setStore({ name: 'cart', content: state.cart })
    }
}