import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async setUser(state, payload) {
      state.commit("setUser", payload);
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
  modules: {},
})
