<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form >
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-user"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="body.FirstName"
                    type="text"
                    class="form-control"
                    placeholder="First name"
                    autocomplete="First name"
                  />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-user"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="body.LastName"
                    type="text"
                    class="form-control"
                    placeholder="Last name"
                    autocomplete="Last name"
                  />
                </b-input-group>
                <b-input-group class="mb-3" label-for="input-1">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-user"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    id="input-1"
                    v-model="body.username"
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    autocomplete="username"
                  />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="fa fa-building"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="body.depName"
                    type="text"
                    class="form-control"
                    placeholder="Dept name"
                    autocomplete="Dept name"
                  />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="body.password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    autocomplete="new-password"
                  />
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    type="password"
                    class="form-control"
                    placeholder="Repeat password"
                    autocomplete="new-password"
                  />
                </b-input-group>

                <b-button@click="onsubmit" variant="success">Create Account</b-button>
              </b-form>
            </b-card-body>
            <b-card-footer class="p-4">
              <b-row>
                <b-col cols="6">
                  <b-button block class="btn btn-facebook">
                    <span>facebook</span>
                  </b-button>
                </b-col>
                <b-col cols="6">
                  <b-button block class="btn btn-twitter" type="button">
                    <span>twitter</span>
                  </b-button>
                </b-col>
              </b-row>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      body: {
        username: "",
        depName: "",
        password: "",
        fname: "",
        lname: ""
      }
    };
  },
  methods: {
    async onsubmit(evt) {
      try {
        console.log(this.body);
        const response = await axios.post(
          "http://51.77.192.7:8085/api/add/scientist",
          this.body
        );
      } catch (e) {
        this.errors.push(e);
      }
      router.push(( name= "login" ));
      console.log(JSON.stringify(this.form));
    }
  }
};
</script>
