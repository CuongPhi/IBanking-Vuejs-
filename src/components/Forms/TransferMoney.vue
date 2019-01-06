<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Transfer Money</h4>
        <p class="category">Transfer Form</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Tài khoản nguồn</label>
              <md-select required>
                <md-option v-for="account in accounts" v-bind:key="account.balance" :value="account.account_number" >{{ account.account_number }}</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Receiver Account</label>
              <md-input required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Amount</label>
              <md-input required type="number"> </md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Nội dung gửi</label>
              <md-input type="text"> </md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Chọn hình thức thanh toán</label>
              <md-select v-model="selected">
                <md-option value="1">sender</md-option>
                <md-option value="2">receiver</md-option>
              </md-select>
            </md-field>
          </div>
          
          <div  v-if="this.accounts" class="md-layout-item md-size-100 text-right">
                 <span v-if="this.$store.state.notifications.msg"> {{this.$store.state.notifications.msg}} </span>

            <md-button @click="updateProfile" class="md-raised md-success">Send</md-button>
          </div>
        </div>
        <!-- </div> -->

      </md-card-content>
    </md-card>
  </form>
</template>

<script>
export default {
  name: "transfer-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  beforeMount() {
     if(!localStorage.current_user) {
      this.$router.push('/login');
    }   
    var user = JSON.parse(localStorage.current_user);
    if(user && user.access_token) {
        this.$store.dispatch("get_accounts", {token: user.access_token , router: this.$router})
       // .then(user_res => console.log(user_res))
        //.catch(err => console.log(err))
    }
  },
  methods: {
    updateProfile() {
      var user = JSON.parse(localStorage.current_user);
       if(user && user.access_token) {
          this.$store.dispatch("update_user", { token: user.access_token, user_update: this.user, router : this.$router})
       } 
    }
  },
  mounted() {        
      this.$store.watch(this.$store.getters.accounts, acc => {     
        this.accounts = acc;
    });
  },
  data() {
    return {
      accounts: [],
      selected: '1'
    }
  }
};
</script>