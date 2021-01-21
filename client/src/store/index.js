import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: []
  },
  mutations: {
    SOCKET_getPlayers (state, payload) {
      state.players = payload
    }
  },
  actions: {
    getPlayer (context) {

    }
  },
  modules: {
  }
})
