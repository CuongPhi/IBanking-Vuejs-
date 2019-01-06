import Vue from "vue";
import Vuex from "vuex";

import mutations from "./__mutations";
import actions from "./__actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    transactions: [],
    beneficiaries: [],
    user: {},
    notifications: {
      status: false,
      msg: null
    },
    canAddBeneficary: false,
    nameAddBe : null,
    accounts: []
  },
  getters: {
    isLogin: state => () => state.isLogin,
    current_user: state => () => state.user,
    nameAddBe: state => () => state.nameAddBe
  },
  mutations: mutations,
  actions: actions
});
