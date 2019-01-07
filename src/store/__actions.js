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
  },
  update_beneficiary(ctx, obj) {
    ctx.commit("UPDATE_BENEFICIARY", obj);
  },
  check_bank_valid(ctx, obj) {
    ctx.commit("CHECH_BANK_VALID", obj);
  },
  add_new_beneficiary(ctx, obj) {
    ctx.commit("ADD_NEW_BENEFICIARY", obj);
  },
  set_cant_do_beneficiary(ctx) {
    ctx.commit("SET_CANT_DO_BENEFICIARY");
  },
  delete_beneficiary(ctx, obj) {
    ctx.commit("DELETE_BENEFICIARY", obj);
  },
  get_accounts(ctx, obj) {
    ctx.commit("GET_ACCOUNTS", obj);
  },
  delete_bank_account(ctx, obj) {
    ctx.commit("DELETE_BANK_ACCOUNT", obj);
  },
  add_new_tran(ctx, obj){
    ctx.commit("ADD_NEW_TRAN", obj);
  }
};
