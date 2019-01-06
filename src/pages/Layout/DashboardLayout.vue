<template>
    <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
      <!-- <notifications></notifications> -->

      <side-bar >
        <div v-if="this.$store.state.isLogin">
          <mobile-menu slot="content"></mobile-menu>
          <sidebar-link to="/accounts">
            <md-icon>dashboard</md-icon>
            <p>Account number</p>
          </sidebar-link>
          <sidebar-link to="/user">
            <md-icon>person</md-icon>
            <p>User Profile</p>
          </sidebar-link>
          <sidebar-link to="/table">
            <md-icon>content_paste</md-icon>
            <p>History</p>
          </sidebar-link>
          <sidebar-link to="/beneficiary">
            <md-icon>library_books</md-icon>
            <p>Beneficiary</p>
          </sidebar-link> 
        </div>

        <div v-if="!this.$store.state.isLogin">
        <sidebar-link to="/login">
            <md-icon>notifications</md-icon>
            <p>Sign In</p>
          </sidebar-link>
           <sidebar-link to="/forgot" class="active-pro">
            <md-icon>unarchive</md-icon>
            <p>Forgot Password</p>
          </sidebar-link>
        </div>        
      </side-bar>

      <div class="main-panel">
        <top-navbar v-if="this.$store.state.isLogin"></top-navbar>

        <dashboard-content></dashboard-content>

        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },  
  data() {
    return {
     
    }
  },
  mounted () {
    this.$store.watch(this.$store.getters.isLogin, n => {
      if(!n) {
      //  this.$router.push('/login');
      }
    });
  }
};
</script>
