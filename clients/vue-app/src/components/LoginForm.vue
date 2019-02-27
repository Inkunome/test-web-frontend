<template>
  <form novalidate class="md-layout md-alignment-center-center" @submit.prevent="validateUser">
    <md-card class="md-layout-item md-size-25 md-small-size-100">
      <md-card-header>
        <div class="md-title">{{ title }}</div>
      </md-card-header>

      <md-card-content>
        <md-field :class="getValidationClass('firstName')">
          <label for="username">Username</label>
          <md-input
            name="username"
            id="username"
            autocomplete="password"
            v-model="form.username"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.username.required">The username is required</span>
          <span class="md-error" v-else-if="!$v.form.username.minlength">Invalid username</span>
        </md-field>

        <md-field :class="getValidationClass('password')">
          <label for="password">Password</label>
          <md-input
            name="password"
            id="password"
            type="password"
            v-model="form.password"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
          <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid password</span>
        </md-field>

        <md-progress-bar md-mode="indeterminate" v-if="sending"/>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">{{ actionText }}</md-button>
        </md-card-actions>
      </md-card-content>
    </md-card>

    <md-snackbar :md-active.sync="userSaved">The user was saved with success!</md-snackbar>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

import base64 from "base-64";

export default Vue.extend({
  name: "LoginForm",
  mixins: [validationMixin],

  data: () => ({
    form: {
      username: null,
      password: null
    },
    title: "",
    sending: false,
    userSaved: false
  }),

  props: {
    actionText: String,
    action: Function,
  },

  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3),
      },
      password: {
        required,
        minLength: minLength(3),
      }
    }
  },

  methods: {
    getValidationClass(fieldName: string) {
      const form = this.$v.form!;

      const field: any = (form as any)[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },

    clearForm() {
      this.$v.$reset();
      this.form.username = null;
      this.form.password = null;
    },

    saveUser() {},

    async validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.sending = true;

        const username = this.form.username;
        const password = this.form.password;

        const headers = new Headers();
        headers.set(
          "Authorization",
          "Basic " + base64.encode(username + ":" + password)
        );

        const response = await fetch("http://localhost:3000/threads", {
          method: "GET",
          headers: headers,
          mode: "cors"
        });

        if (response.status === 401) {
          this.title = "Bad password";
        } else {
          localStorage.setItem("credential", JSON.stringify({
            username,
            password
          }));

          const json = await response.json();

          this.$router.push({ name : "home" });
        }

        this.sending = false;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>