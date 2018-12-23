export default {
  login(ctx, account) {
    ctx.commit("LOGIN", account);
  },
  re_login(ctx, obj) {
    ctx.commit("RE_LOGIN", obj);
  },
  logout(ctx, router) {
    ctx.commit("LOGOUT", router);
  }
};
