import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import getters from './getters.js'
// import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
    // plugins: [createPersistedState()],
    modules: {
        user
    },
    state: {
        product: 'product:产品111111'
    },
    mutations: {

    },
    actions: {

    },
    getters
})