<template>
  <Thread/>
</template>

<script lang="ts">
import Vue from "vue";
import Thread from "@/components/Thread.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "thread",
  components: {
    Thread
  }
});
</script>
