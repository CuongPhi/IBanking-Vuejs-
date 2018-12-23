import Vue from "vue";
import Vuex from "vuex";

import mutations from "./__mutations";
import actions from "./__actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    transactions: [],
    beneficiaries: []
  },
  getters: {
    isLogin: state => () => state.isLogin
  },
  mutations: mutations,
  actions: actions
});
