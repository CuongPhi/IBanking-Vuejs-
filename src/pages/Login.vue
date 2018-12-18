<template>
<div class="content">
    <div class="md-layout">
     <div class="md-layout-item md-medium-size-100 md-size-25"> 

     </div>

      <div class="md-layout-item md-medium-size-100 md-size-50">
          <form>
      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Login</h4>
        </md-card-header>

        <md-card-content  class="md-layout-item">
          <div class="md-layout md-layout-item md-small-size-100">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>User Name</label>
                <md-input v-model="username" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Password</label>
                <md-input v-model="password" type="password"></md-input>
              </md-field>
            </div>
            <!-- <span>      @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"</span> -->
            <div class="md-layout-item md-size-100 text-right">
             <div class="input-group">
                <vue-recaptcha 
                    ref="recaptcha"                
                    size="invisible"
                    sitekey="6LfJA0gUAAAAAA4YDXBubWMll55x5xLpyzu6n60G">
                    <md-button  :disabled="status==='submitting'" type="submit" class="md-raised md-success">Login</md-button>
                </vue-recaptcha>
              </div>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-25">
        
      </div>
    </div>
  </div>
</template>
<script>
  import VueRecaptcha from 'vue-recaptcha';

    export default {
        components: {
            "vue-recaptcha": VueRecaptcha 
        },
        data(){
            return {
                username: null,
                password: null,
                status: "submitting"
            }
                       
        }
    };
</script>