import Vue from "vue";

export default {
  LOGIN(state, account) {
    login(state, account);
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
  },
  UPDATE_BENEFICIARY(state, obj){
    update_beneficiary(state, obj);
  },
  CHECH_BANK_VALID(state, obj) {
    chech_bank_valid(state, obj);
  },
  ADD_NEW_BENEFICIARY(state, obj) {
    add_new_beneficiary(state, obj);
  },
  SET_CANT_DO_BENEFICIARY(state) {
    state.canAddBeneficiary = false;
    state.nameAddBe = null;
  },
  DELETE_BENEFICIARY(state, obj) {
    delete_beneficiary(state, obj);
  },
  GET_ACCOUNTS(state, obj) {
    get_accounts(state, obj);
  },
  DELETE_BANK_ACCOUNT(state, obj) {
    delete_bank_account(state, obj);
  },
  ADD_NEW_TRAN(state, obj) {
    add_new_tran(state, obj);
  }
};

/**
 *  #region list functions of mutations 
 * 
 */

// #region list functions of mutations
// var get_accounts = async(state, obj) => {  
//   var obj_ = {...obj }
//   delete obj_.router;
//   try {
//     const auth = await Vue.axios.post( "http://localhost:1704/api/account/accounts/", null , { headers: { "x-access-token": obj_.token }});
//     if(auth) {
//       state.accounts = auth.data;
//       console.log(state.accounts);
//       state.isLogin = true;
//     }
//   } catch (err) {  // access-token expire
//     if (err.response.status === 405) {
//       obj.router.push("/login");
//     }
//   } 
// } 
 var login = (state, account) =>{
  var router = account.router;
    var acc = { ...account };
    delete acc.router;
    Vue.axios
      .post("http://localhost:1704/api/auth/login/", acc)
      .then(response => {
        localStorage.current_user = JSON.stringify(response.data.user);
        state.isLogin = true;
        router.push("/accounts");
      })
      .catch(err => {
        console.log(err);
      });
 }
 
