<template>
  <HelloWorld/>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "@/components/Home.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "home",
  components: {
    HelloWorld
  }
});
</script>
