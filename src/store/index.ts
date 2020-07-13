import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    me: null,
    token: null,
    boards: null,
  },
  mutations: {
    me(state, data) {
      state.me = data;
    },
    token(state, data) {
      state.token = data;
    },
    boards(state, data) {
      state.boards = data;
    },
  },
  actions: {},
  modules: {},
});
