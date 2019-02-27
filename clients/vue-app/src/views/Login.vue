<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png">
    <LoginForm title="" actionText="Sign in" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LoginForm from '@/components/LoginForm.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'login',
  data: () => ({
    hello: "foo",
  }),
  components: {
    LoginForm,
  },
  methods: {},
});
</script>