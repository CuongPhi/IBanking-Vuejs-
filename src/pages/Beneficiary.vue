<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">Beneficiary</h4>
            <p class="category">All Beneficiary of your account here: </p>
          </md-card-header>
          <md-card-content>
             <div>
                <md-table v-model="this.$store.state.beneficiaries" table-header-color="green">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Suggested name">{{ item.suggested_name }}</md-table-cell>
                    <md-table-cell md-label="Account number ">{{ item.account_number }}</md-table-cell>
                    <md-table-cell md-label="Actions"> 
                    <button @click="update(item.account_number)">Edit</button> 
                    <button>Delete</button> 

                    </md-table-cell>


                </md-table-row>

                </md-table>
                <button @click="add_new()">Add</button>

            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <!--  -->
   <form v-if="show_add">
    <md-card>
      <md-card-header data-background-color="blue">
        <h4 class="title">{{this.type}}</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Suggested</label>
              <md-input type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Account number</label>
              <md-input type="text"></md-input>
            </md-field>
          </div>
          <div  class="md-layout-item md-size-100 text-right">
                 <span v-if="this.$store.state.notifications.msg"> {{this.$store.state.notifications.msg}} </span>

            <md-button @click="Process()" class="md-raised md-success">Update Profile</md-button>
          </div>
        </div>

      </md-card-content>
    </md-card>
  </form>
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
      show_add: false,
      type: null // 1: add new, 0 update
    };
  },
  methods: {
    add_new() {
            this.show_add= true;
           this.type = "Add new beneficary";
    },
    update(be) {
            this.show_add= true;
            this.type = "Update beneficary";
            console.log(be)
    },
    Process() {

    }
  },
};
</script>