var get_beneficiary = async(state, obj) => {  
  try {
    const auth = await Vue.axios.post( "http://localhost:1704/api/account/beneficiaries/", null , { headers: { "x-access-token": obj.token }});
    if(auth) {
      state.beneficiaries = auth.data;
      state.isLogin = true;
    }
  } catch (err) {  // access-token expire
    if (err.response.status === 405) {
      obj.router.push("/login");
    }
  } 
}
var get_trans = async (state, obj) => {
  try {
    const auth = await Vue.axios.post( "http://localhost:1704/api/account/transhistory/", null , { headers: { "x-access-token": obj.token }});
    if(auth) {
      state.transactions = auth.data;
      state.isLogin = true;
    }
  } catch (err) {  // access-token expire
    if (err.response.status === 405) {   
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
      obj.router.push("/accounts");
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
            obj.router.push("/accounts");
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
  try {
    const user = await Vue.axios.post( "http://localhost:1704/api/user/profile/", null , { headers: { "x-access-token": obj.token }});
    if(user) {
      state.user = user.data;
      console.log(state.user);
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
    //   state.user.find((o, i) => {
    //     if (o.uid === c_user.uid) {
    //         state.user[i] = c_user;
    //         return true; // stop searching
    //     }
    // });
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

var update_beneficiary = async (state, obj) => {
  var sgname = {
    ...obj.beneficiary
  }
  try {
    const user = await Vue.axios.post( "http://localhost:1704/api/account/update_beneficiary/", sgname , { headers: { "x-access-token": obj.token }});
    if(user) {
      setMessage(state, "Update beneficiary successful !", true);
      state.canAddBeneficiary = false;
      state.beneficiaries.find((o, i) => {
        if (o.account_number === sgname.account_number) {
            state.beneficiaries[i].suggested_name = sgname.sg_name;
            return true; // stop searching
        }
    });
    
    } else {
      setMessage(state, "Update beneficiary fail !", false);
    }

  } catch (err) {  // access-token expire
    if (err.response.status === 405) {
      obj.router.push("/login");
    }
    else {
      setMessage(state, "Update beneficiary fail !", false);
  } 
 }
}

var chech_bank_valid = async (state, obj) =>{
  state.nameAddBe = null;
  var number = {
    ...obj.number
  }
  state.canAddBeneficiary = false;
  try {
    const num_ber = await Vue.axios.post( "http://localhost:1704/api/account/check_bank_valid/", number , { headers: { "x-access-token": obj.token }});
    if(num_ber) {
      state.canAddBeneficiary = true;
      state.nameAddBe = num_ber.data.name + " " + num_ber.data.first_name;
      setMessage(state, "You can add this bank account number !", true)

    } else {
      setMessage(state, "Bank account not found !", false);
    }

  } catch (err) {  // access-token expire
    if (err.response.status === 405) {
      obj.router.push("/login");
    }
    else {
      setMessage(state, "Bank account not found !", false);
  } 
 }
}
var add_new_tran = async (state, obj) =>{
  var tr = {
    ...obj.transaction
  }
  console.log(tr);
  try {
    const num_ber = await Vue.axios.post( "http://localhost:1704/api/account/tr/", tr , { headers: { "x-access-token": obj.token }});
    if(num_ber) {
      state.transactions = [
        ...state.transactions,
        {
          account_send : tr.send,
          account_recieve: tr.recieve,
          number_money: tr.money,
          note: tr.note
        }
      ]
      setMessage(state, "Transfer successful !", true)
      state.canAddTransfer = false;

    } else {
      setMessage(state, "Transfer fail !", false);
    }

  } catch (err) {  // access-token expire
    if (err.response.status === 405) {
      obj.router.push("/login");
    }
    else {
      setMessage(state, "Transfer fail !", false);
  } 
 }
} 

var add_new_beneficiary = async (state, obj) =>{
  var be = {
    ...obj.beneficiary
  }
  try {
    const num_ber = await Vue.axios.post( "http://localhost:1704/api/account/addbeneficiary/", be , { headers: { "x-access-token": obj.token }});
    if(num_ber) {
      state.beneficiaries = [
        ...state.beneficiaries,
        {
          suggested_name : be.sg_name,
          account_number : be.num
        }
      ]
      setMessage(state, "Add new beneficiary successful !", true)
      state.canAddBeneficiary = false;
    //  get_beneficiary(state, obj);

    } else {
      setMessage(state, "Add new beneficiary fail !", false);
    }

  } catch (err) {  // access-token expire
    if (err.response.status === 405) {
      obj.router.push("/login");
    }
    else {
      setMessage(state, "Add new beneficiary fail !", false);
  } 
 }
} 


var delete_beneficiary = async (state, obj) => {
  console.log("aaa")
  var be = {
    ...obj.beneficiary
  }
  try {
    const num_ber = await Vue.axios.post( "http://localhost:1704/api/account/deletebeneficiary/", be , { headers: { "x-access-token": obj.token }});
    if(num_ber) {
      var list_be = JSON.parse( JSON.stringify(state.beneficiaries));

      list_be = list_be.filter(item => item.account_number !== be.num);

      state.beneficiaries = list_be;    
      setMessage(state, "Delete beneficiary successful !", true)
      state.canAddBeneficiary = false;
    //  get_beneficiary(state, obj);

    } else {
      setMessage(state, "Delete beneficiary fail !", false);
    }

  } catch (err) {  // access-token expire
    if (err.response.status === 405) {
      obj.router.push("/login");
    }
    else {
      setMessage(state, "Delete beneficiary fail !", false);
  } 
 }
}

var get_accounts = async (state, obj) => {
  try {
    const auth = await Vue.axios.post( "http://localhost:1704/api/account/accounts/", null , { headers: { "x-access-token": obj.token }});
    if(auth) {
      state.accounts = auth.data;
    }
  } catch (err) {  // access-token expire
    if (err.response.status === 405) {
      obj.router.push("/login");
    }
  } 
}

var delete_bank_account = async (state, obj) => {
  var be = {
    ...obj.beneficiary
  }
  try {
    const auth = await Vue.axios.post( "http://localhost:1704/api/account/delete_bank_account/", be , { headers: { "x-access-token": obj.token }});
    if(auth) {
      var list_b = JSON.parse( JSON.stringify(state.accounts));

      list_b = list_b.filter(item => item.account_number !== be.account_number);

      state.accounts = list_b;    
      setMessage(state, `Delete bank account ${be.account_number} successful !`, true)
    }
  } catch (err) {  // access-token expire
    if (err.response.status === 405) {
      obj.router.push("/login");
    }
  } 
}
// end list functions of mutations