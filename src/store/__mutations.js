import Vue from "vue";

export default {
  LOGIN(state, account) {
    var router = account.router;
    var acc = { ...account };
    delete acc.router;
    Vue.axios
      .post("http://localhost:1704/api/auth/login/", acc)
      .then(response => {
        localStorage.current_user = JSON.stringify(response.data.user);
        state.isLogin = true;
        router.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
      });
  },
  RE_LOGIN(state, obj) {
    re_login(state, obj);
  },
  LOGOUT(state, router) { 
    state.isLogin = false;
    localStorage.current_user = '';
    router.router.push('/login');
  }
};

var re_login = async (state, obj) => {
  state.isLogin = false;
  var obj_ = {...obj }
  delete obj_.router;
  try {
    const auth = await Vue.axios.post( "http://localhost:1704/api/user/auth/", null, { headers: { "x-access-token": obj_.token }});
    if (auth) {
      console.log(auth);
      state.isLogin = true;
      obj.router.push("/dashboard");
    }
  } catch (err) {  // access-token expire
    if (err.response.status === 405) {
      try {      
        const newToken = await Vue.axios.post("http://localhost:1704/api/auth/new_token/", obj_);
        if(newToken) {
            var newUser = JSON.parse(localStorage.current_user);
            var newtoken = newToken.data.access_token;
            newUser.access_token = newtoken;
            obj_.access_token = newtoken;
            localStorage.current_user = JSON.stringify(newUser);
            state.isLogin = true;
            obj.router.push("/dashboard");
        }
      } catch (err) {
         if (err.response.status === 500) {
            state.isLogin = false;
            obj.router.push("/login");

         }
      }
    }
  } 
};
