<template>

  <md-toolbar md-elevation="0" class="md-transparent">
    <div>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Are you sure you want to logout ?"
      md-confirm-text="Agree"
      md-cancel-text="Disagree"
      @md-confirm="onConfirm" />

  </div>
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{$route.name}}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <md-list>
            <md-list-item @click="active = true">
              <i class="material-icons">reply_all</i>
              <p class="md-primary md-raised" >logout</p>
            </md-list-item>

            <md-list-item to="/user">
              <i class="material-icons">person</i>
              <p class="hidden-lg hidden-md">Profile</p>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>

  </md-toolbar>
</template>

<script>
export default {
  data() {
    return {
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ],
      active: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    onConfirm () {
         
          this.$store.dispatch("logout", {router: this.$router});
      }
  }
};
</script>

<style lang="css">
</style>
