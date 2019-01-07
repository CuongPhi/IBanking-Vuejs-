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
              <label>From</label>
              <md-select required v-model="send">
                <md-option v-for="account in accounts" v-bind:key="account.balance" :value="account.account_number" >{{ account.account_number }}</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>To</label>
              <md-input v-model="recieve" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Amount</label>
              <md-input v-model="money" required type="number"> </md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Note</label>
              <md-input v-model="note" type="text"> </md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>service charge</label>
              <md-select v-model="selected">
                <md-option value="0">sender</md-option>
                <md-option value="1">receiver</md-option>
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
      var d = new Date();
       if(user && user.access_token) {
          this.$store.dispatch("add_new_tran", { token: user.access_token, 
          transaction : {
            send : this.send,
            recieve : this.recieve,
            money : this.money,
            note : this.note,
            type : this.selected
          },
          router : this.$router, 
          });
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
      selected: '0',
      send: null,
      recieve: null,
      money: null,
      note: null
    }
  }
};
</script>