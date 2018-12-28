<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Beneficiary</h4>
            <p class="category">All Beneficiary of your account here: </p>
          </md-card-header>
          <md-card-content>
             <div>
                <md-table v-model="this.$store.state.beneficiaries" table-header-color="green">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Suggested name">{{ item.suggested_name }}</md-table-cell>
                    <md-table-cell md-label="Account number ">{{ item.account_number }}</md-table-cell>
                </md-table-row>
                </md-table>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  mounted (){
     if(!localStorage.current_user) return;     
      var user = JSON.parse(localStorage.current_user);
      if(user && user.access_token) {
        this.$store.dispatch("get_beneficiary", {token: user.access_token, id: user.uid, ref_token: user.refresh_token ,user_name: user.username , router: this.$router});
      }
  },
  data() {
    return {
    };
  }
};
</script>
