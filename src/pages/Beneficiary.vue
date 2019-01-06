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
                    <md-button @click="update(item.account_number, item.suggested_name)" class="md-icon-button  md-raised md-info">
                      <md-icon>edit</md-icon>
                      </md-button> 
                    <md-button @click="delete_be(item.account_number)" class="md-icon-button  md-raised md-danger">
                      <md-icon>backspace</md-icon>
                      </md-button> 

                    </md-table-cell>


                </md-table-row>

                </md-table>
                <div>

                <!-- <md-button @click="add_new()" class="md-raised md-success" >Add</md-button> -->
                   <md-button  @click="add_new()"  class="md-fab md-primary" >
                      <md-icon>add</md-icon>
                </md-button>
                </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <!--  -->
   <form v-if="show_add">
    <md-card>
      <md-card-header data-background-color="blue">
        <h4 class="title">{{this.type}} Beneficary</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Suggested</label>
              <md-input v-model="sg_name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Account number</label>
              <md-input v-model="num" @keydown="keydown" @keyup="checkValidBankAccountNumber"  
               :readonly="(this.type == 'Update this') ? true : false" type="number"></md-input>
            </md-field>
          </div>
          <div  class="md-layout-item md-size-100 text-right">
                 <span v-bind:class="{'success': this.$store.state.notifications.status, 'error': !this.$store.state.notifications.status}" v-if="this.$store.state.notifications.msg"> {{this.$store.state.notifications.msg}} </span>

            <md-button @click="Process()" :disabled="(this.type == 'Update this' || this.$store.state.canAddBeneficary) ? false : true "  class="md-raised md-success">{{this.type}} beneficary</md-button>
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

     this.$store.watch(this.$store.getters.nameAddBe, name => {     
       if(name)
          this.sg_name = name;
    });
  },
  data() {
    return {
      sg_name: null,
      num : null,
      show_add: false,
      type: null, // 1: add new, 0 update,
    };
  },
  methods: {
    add_new() {
          this.show_add = true;
          this.type = "Add new";
          this.sg_name = null;
          this.num = null;
          this.validationShow();
    },
    delete_be(num) {
      if(!localStorage.current_user) return;     
         var user = JSON.parse(localStorage.current_user);
        if(user && user.access_token) {
        if(confirm(`Do you want to delete ${num} ?`)) {
          this.$store.dispatch("delete_beneficary", {token: user.access_token, 
            beneficiary: {
              num : num,         
            }, router: this.$router});
        }
      }
    },
    Process() {
      if(!localStorage.current_user) return;     
         var user = JSON.parse(localStorage.current_user);
      if(user && user.access_token) {
       if(this.type === "Add new") {
          this.$store.dispatch("add_new_beneficary", {token: user.access_token, 
          beneficiary: {
            num : this.num,
            sg_name : this.sg_name, 
          
          }, router: this.$router});

       } else if(this.type === "Update this") {
            this.$store.dispatch("update_beneficary", {token: user.access_token,
            beneficiary : {
                account_number: this.num,
               sg_name: this.sg_name
            }
         , router: this.$router});
       }
      }
     
    },
    update(num, name){
      this.sg_name = name;
      this.num=num;
      this.show_add= true;
      this.type = "Update this";
      this.validationShow();
    },
    checkValidBankAccountNumber(e) {
      //console.log(e.key);
      if(this.num && this.num.length == 13) {
        if(!localStorage.current_user) return;     
         var user = JSON.parse(localStorage.current_user);
          if(user && user.access_token) {
            console.log(this.num)
            this.$store.dispatch("check_bank_valid", {token: user.access_token,
                number : {
                    account_number: this.num,
                }
            , router: this.$router});
          }
      } else {
          if(this.$store.state.canAddBeneficary) {
            this.validationShow();
          }
      }
      
    },
    keydown(e) {     
     if(e.key == "." || e.key == "e" || (this.num && this.num.length == 13 && e.key != "Backspace")) {
        e.preventDefault();
      }
    },
    validationShow(){
        this.$store.dispatch("set_cant_do_beneficiary");
    }
  },
};
</script>
