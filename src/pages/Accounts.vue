<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="purple">
            <h4 class="title">Bank accounts number</h4>
            <p class="category">List bank account number: </p>
          </md-card-header>
          <md-card-content>
             <div>
                <md-table v-model="this.$store.state.accounts" table-header-color="green">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Current Account">{{ item.account_number }}</md-table-cell>
                    <md-table-cell md-label="Available balance (VNĐ)">{{ item.balance.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) }}</md-table-cell>
                    <md-table-cell md-label="Actions"> 
                    <!-- <md-button @click="update(item.account_number, item.suggested_name)" class="md-icon-button  md-raised md-info">
                      <md-icon>edit</md-icon>
                      </md-button>  -->
                    <md-button @click="delete_be(item.account_number)" class="md-icon-button  md-raised md-danger">
                      <md-icon>backspace</md-icon>
                      </md-button> 

                    </md-table-cell>


                </md-table-row>
                    <span v-bind:class="{'success': this.$store.state.notifications.status, 'error': !this.$store.state.notifications.status}" v-if="this.$store.state.notifications.msg"> {{this.$store.state.notifications.msg}} </span>

                </md-table>
                <div>

                <!-- <md-button @click="add_new()" class="md-raised md-success" >Add</md-button> -->
                   <!-- <md-button  @click="add_new()"  class="md-fab md-primary" >
                      <md-icon>add</md-icon>
                </md-button> -->
                </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <!--  -->

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
        this.$store.dispatch("get_accounts", {token: user.access_token, router: this.$router});
      }

  },
  data() {
    return {
      sg_name: null,
      num : null,
    };
  },
  methods: {
     delete_be(num) {
      if(this.$store.state.accounts.length == 1) {
          alert("Your account must have 1 bank account number !");
          return;
      }
      if(!localStorage.current_user) return;     
         var user = JSON.parse(localStorage.current_user);
        if(user && user.access_token) {

            if(confirm(`Do you want to delete ${num} ?`)) {
            this.$store.dispatch("delete_bank_account", {token: user.access_token, 
                beneficiary: {
                account_number : num,         
                }, router: this.$router});
            }
        }
    },
    Process() {
     
    }

  },
};
</script>
