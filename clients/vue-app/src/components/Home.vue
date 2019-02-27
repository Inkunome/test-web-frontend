<template>
  <div>
    <md-list>
      <md-list-item :key="thread.descriptor" v-for="thread in threads">
        <span class="md-list-item-text" :id="thread.descriptor" @click="goThread(thread.descriptor)">{{ thread.descriptor }}</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { fetchWithCredential } from "@/lib/fetch";

interface IThread {
  descriptor: string;
}

export default Vue.extend({
  name: 'SingleLine',

  data: () => ({
    threads: [],
  }),

  created() {
    this.getThreads();
  },

  methods: {
    async getThreads() {
      const response = await fetchWithCredential(this, "http://localhost:3000/threads");

      this.threads = await response.json();
    },

    goThread(descriptor: string) {
      this.$router.push({ name: "thread-detail", params : { descriptor }});
    },
  }
});
</script>

<style lang="scss" scoped>
  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
  }
</style>