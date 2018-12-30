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
  },
  GET_TRANS(state, obj) {
    get_trans(state, obj);
  },
  GET_BENEFICIARY(state, obj) {
    get_beneficiary(state, obj);
  },
  GET_CURRENT_USER(state, obj) {
    get_current_user(state, obj);
  },
  UPDATE_USER(state, obj) {
    update_user(state, obj);
  }
};


// #region list functions of mutations 
var get_beneficiary = async(state, obj) => {  
  var obj_ = {...obj }
  delete obj_.router;
  try {
    const auth = await Vue.axios.post( "http://localhost:1704/api/account/beneficiaries/", null , { headers: { "x-access-token": obj_.token }});
    if(auth) {
      state.beneficiaries = auth.data;
      console.log(state.beneficiaries)
      state.isLogin = true;
    }
  } catch (err) {  // access-token expire
    if (err.response.status === 405) {
      obj.router.push("/login");
    }
  } 
}
var get_trans = async (state, obj) => {
  var obj_ = {...obj }
  delete obj_.router;
  try {
    const auth = await Vue.axios.post( "http://localhost:1704/api/account/transhistory/", null , { headers: { "x-access-token": obj_.token }});
    if(auth) {
      state.transactions = auth.data;
      state.isLogin = true;
    }
  } catch (err) {  // access-token expire
    if (err.response.status === 405) {
      // try {      
      //   const newToken = await Vue.axios.post("http://localhost:1704/api/auth/new_token/", obj_);
      //   if(newToken) {
      //       var newUser = JSON.parse(localStorage.current_user);
      //       var newtoken = newToken.data.access_token;
      //       newUser.access_token = newtoken;
      //       obj_.access_token = newtoken;
      //       localStorage.current_user = JSON.stringify(newUser);
      //       state.isLogin = true;
      //       obj.router.push("/table");

      //       // try {
      //       //   const auth = await Vue.axios.post( "http://localhost:1704/api/account/transhistory/", null , { headers: { "x-access-token": obj_.token }});
      //       //   if(auth) {
      //       //       state.transactions = auth.data;
      //       //       console.log(state.transactions)
      //       //       obj.router.push("/table");

      //       //   }
      //       // } catch (err) {
      //       //   state.isLogin = false;
      //       //   obj.router.push("/login");
  
      //       // }
      //   }
      // } catch (err) {
      //    if (err.response.status === 500) {
      //       state.isLogin = false;
      //       obj.router.push("/login");

      //    }
      // }
      
      /**
       *    access-token expire go to login page
       */
      obj.router.push("/login");

    }
  } 
}
var re_login = async (state, obj) => {
  state.isLogin = false;
  var obj_ = {...obj }
  delete obj_.router;
  try {
    const auth = await Vue.axios.post( "http://localhost:1704/api/user/auth/", null, { headers: { "x-access-token": obj_.token }});
    if (auth) {
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
var get_current_user = async (state, obj) =>{
  var obj_ = {...obj }
  delete obj_.router;
  try {
    const user = await Vue.axios.post( "http://localhost:1704/api/user/profile/", null , { headers: { "x-access-token": obj_.token }});
    if(user) {
      state.user = user.data;
    }
  } catch (err) {  // access-token expire
    if (err.response.status === 405) {
      obj.router.push("/login");
    }
  } 
}

var update_user = async (state, obj) => {
  var c_user = {
    ...obj.user_update
  }
  try {
    const user = await Vue.axios.post( "http://localhost:1704/api/user/update/", c_user , { headers: { "x-access-token": obj.token }});
    if(user) {
      setMessage(state, "Update your profile successful !", true)

    } else {
      setMessage(state, "Update your profile fail !", false);
    }

  } catch (err) {  // access-token expire
    if (err.response.status === 405) {
      obj.router.push("/login");
    }
    else {
      setMessage(state, "Update your profile fail !", false);
  } 
}
}

var setMessage = (state, msg, stt) =>{
  state.notifications = {
    status: stt,
    msg: msg
  }
  setTimeout(()=>{
    state.notifications = {
      status: stt,
      msg: null
    }
  } , 5000);
}
// end list functions of mutations