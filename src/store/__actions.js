export default {
  login(ctx, account) {
    ctx.commit("LOGIN", account);
  },
  re_login(ctx, obj) {
    ctx.commit("RE_LOGIN", obj);
  },
  logout(ctx, router) {
    ctx.commit("LOGOUT", router);
  },
  get_trans(ctx, obj) {
    ctx.commit("GET_TRANS", obj);
  },
  get_beneficiary(ctx, obj) {
    ctx.commit("GET_BENEFICIARY", obj);
  },
  get_current_user(ctx, obj) {
     ctx.commit("GET_CURRENT_USER", obj);
  },
  update_user(ctx, obj) {
    ctx.commit("UPDATE_USER", obj);
  }
};
