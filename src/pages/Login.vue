<template>
  <div v-if="!this.$store.state.isLogin" class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-30"></div>

      <div class="md-layout-item md-medium-size-100 md-size-40">
        <form @submit.prevent="onSubmit" method="post">
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">Login</h4>
            </md-card-header>

            <md-card-content class="md-layout-item">
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-100ss">
                  <md-field>
                    <label>User Name</label>
                    <md-input v-model="username" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Password</label>
                    <md-input v-model="password" type="password"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <vue-recaptcha @verify="onVerify" @expired="onExpired" :sitekey="sitekey"></vue-recaptcha>
                </div>
                <div class="md-layout-item md-size-100 text-right">
                  <md-button type="submit" :disabled="status" class="md-raised md-success">Login</md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-30"></div>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";

export default {
  components: {
    "vue-recaptcha": VueRecaptcha
  },
  data() {
    return {
      username: null,
      password: null,
      sitekey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
      status: true,
    };
  },
  mounted () { 
      if(!localStorage.current_user) return;     
      var user = JSON.parse(localStorage.current_user);
      if(user && user.access_token) {
        this.$store.dispatch("re_login", {token: user.access_token, id: user.uid, ref_token: user.refresh_token ,user_name: user.username , router: this.$router});
      }
  },

  methods: {
    onSubmit: function() {
        if(!this.status) {
          this.$store.dispatch("login", {username: this.username, password: this.password, type: 0, router: this.$router});
        }
    },
    onVerify: function(response) {
      this.status = false;
    },
    onExpired: function() {
      this.status = true;
    }
  }
};
</script>