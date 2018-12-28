<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Edit Profile</h4>
        <p class="category">Complete your profile</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>User Name</label>
              <md-input v-model="user.username" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Email Address</label>
              <md-input v-model="user.email" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Phone number</label>
              <md-input v-model="user.phone" ></md-input>
            </md-field>
          </div>
          
        
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>First Name</label>
              <md-input v-model="user.first_name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="user.name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Adress</label>
              <md-input v-model="user.address" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>About Me</label>
              <md-textarea v-model="user.about_me"></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success">Update Profile</md-button>
          </div>
        </div>

      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "edit-profile-form",
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
        this.$store.dispatch("get_current_user", {token: user.access_token , router: this.$router})
       // .then(user_res => console.log(user_res))
        //.catch(err => console.log(err))
    }
  },
  mounted() {        
      this.$store.watch(this.$store.getters.current_user, current_u => {     
        this.user = current_u;
    });
  },
  data() {
    return {
      user : {
        username: null,
        phone: null,
        email: null,
        name: null,
        first_name: null,
        address: null,
        about_me:
          "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.",
        address: null
      }     
    };
  }
};
</script>
<style>
</style>
