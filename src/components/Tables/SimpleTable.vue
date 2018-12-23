<template>
  <div>
    <md-table v-model="trans" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="send">{{ item.account_send }}</md-table-cell>
        <md-table-cell md-label="recieve ">{{ item.account_recieve }}</md-table-cell>
        <md-table-cell md-label="money">{{ item.number_money }}</md-table-cell>
        <md-table-cell md-label="Date">{{ item.time }}</md-table-cell>
        <md-table-cell md-label="Note">{{ item.note }}</md-table-cell>

      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  mounted (){
     if(!localStorage.current_user) return;     
      var user = JSON.parse(localStorage.current_user);
      if(user && user.access_token) {
        this.$store.dispatch("get_trans", {token: user.access_token, id: user.uid, ref_token: user.refresh_token ,user_name: user.username , router: this.$router});
      }
  },
  data() {
    return {
      selected: [],
      trans: this.$store.state.transactions
    };
  }
};
</script>
