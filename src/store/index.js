import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: null
    },
    getters: {
        user: state => state.user
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        }
    },
    actions: {
        setUser({ commit }, user) {
            commit('SET_USER', user)
        }
    }
})

export default store;
