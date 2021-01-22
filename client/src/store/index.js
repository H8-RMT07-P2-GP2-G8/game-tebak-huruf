import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    hasStarted: false
  },
  mutations: {
    SOCKET_getPlayers (state, payload) {
      state.players = payload
    },
    updateStarted (state, payload) {
      state.hasStarted = payload
    },
    SOCKET_hasStarted (state, payload) {
      state.hasStarted = payload
    }
  },
  actions: {
    getPlayer (context) {

    }
  },
  modules: {
  }
})
