// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

Vue.prototype.$Chartist = Chartist;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
  // methods: {
  //   submit: function () {
  //     // this.status = "submitting";
  //     this.$refs.recaptcha.execute();
  //   },
  //   onCaptchaVerified: function (recaptchaToken) {
  //     const self = this;
  //     self.status = "submitting";
  //     self.$refs.recaptcha.reset();
  //     axios.post("https://vue-recaptcha-demo.herokuapp.com/signup", {
  //       email: self.email,
  //       password: self.password,
  //       recaptchaToken: recaptchaToken
  //     }).then((response) => {
  //       self.sucessfulServerResponse = response.data.message;
  //     }).catch((err) => {
  //       self.serverError = getErrorMessage(err);


  //       //helper to get a displayable message to the user
  //       function getErrorMessage(err) {
  //         let responseBody;
  //         responseBody = err.response;
  //         if (!responseBody) {
  //           responseBody = err;
  //         }
  //         else {
  //           responseBody = err.response.data || responseBody;
  //         }
  //         return responseBody.message || JSON.stringify(responseBody);
  //       }

  //     }).then(() => {
  //       self.status = "";
  //     });


  //   },
  //   onCaptchaExpired: function () {
  //     this.$refs.recaptcha.reset();
  //   }
  // }
});
