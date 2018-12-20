import Vue from "vue";

export default {
  LOGIN(state, account) {
    var router = account.router;
    var acc = {...account }
    delete acc.router;
    Vue.axios.post("http://localhost:1704/api/auth/login/", acc)
      .then(response => {
        localStorage.current_user = JSON.stringify(response.data.user);
        state.isLogin = true;
        router.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
      });
  },
  RE_LOGIN(state, obj) {
    Vue.axios.post("http://localhost:1704/api/user/auth/", null , { headers: { "x-access-token": obj.token }})
      .then(response => { 
        console.log(response);
        state.isLogin = true;
        obj.router.push('/dashboard');

      })
      .catch(err =>{
        console.log(err);
      })
  }
};
