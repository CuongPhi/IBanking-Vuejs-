import Vue from "vue";

export default {
  LOGIN(state) {
    Vue.axios
      .get("")
      .then(response => {
        state.isLogin = true;
      })
      .catch(err => {
        state.isLogin = false;
      });
  }
};
