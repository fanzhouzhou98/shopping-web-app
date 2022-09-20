import Vue from 'vue'
import Vuex from 'vuex'
import { getStore } from '@/utils/store'
import { getters } from '@/store/getters'
import { mutations } from '@/store/mutations'
import { actions } from '@/store/actions'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: getStore({ name: 'count' }) || 0,
        token: getStore({ name: 'token' }) || '',
        userInfo: getStore({ name: 'userInfo' }) || {},
        routePathInfo: getStore({ name: 'routePathInfo' }) || {},
        messagesList: getStore({ name: 'messagesList' }) || [],
        activeRouter: getStore({ name: 'activeRouter' }) || {},
        cart: getStore({ name: 'cart' }) || []
    },
    getters: getters,
    mutations: mutations,
    actions: actions
})

export default store