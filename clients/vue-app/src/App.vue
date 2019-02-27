<template>
  <md-app id="app">
    <md-app-toolbar class="md-primary">
      <span class="md-title">Remit</span>
      <div class="md-toolbar-section-end">
        <div><a @click="selectFR">FR</a> | <a @click="selectEN">EN</a></div>
      </div>
    </md-app-toolbar>

    <md-app-content>
      <router-view/>
    </md-app-content>
  </md-app>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    langs: ["en", "fr"]
  }),
  methods: {
    selectFR() {
      this.$i18n.locale = "fr";
    },
    selectEN() {
      this.$i18n.locale = "en";
    },
  }
});
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
